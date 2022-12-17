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

let srcs = []
for (let k in templates) {
    const path = templates[k]
    const compiled = lodash.template(
        fs.readFileSync(`template/${path}`, 'utf8'));
    srcs.push(`${k}: ${compiled.source}`)
}

const module = "export const templates = {\n"
    + srcs.join(",\n") +
    "}\nexport default templates;"

fs.writeFileSync('src/templates.js', module, 'utf8');
