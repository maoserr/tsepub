export const templates = {
container: function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">\n	<rootfiles>\n		<rootfile full-path="book.opf" media-type="application/oebps-package+xml" />\n	</rootfiles>\n</container>';

}
return __p
},
frontcover: function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'">\n\n<head>\n	<title>' +
((__t = ( i18n.cover )) == null ? '' : __t) +
'</title>\n	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />\n</head>\n\n<body>\n	<div id="cover-image">\n		<img src="../' +
((__t = ( cover.path )) == null ? '' : __t) +
'" alt="' +
((__t = ( i18n.cover )) == null ? '' : __t) +
'" />\n	</div>\n</body>\n\n</html>\n';

}
return __p
},
notes: function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'">\n\n<head>\n	<title>' +
((__t = ( i18n.note )) == null ? '' : __t) +
'</title>\n	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />\n</head>\n\n<body>\n	<div id="notes-page">\n		<div class="ugc">\n            ' +
__e( notes ) +
'\n		</div>\n	</div>\n</body>\n\n</html>\n';

}
return __p
},
page: function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'">\n\n<head>\n	<title>' +
((__t = ( title )) == null ? '' : __t) +
'</title>\n	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />\n</head>\n\n<body>\n	<div class="chapter type-1">\n		<div class="chapter-title-wrap">\n			<h2 class="chapter-title">' +
((__t = ( title )) == null ? '' : __t) +
'</h2>\n		</div>\n		<div class="ugc chapter-ugc">\n            ';
 if (Array.isArray(content)) { ;
__p += '\n                ';
 content.forEach(item => { ;
__p += '\n                    <p class="indent">' +
((__t = ( item )) == null ? '' : __t) +
'</p>\n                ';
 }); ;
__p += '\n            ';
 } else { ;
__p += '\n                ' +
__e( content ) +
'\n            ';
 } ;
__p += '\n		</div>\n	</div>\n</body>\n\n</html>\n';

}
return __p
},
toc: function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'">\n\n<head>\n	<title>' +
((__t = ( i18n.toc )) == null ? '' : __t) +
'</title>\n	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />\n</head>\n\n<body>\n	<div id="toc">\n		<h1>' +
((__t = ( i18n.toc )) == null ? '' : __t) +
'</h1>\n		<ul>\n            ';
 pages.forEach((title, index) => { ;
__p += '\n                <li class="chaptertype-1">\n                    <a href="page-' +
((__t = ( index )) == null ? '' : __t) +
'.html">\n                        <span class="toc-chapter-title">' +
((__t = ( title )) == null ? '' : __t) +
'</span>\n                    </a>\n                </li>\n            ';
 }); ;
__p += '\n		</ul>\n	</div>\n</body>\n\n</html>\n';

}
return __p
},
titlepage: function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'">\n\n<head>\n	<title>' +
((__t = ( i18n.info )) == null ? '' : __t) +
'</title>\n	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=utf-8" />\n</head>\n\n<body>\n	<div id="title-page">\n		<h1 class="title">' +
((__t = ( title )) == null ? '' : __t) +
'</h1>\n		<h2 class="subtitle"></h2>\n		<h3 class="author">' +
((__t = ( author )) == null ? '' : __t) +
'</h3>\n		<h4 class="publisher">' +
((__t = ( publisher )) == null ? '' : __t) +
'</h4>\n	</div>\n    ';
 if (Array.isArray(tags) && tags.length) { ;
__p += '\n        <div class="part-title-wrap">\n            ';
 tags = tags.join('</code>, <code>'); ;
__p += '\n            <code>' +
__e( tags ) +
'</code>\n        </div>\n    ';
 } ;
__p += '\n    ';
 if (description) { ;
__p += '\n        <div class="ugc">\n            ' +
__e( description ) +
'\n        </div>\n    ';
 } ;
__p += '\n</body>\n\n</html>\n';

}
return __p
},
book: function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<package version="2.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="PrimaryID">\n\n	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">\n		<dc:title>' +
((__t = ( title )) == null ? '' : __t) +
'</dc:title>\n		<dc:language>' +
((__t = ( i18n.code )) == null ? '' : __t) +
'</dc:language>\n		<dc:identifier id="PrimaryID" opf:scheme="' +
((__t = ( uuid.scheme )) == null ? '' : __t) +
'">' +
((__t = ( uuid.id )) == null ? '' : __t) +
'</dc:identifier>\n        <dc:date opf:event="publication">' +
((__t = ( date )) == null ? '' : __t) +
'</dc:date>\n        ';
 if (description) { ;
__p += '\n		    <dc:description>' +
((__t = ( description )) == null ? '' : __t) +
'</dc:description>\n        ';
 } ;
__p += '\n		<dc:creator opf:role="aut">' +
((__t = ( author )) == null ? '' : __t) +
'</dc:creator>\n		<dc:publisher>' +
((__t = ( publisher )) == null ? '' : __t) +
'</dc:publisher>\n        ';
 if (cover) { ;
__p += '\n		    <meta name="cover" content="cover-image" />\n        ';
 } ;
__p += '\n        ';
 if (Array.isArray(tags) && tags.length) tags.forEach(tag => { ;
__p += '\n            <dc:subject>' +
((__t = ( tag )) == null ? '' : __t) +
'</dc:subject>\n        ';
 }); ;
__p += '\n	</metadata>\n\n	<manifest>\n        ';
 if (cover) { ;
__p += '\n		    <item id="front-cover" href="OEBPS/front-cover.html" media-type="application/xhtml+xml" />\n        ';
 } ;
__p += '\n		<item id="title-page" href="OEBPS/title-page.html" media-type="application/xhtml+xml" />\n		<item id="notes" href="OEBPS/notes.html" media-type="application/xhtml+xml" />\n		<item id="table-of-contents" href="OEBPS/table-of-contents.html" media-type="application/xhtml+xml" />\n        ';
 pages.forEach((page, index) => { ;
__p += '\n            <item id="page-' +
((__t = ( index )) == null ? '' : __t) +
'" href="OEBPS/page-' +
((__t = ( index )) == null ? '' : __t) +
'.html" media-type="application/xhtml+xml" />\n        ';
 }); ;
__p += '\n        ';
 if (cover) { ;
__p += '\n		    <item id="cover-image" href="' +
((__t = ( cover.path )) == null ? '' : __t) +
'" media-type="' +
((__t = ( cover.type )) == null ? '' : __t) +
'" properties="cover-image" />\n        ';
 } ;
__p += '\n		<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />\n        ';
 Object.keys(images).forEach(name => { ;
__p += '\n            <item id="' +
((__t = ( name )) == null ? '' : __t) +
'" href="OEBPS/' +
((__t = ( images[name].path )) == null ? '' : __t) +
'" media-type="' +
((__t = ( images[name].type )) == null ? '' : __t) +
'" />\n        ';
 }); ;
__p += '\n	</manifest>\n\n	<spine toc="ncx">\n        ';
 if (cover) { ;
__p += '\n		    <itemref idref="front-cover" linear="no" />\n        ';
 } ;
__p += '\n		<itemref idref="title-page" linear="yes" />\n		<itemref idref="table-of-contents" linear="yes" />\n        ';
 pages.forEach((page, index) => { ;
__p += '\n            <itemref idref="page-' +
((__t = ( index )) == null ? '' : __t) +
'" linear="yes" />\n        ';
 }); ;
__p += '\n        ';
 if (notes) { ;
__p += '\n            <itemref idref="notes" linear="yes" />\n        ';
 } ;
__p += '\n	</spine>\n\n	<guide>\n        ';
 if (cover) { ;
__p += '\n		    <reference type="cover" title="' +
((__t = ( i18n.cover )) == null ? '' : __t) +
'" href="OEBPS/front-cover.html" />\n        ';
 } ;
__p += '\n		<reference type="toc" title="' +
((__t = ( i18n.toc )) == null ? '' : __t) +
'" href="OEBPS/table-of-contents.html" />\n	</guide>\n\n</package>\n';

}
return __p
},
tocncx: function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<?xml version="1.0" encoding="UTF-8" ?>\n<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">\n\n<ncx version="2005-1" xml:lang="' +
((__t = ( i18n.code )) == null ? '' : __t) +
'" xmlns="http://www.daisy.org/z3986/2005/ncx/">\n	<head>\n		<meta name="dtb:uid" content="' +
((__t = ( uuid.id )) == null ? '' : __t) +
'" />\n		<meta name="dtb:depth" content="2" />\n		<meta name="dtb:totalPageCount" content="0" />\n		<meta name="dtb:maxPageNumber" content="0" />\n	</head>\n\n	<docTitle>\n		<text>' +
((__t = ( title )) == null ? '' : __t) +
'</text>\n	</docTitle>\n\n	<docAuthor>\n		<text>' +
((__t = ( author )) == null ? '' : __t) +
'</text>\n	</docAuthor>\n\n	<navMap>\n		<navPoint id="title-page" playOrder="1">\n			<navLabel>\n				<text>' +
((__t = ( i18n.info )) == null ? '' : __t) +
'</text>\n			</navLabel>\n			<content src="OEBPS/title-page.html" />\n		</navPoint>\n		<navPoint id="table-of-contents" playOrder="2">\n			<navLabel>\n				<text>' +
((__t = ( i18n.toc )) == null ? '' : __t) +
'</text>\n			</navLabel>\n			<content src="OEBPS/table-of-contents.html" />\n		</navPoint>\n        ';
 pages.forEach((title, index) => { ;
__p += '\n            <navPoint id="page-' +
((__t = ( index )) == null ? '' : __t) +
'" playOrder="' +
((__t = ( (index + 3) )) == null ? '' : __t) +
'">\n                <navLabel>\n                    <text>' +
((__t = ( title )) == null ? '' : __t) +
'</text>\n                </navLabel>\n                <content src="OEBPS/page-' +
((__t = ( index )) == null ? '' : __t) +
'.html" />\n            </navPoint>\n        ';
 }); ;
__p += '\n        ';
 if (notes) { ;
__p += '\n            <navPoint id="notes-page" playOrder="2">\n                <navLabel>\n                    <text>' +
((__t = ( i18n.note )) == null ? '' : __t) +
'</text>\n                </navLabel>\n                <content src="OEBPS/notes.html" />\n            </navPoint>\n        ';
 } ;
__p += '\n	</navMap>\n</ncx>\n';

}
return __p
}}

export default templates
