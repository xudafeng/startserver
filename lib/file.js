/* ================================================================
 * startserver by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var fs = require('fs');
var foc = require('foc');

function isExistedFile(p) {
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function isExistedDir(p) {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

module.exports = fs;
module.exports.exists = foc(fs.exists);
module.exports.readFile = foc(fs.readFile);
module.exports.writeFile = foc(fs.writeFile);
module.exports.stat = foc(fs.stat);
module.exports.readdir = foc(fs.readdir);
module.exports.isExistedFile = isExistedFile;
module.exports.isExistedDir = isExistedDir;
