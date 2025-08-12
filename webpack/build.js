'use strict';
// Orchestrate build similar to Grunt default: build-except-ext + process-ext + process-unit-test
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const mkdirp = require('mkdirp');
const swig = require('swig-templates');
const htmlMinifier = require('html-minifier').minify;
const { packCppTasks } = require('./packcpp');
const pak = require('../src/util/pak');

function renderSwigDir(srcGlob, destBase, context) {
  const ls = require('ls');
  for (const f of ls(srcGlob)) {
    if (f.stat.isDirectory()) continue;
    const tpl = fs.readFileSync(f.full, 'utf8');
    const out = swig.render(tpl, { locals: context, filename: f.full, root: path.resolve('.') });
    const rel = path.relative(path.resolve(srcGlob.replace(/\*.*$/, '')), f.full);
    const outPath = path.join(destBase, rel);
    mkdirp.sync(path.dirname(outPath));
    fs.writeFileSync(outPath, out);
  }
}

function minifyHtmlDir(srcDir, pattern) {
  const ls = require('ls');
  for (const f of ls(path.join(srcDir, pattern))) {
    if (f.stat.isDirectory()) continue;
    const html = fs.readFileSync(f.full, 'utf8');
    let min;
    try {
      min = htmlMinifier(html, {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: false,
        minifyCSS: true,
      });
    } catch (e2) {
      console.warn('[htmlmin] fallback: write original for', f.full, '-', e2 && e2.message ? e2.message : e2);
      min = html;
    }
    const rel = path.relative(srcDir, f.full);
    const outPath = path.join('dist', rel);
    mkdirp.sync(path.dirname(outPath));
    fs.writeFileSync(outPath, min);
  }
}

function concat(files, dest) {
  const parts = [];
  for (const f of files) {
    if (!fs.existsSync(f)) {
      console.warn('[concat] skip missing', f);
      continue;
    }
    const raw = fs.readFileSync(f, 'utf8');
    // Strip sourceMappingURL comments to avoid 404 on concatenated bundles
    const cleaned = raw.replace(/\/[#@] sourceMappingURL=.*$/gm, '');
    parts.push(cleaned);
  }
  mkdirp.sync(path.dirname(dest));
  fs.writeFileSync(dest, parts.join('\n;;;\n'));
}

function uglify(src, dest) {
  // JS minification disabled to ensure stable build (some files are not parsable by terser)
  const code = fs.readFileSync(src, 'utf8');
  mkdirp.sync(path.dirname(dest));
  fs.writeFileSync(dest, code);
}

function ensureFile(target, source) {
  if (!fs.existsSync(target)) {
    mkdirp.sync(path.dirname(target));
    fs.copyFileSync(source, target);
  }
}

function build() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const version = pkg.version;
  const version_cache = Date.now();
  // 1) CSS and copy via webpack
  execSync('npx webpack --config webpack.config.js', { stdio: 'inherit' });

  // Ensure required external files exist for concatenation
  ensureFile('ext/seedrandom.min.js', 'node_modules/seedrandom/seedrandom.min.js');

  // 2) Concat chas-lib.js and chas-uijs.js and init.cat.js in build/
  const chasLibList = require('../lib/load-chas-lib.js').libList;
  const chasUijsList = require('../lib/load.js').libList;
  concat(chasLibList, 'build/lib/chas-lib.js');
  concat(chasUijsList, 'build/lib/chas-uijs.js');
  concat(['lib/init.js', 'build/lib/chas-uijs.js'], 'build/lib/init.cat.js');

  // 3) Uglify head.js, chas-lib.js, chas-uijs.js, init.cat.js into dist/lib
  uglify('lib/head.js', 'build/lib/head.min.js');
  uglify('build/lib/chas-lib.js', 'dist/lib/chas-lib.min.js');
  // Produce chas-uijs.min.js for production mode
  uglify('build/lib/chas-uijs.js', 'dist/lib/chas-uijs.min.js');
  uglify('build/lib/init.cat.js', 'dist/lib/init.min.js');

  // 4) Swig templates -> build then htmlmin -> dist
  const context = { version, version_cache };
  renderSwigDir('sh/*.html', 'build', context);
  renderSwigDir('doc/*.html', 'build', context);
  renderSwigDir('c2/*.html', 'build', context);
  renderSwigDir('test/*.html', 'build', context);
  minifyHtmlDir('build', 'sh/*.html');
  minifyHtmlDir('build', 'doc/*.html');
  minifyHtmlDir('build', 'c2/*.html');

  // 5) Copy sh and c2 JS already done by webpack copy plugin; tasks packs
  // pack .cpp -> .js into dist
  const { packCppTasks } = require('./packcpp');
  packCppTasks('dist');
  // pack zdn upak from dist/zdn into build/zdn
  pak.packZdnSync('dist/zdn', 'build/zdn');

  // Move upak.js to dist/zdn like Grunt did
  const lsUpak = require('ls');
  for (const f of lsUpak('build/zdn/*/upak.js')) {
    const setName = path.basename(path.dirname(f.full));
    const outDir = path.join('dist', 'zdn', setName);
    mkdirp.sync(outDir);
    fs.copyFileSync(f.full, path.join(outDir, 'upak.js'));
  }

  // 6) Unit test pages: render to build/test and copy JS
  renderSwigDir('test/*.html', 'build', context);

  // 7) Create stub favicon to avoid 404
  try {
    const favPath = path.join('dist', 'favicon.ico');
    if (!fs.existsSync(favPath)) {
      fs.writeFileSync(favPath, '');
    }
  } catch (e) {
    console.warn('[favicon] cannot create stub favicon.ico:', e && e.message ? e.message : e);
  }
  const lsUnit = require('ls');
  for (const f of lsUnit('test/*.js')) {
    if (f.stat.isDirectory()) continue;
    const outPath = path.join('build', f.path, f.name);
    mkdirp.sync(path.dirname(outPath));
    fs.copyFileSync(f.full, outPath);
  }
}

if (require.main === module) {
  build();
}

module.exports = { build };
