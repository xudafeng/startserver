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

var marked = require('marked');
var root = process.cwd();
var path = require('path');
var url = require('url');
var fs = require('fs');
var xutil = require('xutil');
var minitpl = require('minitpl');
var fileUtil = xutil.file;
var parse = url.parse;
var join = path.join;
var normalize = path.normalize;

function render(type, data) {
  var template = path.join(__dirname, type + '.tpl');
  template = fs.readFileSync(template, 'utf-8');
  template = minitpl.compile(template);
  return template(data);
}

function Markdown(req, res, next) {
  var url = parse(req.url),
    dir = decodeURIComponent(url.pathname),
    file = normalize(join(root, dir));

  if (path.extname(file).toLowerCase() === '.md'){
    var type = req.headers.cookie && !!~req.headers.cookie.indexOf('startserver-slide=true') ? 'slide' : 'default';
    file = fileUtil.readFile(file, 'utf-8');
    file = render(type, {
      content: marked(file),
      title: dir
    });
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.write(file, 'utf-8');
    res.end();
  } else {
    next();
  }
}

module.exports = Markdown;
