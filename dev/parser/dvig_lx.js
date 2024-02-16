//node dvig_lx.js ../dev/dvig/number/ matege2023p/1/

'use strict';

require('../../src/chaslib/Object_generic.js');
require('../../lib/string.js');
require('../../lib/func.js');
require('../../lib/lx.js');

let path = process.argv.slice(2,4);
const fs = require('fs')
const filenames = fs.readdirSync(path[0]);
let text;
for (let i = 0; i < filenames.length; i++) {
	let lib = require('../../lib/dvig_lz.js');
	text = fs.readFileSync(path[0] + filenames[i], 'utf8')
	text = lib.makeTemplateFromPlainText(text);
	try {
		fs.writeFileSync(path[1] + filenames[i].replace('txt', 'js') + '', text);
	} catch (err) {
		console.error(err);
	}
}
