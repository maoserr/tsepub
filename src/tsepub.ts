import JSZip from "jszip";
import {OnUpdateCallback} from "jszip";
import {v4 as uuidv4} from 'uuid';

import {InfoType, LangType, ImgType} from './models.js';
import * as utils from './utils.js';
import language from './langs.json' assert {type: 'json'};
import templates from './templates.js'

const default_mime = 'application/epub+zip';
const output_type = "blob"
const default_img = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

/**
 * Main epub generator class
 */
export class TsEpub {
    private readonly _I18n: LangType;
    private _Info: InfoType;
    private _Uuid: { scheme: string, id: string };
    private _Date: string;
    private _Cover?: { path: string; type: any };
    private readonly _Pages: string[] = [];
    private readonly _Images: { [key: string]: ImgType } = {};
    private _Zip: JSZip;

    /**
     * Creates a TsEpub instance
     * @param details Book metadata
     */
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
        this._Zip.file('mimetype', default_mime);
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

    /**
     * Set date
     * @param date
     */
    date(date: Date) {
        this._Date = utils.getISODate(date);
        return this;
    }

    /**
     * Set unique ID for this ebook
     * @param id
     */
    uuid(id: string) {
        let scheme = 'uuid';
        if (utils.validateUrl(id))
            scheme = 'URI';
        this._Uuid = {
            scheme: scheme,
            id: id
        };
        return this;
    }

    /**
     * Sets cover with blob data
     * @param data
     */
    cover(data: Blob) {
        const ext = this.addimage(data)

        this._Cover = {
            type: data.type,
            path: `OEBPS/cover-image.${ext}`
        };
        this._Zip.file(this._Cover.path, data);
        this._Zip.file('OEBPS/front-cover.html', templates.frontcover({
            i18n: this._I18n,
            cover: this._Cover
        }));
        return this;
    }

    /**
     * Sets image assets that are referencable
     * @param data
     * @param name
     */
    image(data: Blob, name: string) {
        const ext = this.addimage(data)
        this._Images[name] = {
            type: data.type,
            path: `assets/${name}.${ext}`
        };
        this._Zip.file(`OEBPS/assets/${name}.${ext}`, data);
    }

    /**
     * Util used by cover and image to add image
     * @param data
     * @private
     */
    private addimage(data: Blob): string {
        let ext = utils.mime2ext(data.type);
        if (!ext) throw 'Image data is not allowed';
        return ext;
    }

    /**
     * Add notes page
     * @param content
     */
    notes(content: string) {
        this._Zip.file('OEBPS/notes.html', templates.notes({
            i18n: this._I18n,
            notes: utils.parseDOM(content)
        }));
        return this;
    }

    /**
     * Adds a chapter/section
     * @param title
     * @param content HTML string
     */
    add(title: string, content: string) {
        const index = this._Pages.length
        for (let k in this._Images) {
            const data = this._Images[k]
            content = content.replace(new RegExp("<%=\\s*image\\[" + k + "]\\s*%>", "g"),
                `<img src="${(data ? data.path : default_img)}" alt="" />`)
        }
        content = utils.parseDOM(content);
        this._Zip.file(`OEBPS/page-${index}.html`, templates.page({
            i18n: this._I18n,
            title: title,
            content: content
        }));
        this._Pages.push(title);
        return this;
    }

    /**
     * Generates a blob ePub file
     * @param onUpdate Update callback used by JSZip
     */
    generate(onUpdate: OnUpdateCallback | undefined = undefined) {
        if (!JSZip.support[output_type]) throw `This browser does not support ${output_type}`;
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
            type: output_type,
            mimeType: default_mime,
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9
            }
        }, onUpdate);
    }
}
