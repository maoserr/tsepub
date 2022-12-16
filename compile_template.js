import lodash from 'lodash';
import fs from 'fs';



const compiled = lodash.template(fs.readFileSync('./src/tpl/book.opf.ejs', 'utf8'));
fs.writeFileSync('./src/tpl/book.opf.js', "books="+compiled.source, 'utf8');
