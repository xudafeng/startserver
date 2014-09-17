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
var root = process.cwd();
var fs = require('fs');
var path = require('path');
var join = path.join;
var parse = url.parse;
var extname = path.extname;
var normalize = path.normalize;
var mime = require('./mime');

module.exports = statics;

function statics(req, res, next) {
  var url = parse(req.url),
    dir = decodeURIComponent(url.pathname),
    path = normalize(join(root, dir));

  fs.exists(path, function (exists) {

    if (!exists) {
      res.writeHead(404, {'Content-Type': mime.lookUp('.txt')});
      res.write('404', 'binary');
      return next();
    }
    fs.readFile(path, 'binary', function (error, file) {

      if (error) {
        res.writeHead(500, {'Content-Type': mime.lookUp('.txt')});
        next();
      } else {
        res.writeHead(200, {'Content-Type': mime.lookUp(extname(path))});
        res.write(file, 'binary');
        res.end();
      }
    });
  });
}
