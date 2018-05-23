const shell = require('shelljs');
const config = require('config');

shell.exec('babel src/server --out-dir dist/server');
shell.exec('cross-env NODE_ENV=production webpack');
