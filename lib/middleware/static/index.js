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

var url = require('url');
var path = require('path');
var fs = require('../../file');

var root = process.cwd();

function *statics() {
  var _url = url.parse(this.req.url);
  var dir = decodeURIComponent(_url.pathname);
  var file = path.normalize(path.join(root, dir));

  if (fs.isExistedFile(file)) {
    var data = yield fs.readFile(file);
    this.res.writeHead(200, {
      'Content-Type': this.mime[path.extname(file)]
    });
    this.res.write(data, 'binary');
    this.res.end();
  } else if (fs.isExistedDir(file)) {
    yield this.next();
  } else {
    this.res.writeHead(404, {
      'Content-Type': this.mime['.txt']
    });
    this.res.write('404', 'binary');
    yield this.next();
  }
}

module.exports = statics;
