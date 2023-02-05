'use strict';
String.prototype.isSpace = function () {
	/**Состоит ли строка только из пробельных символов?*/
	return (/^\s+$/).test(this);
};
String.prototype.isNumeric = function () {
	/**Является ли строка числом, возможно, с десятичной точкой или запятой?*/
	return /^-?[0-9]+([.,][0-9])?$/.test(this);
}
let lib2 = require('../../lib/sklon.js');
let lib = require('../../lib/dvig_lz.js');
let lib1 = require('../../lib/func.js');
let lib3 = require('../../lib/lxskl.js');
const fs = require('fs');
var text = fs.readFileSync('test.txt','utf8')
text=lib.makeTemplateFromPlainText(text);
try {
  fs.writeFileSync('file.js', text);
  // file written successfully
} catch (err) {
  console.error(err);
}


