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
var extname = path.extname;
var minitpl = require('minitpl');
var root = process.cwd();
var xutil = require('xutil');
var fileUtil = xutil.file;
var sep = path.sep;

var template = path.join(__dirname, 'default.tpl');
template = fs.readFileSync(template, 'utf-8');
template = minitpl.compile(template);

function fileFilter(files, p) {
  var list = [];
  var localPath = '';
  var stat;
  var linkPath;

  files.forEach(function (i) {
    linkPath = path.join(p, i);
    localPath = root + linkPath;

    if(fileUtil.isExistedDir(localPath)){
      i = i+ sep;
      linkPath = linkPath + sep;
    };
    var stat = fs.statSync(localPath);
    list.push({
      name: i,
      path: path.join(p, i),
      lastModified: formatDate(stat.mtime, 'YYYY-MM-DD hh:mm:ss'),
      size: stat.size
    });
  });

  return list;
}

function formatDate(date, format) {
  var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return format.replace(/YYYY|YY|MM|DD|hh|mm|ss/g, function(t) {
    switch (t) {
      case "YYYY": return date.getFullYear();
      case "YY": return (date.getFullYear()+"").slice(2);
      case "MM": return date.getMonth() + 1;
      case "DD": return date.getDate();
      case "hh": return date.getHours();
      case "mm": return date.getMinutes();
      case "ss": return date.getSeconds();
    }
  });
}

function indexRouter(res, files, localPath){
  var goon;

  if(!!~files.indexOf('index.html')){
    localPath = path.join(localPath, 'index.html');
    goon = true;
  }else if(!!~files.indexOf('index.htm')){
    localPath = path.join(localPath, 'index.htm');
    goon = true;
  }

  if(!goon){
    return goon;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  var file = fs.readFileSync(localPath, 'binary');
  res.write(file, 'binary');
  return goon;
}

function Directory(req, res, next) {

  var url = parse(req.url);
  var dir = decodeURIComponent(url.pathname);
  var localPath = normalize(join(root, dir));
  var parentPath = normalize(dir.replace(basename(dir), ''));
  if (dir == sep) {
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

      if (indexRouter(res, files, localPath)){
        next();
        return;
      }
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

module.exports = Directory;
