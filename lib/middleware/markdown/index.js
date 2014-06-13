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

var markdown = require( "markdown" ).markdown;
var root = process.cwd();
var path = require('path');
var url = require('url');
var fs = require('fs');
var xutil = require('xutil');
var fileUtil = xutil.file;
var parse = url.parse;
var join = path.join;
var normalize = path.normalize;

module.exports = Markdown;

function Markdown(req, res, next){
  var url = parse(req.url),
    dir = decodeURIComponent(url.pathname),
    file = normalize(join(root, dir));

  if(path.extname(file).toLowerCase() === '.md'){
    file = fileUtil.readFile(file, 'binary');
    file = markdown.toHTML(file);
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(file, "binary");
    res.end();
  }else{
    next();
  }
}
