/* eslint-env node */
'use strict';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
  mode: 'production',
  context: __dirname,
  target: ['web', 'es5'],
  entry: {
    'css/chas-ui': './webpack/entries/chas-ui.css',
    'css/chas-ui-bs': './webpack/entries/chas-ui-bs.css',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { url: false } }],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].min.css' }),
    new CopyWebpackPlugin({
      patterns: [
        // JS for pages (keep structure)
        { from: 'sh/*.js', to: 'sh/[name][ext]' },
        { from: 'c2/*.js', to: 'c2/[name][ext]' },

        // Copy sources for dev/non-min mode compatibility
        { from: 'lib/**', to: 'lib', noErrorOnMissing: true },
        { from: 'src/**', to: 'src', noErrorOnMissing: true },

        // Copy externals
        { from: 'ext/**', to: 'ext', noErrorOnMissing: true },
        { from: 'node_modules/ace-builds/src-min', to: 'ext/ace' },
        { from: 'node_modules/mathjs/lib/browser/math.js', to: 'ext/math.js' },
        { from: 'node_modules/nerdamer/all.min.js', to: 'ext/nerdamer.js' },
        { from: 'node_modules/chas-storage/chasStorage.js', to: 'ext/chasStorage.js' },
        { from: 'node_modules/cubic-spline-browserified/cubic-spline-for-browser.js', to: 'ext/cubic-spline-for-browser.js' },
        { from: 'node_modules/flatten-js-browserified/dist/flatten_js_browserified.js', to: 'ext/flatten_js_browserified.js' },
        { from: 'node_modules/flatten-shape-geometry/dist/bundle.js', to: 'ext/flatten-shape-geometry.js' },
        { from: 'node_modules/html2canvas/dist/html2canvas.min.js', to: 'ext/html2canvas.js' },
        { from: 'node_modules/jszip/dist/jszip.min.js', to: 'ext/jszip.min.js' },
        { from: 'node_modules/seedrandom/seedrandom.min.js', to: 'ext/seedrandom.min.js' },

        // index.html
        { from: 'index.html', to: 'index.html' },

        // ZDN: copy directory tree as-is (JS, CPP, etc.)
        { from: 'zdn', to: 'zdn' },
      ],
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({ parallel: true }),
    ],
  },
  performance: {
    hints: false,
  },
  stats: 'minimal',
};
