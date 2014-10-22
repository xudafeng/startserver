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
var microtemplate = require('microtemplate');
var fileUtil = xutil.file;

function render(type, data) {
  var template = path.join(__dirname, type + '.tpl');
  template = fs.readFileSync(template, 'utf-8');
  template = microtemplate.compile(template);
  return template(data);
}

function _markdown(type, dir, file) {
  var content = fileUtil.readFile(file, 'utf-8');
  content = render(type, {
    content: marked(content),
    title: dir
  });
  return content;
}

function Markdown(req, res, next) {
  var u = url.parse(req.url),
    dir = decodeURIComponent(u.pathname),
    file = path.normalize(path.join(root, dir)),
    extname = path.extname(file).toLowerCase();

  if (extname === '.md' || extname === '.markdown'){
    var type = req.headers.cookie && !!~req.headers.cookie.indexOf('startserver-slide=true') ? 'slide' : 'default';
    file = _markdown(type, dir, file);
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
    res.write(file, 'utf-8');
    res.end();
  } else {
    next();
  }
}

Markdown.markdown = _markdown;

module.exports = Markdown;
