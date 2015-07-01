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

var parse = require('url').parse;
var path = require('path');
var fs = require('../../file');

var root = process.cwd();

function *statics() {
  var url = parse(this.req.url);
  var dir = decodeURIComponent(url.pathname);
  var file = path.normalize(path.join(root, dir));

  if (fs.isExistedFile(file)) {
    var data = yield fs.readFile(file);
    this.statusCode = 200;
    var t = this.mime[path.extname(file)] || this.mime.unknow;
    this.setHeader('Content-Type', t);
    this.body = data;
    yield this.end();
  } else if (fs.isExistedDir(file)) {
    yield this.next();
  } else {
    this.statusCode = 404;
    this.setHeader('Content-Type', this.mime['.txt']);
    this.body = '404 Not Found';
    yield this.next();
  }
}

module.exports = statics;
