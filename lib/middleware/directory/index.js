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
var mime = require('../static/mime');
var root = process.cwd();

module.exports = Directory;

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
    stat = fs.statSync(localPath);
    if(stat.isDirectory()){
      i = i+ '/';
      linkPath = linkPath + '/';
    }

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

    if(indexRouter(res, localPath, req.url)){
      return false;
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

//index路由逻辑函数
function indexRouter(res, localPath, standardPath){
  var indexArray = ['index.html', 'index.htm'];
  var indexPath = '';
  var indexFile;

  if(localPath.slice(-1) !== '/'){
    res.writeHead(302, {
      'Location': standardPath+ '/'
    });
    res.end();
  }

  for (var i = 0; i < 2; i++){
    indexPath = localPath + indexArray[i];
    //同步读取文件耗费一定时间
    try{
      indexFile = fs.readFileSync(indexPath, 'binary');
    } catch (e){

    }
    if(indexFile){
      res.writeHead(200, {'Content-Type': mime.lookUp(extname(indexPath))});
      res.write(indexFile, "binary");
      res.end();
      return false;
    }
  }
  return indexFile;
}


