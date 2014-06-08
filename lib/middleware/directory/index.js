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
var parse = url.parse;
var join = path.join;
var normalize = path.normalize;
var basename = path.basename;
var minitpl = require('minitpl');
var root = process.cwd();

module.exports = Directory;

var template = path.join(__dirname, 'default.tpl');
template = fs.readFileSync(template, 'utf-8');
template = minitpl.compile(template);

function fileFilter(files, p) {
  var list = [];
  var localPath = '';

  files.forEach(function (i) {
    localPath = root + path.join(p, i);
    list.push({
      name: i,
      path: path.join(p, i),
      lastModified: fs.statSync(localPath).mtime,
      size: fs.statSync(localPath).size
    });
  });

  return list;
}

function Directory(req, res, next) {

  var url = parse(req.url);
  var dir = decodeURIComponent(url.pathname);
  var localPath = normalize(join(root, dir));
  var parentPath = normalize(dir.replace(basename(dir), ''));
  if (dir == '/') {
    parentPath = '';
  }

  fs.stat(localPath, function (err, stat) {
    if (err && err.code === 'ENOENT') {
      return next();
    }

    if (!stat.isDirectory()) {
      return next();
    }

    fs.readdir(localPath, function (err, files) {
      if (err) return next();
      files = files.sort();
      files = fileFilter(files, dir);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(template({
        path: dir,
        parentDir: parentPath,
        list: files
      }));
      next();
    });
  });
}


