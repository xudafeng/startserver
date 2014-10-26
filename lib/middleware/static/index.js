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
var foc = require('foc');
var fs = require('../../file');
var mime = require('../../mime');

var root = process.cwd();

function *statics(req, res, next) {
  var _url = url.parse(req.url);
  var dir = decodeURIComponent(_url.pathname);
  var file = path.normalize(path.join(root, dir));

  if (fs.isExistedFile(file)) {
    var data = yield fs.readFile(file);
    res.writeHead(200, {'Content-Type': mime[path.extname(file)]});
    res.write(data, 'binary');
    res.end();
  } else if (fs.isExistedDir(file)) {
    next();
  } else {
    res.writeHead(404, {'Content-Type': mime['.txt']});
    res.write('404', 'binary');
    next();
  }
}

module.exports = foc(statics);
