import imageType from 'image-type';
import JSZip from "jszip";
import {OutputType, OnUpdateCallback} from "jszip";
import {v4 as uuidv4} from 'uuid';

import * as utils from './utils.js';

import templates from './templates.js'


let language: { [name: string]: LangType } = {
    "en": {
        "code": "en",
        "cover": "Cover",
        "toc": "Table of Contents",
        "info": "Information",
        "note": "Notes"
    },
    "vi": {
        "code": "vi",
        "cover": "Bìa sách",
        "toc": "Mục lục",
        "info": "Giới thiệu",
        "note": "Ghi chú"
    },
    "hi": {
        "code": "hi",
        "cover": "आवरण",
        "toc": "विषय - सूची",
        "info": "जानकारी",
        "note": "टिप्पणियाँ"
    }
}

let mime = 'application/epub+zip';

interface InfoType {
    i18n: string
    title: string
    author: string
    publisher: string
    description: string
    tags: [string]
}

interface LangType {
    code: string
    cover: string
    toc: string
    info: string
    note: string
}

interface ImgType {
    type: string
    path: string
}

export default class jEpub {
    private _I18n: LangType;
    private _Info: InfoType;
    private _Uuid: { scheme: string, id: string };
    private _Date: string;
    private _Cover?: { path: string; type: any };
    private readonly _Pages: string[] = [];
    private readonly _Images: { [key: string]: ImgType } = {};
    private _Zip: JSZip;

    constructor(details: InfoType) {
        this._Info = details;

        this._Uuid = {
            scheme: 'uuid',
            id: uuidv4()
        };

        this._Date = utils.getISODate();

        if (!language[this._Info.i18n]) throw `Unknown Language: ${this._Info.i18n}`;
        this._I18n = language[this._Info.i18n];

        this._Zip = new JSZip();
        this._Zip.file('mimetype', mime);
        this._Zip.file('META-INF/container.xml', templates.container());
        this._Zip.file('OEBPS/title-page.html', templates.titlepage({
            i18n: this._I18n,
            title: this._Info.title,
            author: this._Info.author,
            publisher: this._Info.publisher,
            description: utils.parseDOM(this._Info.description),
            tags: this._Info.tags,
        }));

        return this;
    }

    date(date: Date) {
        this._Date = utils.getISODate(date);
        return this;
    }

    uuid(id: string) {
        if (utils.isEmpty(id)) {
            throw 'UUID value is empty';
        } else {
            let scheme = 'uuid';
            if (utils.validateUrl(id))
                scheme = 'URI';
            this._Uuid = {
                scheme: scheme,
                id: id
            };
            return this;
        }
    }

    async cover(data: Blob | ArrayBuffer) {
        const ext = this.addimage(data)

        this._Cover = {
            type: mime,
            path: `OEBPS/cover-image.${ext}`
        };
        this._Zip.file(this._Cover.path, data);
        this._Zip.file('OEBPS/front-cover.html', templates.frontcover({
            i18n: this._I18n,
            cover: this._Cover
        }));
        return this;
    }

    async image(data: Blob | ArrayBuffer, name: string) {
        const ext = this.addimage(data)
        this._Images[name] = {
            type: mime,
            path: `assets/${name}.${ext}`
        };
        this._Zip.file(`OEBPS/assets/${name}.${ext}`, data);
    }

    private async addimage(data: Blob | ArrayBuffer): Promise<string> {
        let ext, mime = "";
        if (data instanceof Blob) {
            mime = data.type;
            ext = utils.mime2ext(mime);
        } else {
            ext = await imageType(new Uint8Array(data));
            if (ext) {
                mime = ext.mime;
                ext = utils.mime2ext(mime);
            }
        }
        if (!ext) throw 'Image data is not allowed';
        return ext;
    }

    notes(content: string) {
        this._Zip.file('OEBPS/notes.html', templates.notes({
            i18n: this._I18n,
            notes: utils.parseDOM(content)
        }));
        return this;
    }

    add(title: string, content: string) {
        const index = this._Pages.length
        if (!Array.isArray(content)) {
            const template = ejs.compile(content, {
                client: true
            });
            content = template({
                image: this._Images
            }, data => {
                return `<img src="${(data ? data.path : 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=')}" alt="" />`;
            });
            content = utils.parseDOM(content);
        }
        this._Zip.file(`OEBPS/page-${index}.html`, templates.page({
            i18n: this._I18n,
            title: title,
            content: content
        }));
        this._Pages.push(title);
        return this;
    }

    generate(onUpdate: OnUpdateCallback | undefined = undefined) {
        const type = "blob"
        if (!JSZip.support[type]) throw `This browser does not support ${type}`;
        let notes = this._Zip.file('OEBPS/notes.html');

        this._Zip.file('book.opf', templates.book({
            i18n: this._I18n,
            uuid: this._Uuid,
            date: this._Date,
            title: this._Info.title,
            author: this._Info.author,
            publisher: this._Info.publisher,
            description: utils.html2text(this._Info.description, true),
            tags: this._Info.tags,
            cover: this._Cover,
            pages: this._Pages,
            notes: notes,
            images: this._Images
        }));

        this._Zip.file('OEBPS/table-of-contents.html', templates.toc({
            i18n: this._I18n,
            pages: this._Pages
        }));

        this._Zip.file('toc.ncx', templates.tocncx({
            i18n: this._I18n,
            uuid: this._Uuid,
            title: this._Info.title,
            author: this._Info.author,
            pages: this._Pages,
            notes: notes
        }));

        return this._Zip.generateAsync({
            type: type,
            mimeType: mime,
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        }, onUpdate);
    }
}
