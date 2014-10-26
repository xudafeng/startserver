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

function readFileSync(p, encoding) {
  return fs.readFileSync(p, encoding);
}

function isExistedFile(p) {
  if(p === '') return false;
  return fs.existsSync(p) && fs.statSync(p).isFile();
}

function isExistedDir(p) {
  if(p === '') return false;
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

function writeFileSync(p, content) {
  fs.writeFileSync(p, content);
}

function statSync(p) {
  return fs.statSync(p);
}

exports.exists = foc(fs.exists);
exports.readFile = foc(fs.readFile);
exports.stat = foc(fs.stat);
exports.readdir = foc(fs.readdir);
exports.readFileSync = readFileSync;
exports.isExistedFile = isExistedFile;
exports.isExistedDir = isExistedDir;
exports.writeFileSync = writeFileSync;
exports.statSync = statSync;
