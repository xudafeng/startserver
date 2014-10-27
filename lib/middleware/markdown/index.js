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
var path = require('path');
var url = require('url');
var microtemplate = require('microtemplate');
var fs = require('../../file');

var root = process.cwd();

function _render(type, data) {
  var template = path.join(__dirname, type + '.tpl');
  template = fs.readFileSync(template, 'utf8');
  template = microtemplate.compile(template);
  return template(data);
}

function render(type, dir, file) {
  var content = fs.readFileSync(file, 'utf8');
  content = _render(type, {
    content: marked(content),
    title: dir
  });
  return content;
}

function *markdown() {
  var _url = url.parse(this.req.url);
  var dir = decodeURIComponent(_url.pathname);
  var file = path.normalize(path.join(root, dir));
  var extname = path.extname(file).toLowerCase();

  if (extname === '.md' || extname === '.markdown') {
    var type = this.req.headers.cookie && !!~this.req.headers.cookie.indexOf('startserver-slide=true');
    file = render(type ? 'slide' : 'default', dir, file);
    this.res.writeHead(200, {
      'Content-Type': this.mime['html'] + '; charset=UTF-8'
    });
    this.res.write(file, 'utf8');
    this.res.end();
  } else {
    yield this.next();
  }
}

module.exports = markdown;
module.exports.render = render;
