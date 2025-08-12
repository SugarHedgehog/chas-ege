'use strict';
// Node helper to replicate Grunt packTasks using src/util/pak.js
const fs = require('fs');
const path = require('path');
const ls = require('ls');
const mkdirp = require('mkdirp');

function packCppTasks(targetDir) {
  const tasks = ls('zdn/*/*/*.cpp');
  for (const t of tasks) {
    const outDir = path.join(targetDir, t.path);
    mkdirp.sync(outDir);
    const cpp = fs.readFileSync(t.full, 'utf8')
      .replace(/\\/g, '\\\\')
      .replace(/\'/g, '\\')
      .replace(/[\n\r]+/g, '\\n');
    fs.writeFileSync(path.join(outDir, t.name + '.js'),
      `'use strict';\n(function(){chas2.task.setJscppTask('${cpp}');})();\n`);
  }
}

module.exports = { packCppTasks };
