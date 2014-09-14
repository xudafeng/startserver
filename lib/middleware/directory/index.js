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
var path = require('path');
var url = require('url');
var normalize = path.normalize;
var basename = path.basename;
var minitpl = require('minitpl');
var root = process.cwd();
var xutil = require('xutil');
var fileUtil = xutil.file;
var parse = url.parse;
var join = path.join;
var sep = path.sep;

var template = path.join(__dirname, 'default.tpl');
template = fs.readFileSync(template, 'utf-8');
template = minitpl.compile(template);

module.exports = Directory;

function fileFilter(files, p) {
  var list = [];
  var localPath = '';
  var stat, linkPath, size;

  files.forEach(function (i) {
    linkPath = path.join(p, i);
    localPath = root + linkPath;

    stat = fs.statSync(localPath);
    size = stat.size;

    if (fileUtil.isExistedDir(localPath)){
      i = i+ '/';
      linkPath = linkPath + '/';
      size = '-';
    }

    list.push({
      name: i,
      path: path.join(p, i),
      lastModified: formatDate(stat.mtime, 'YYYY-MM-DD hh:mm:ss'),
      size: size
    });
  });

  return list;
}

function formatDate(date, format) {
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

    if (indexRouter(res, next, localPath, req.url)){
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

function indexRouter(res, next, localPath, standardPath){
  var indexArray = ['index.html', 'index.htm'];
  var indexPath = '';
  var indexFile;

  if (localPath.slice(-1) !== sep){
    res.writeHead(302, {
      'Location': standardPath+ sep
    });
    next();
  }

  for (var i = 0; i < indexArray.length; i++){
    indexPath = localPath + indexArray[i];

    if (!fileUtil.isExistedFile(indexPath)){
      continue;
    } else {
      indexFile = fileUtil.readFile(indexPath, 'binary');
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(indexFile, "binary");
      next();
      break;
    }
  }
  return indexFile;
}

