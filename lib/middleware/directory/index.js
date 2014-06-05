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

"use strict";

var fs = require('fs');
var path = require('path');
var url = require('url');
var root = process.cwd();

var template = path.join(__dirname, 'default.tpl');

function Directory(req, res, next){

  var pathname = url.parse(req.url).pathname;
  var localPath = root + pathname;

  fs.stat(localPath, function(err, stat){
      if (err && err.code === 'ENOENT') {
        return next();
      }

      if (!stat.isDirectory()) {
        return next();
      }

      fs.readdir(localPath, function(err, files){
        if (err) return next();
        console.log(files.sort())
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(files.join('<br/>'));
        next();
      });
  });
}

module.exports = Directory;
