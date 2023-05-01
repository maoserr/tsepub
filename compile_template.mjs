import lodash from 'lodash';
import fs from 'fs';

const templates = {
    container: "META-INF/container.xml",
    frontcover: "OEBPS/front-cover.html.ejs",
    notes: "OEBPS/notes.html.ejs",
    page: "OEBPS/page.html.ejs",
    toc: "OEBPS/table-of-contents.html.ejs",
    titlepage: "OEBPS/title-page.html.ejs",
    book: "book.opf.ejs",
    tocncx: "toc.ncx.ejs"
}

lodash.templateSettings.escape = /<%=(.+?)%>/g
lodash.templateSettings.interpolate = /<%-(.+?)%>/g
lodash.templateSettings.evaluate = /<%(.+?)%>/g


let srcs = []
for (let k in templates) {
    const path = templates[k]
    const compiled = lodash.template(
        fs.readFileSync(`template/${path}`, 'utf8'),
        {'variable': 'data'});
    srcs.push(`${k}: ${compiled.source}`)
}

const module = "import _ from 'lodash';\nexport const templates = {\n"
    + srcs.join(",\n")
        .replaceAll("\(data\)","(data:any)")
        .replaceAll("\(title, index\)", "(title:any, index:any)")
        .replaceAll("\(page, index\)", "(page:any, index:any)")
        .replaceAll("(tag =>", "((tag:any) =>")
    +
    "}\nexport default templates;"

fs.writeFileSync('src/templates.ts', module, 'utf8');
