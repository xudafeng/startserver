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

var path = require('path');
var url = require('url');
var marked = require('marked');
var highlight = require('highlight.js');
var microtemplate = require('microtemplate');
var fs = require('../../file');

var root = process.cwd();

marked.setOptions({
  highlight: function(code) {
    return highlight.highlightAuto(code).value;
  }
});

function *template(type, data) {
  var templateTpl = path.join(__dirname, type + '.tpl');
  templateTpl = yield fs.readFile(templateTpl, 'utf8');
  templateTpl = microtemplate.compile(templateTpl);
  return templateTpl(data);
}

function *render(type, title, file) {
  file = yield fs.readFile(file, 'utf8');
  var res = yield *template(type, {
    content: marked(file),
    title: title
  });
  return res;
}

function *markdown() {
  var _cookie = this.req.headers.cookie;
  var _url = url.parse(this.req.url);
  var _dir = decodeURIComponent(_url.pathname);
  var file = path.normalize(path.join(root, _dir));
  var extname = path.extname(file).toLowerCase();

  if (extname === '.md' || extname === '.markdown') {
    var type = _cookie && !!~_cookie.indexOf('startserver-slide=true');
    this.statusCode = 200;
    this.setHeader('Content-Type', this.mime['.html']);
    this.body = yield *render(type ? 'slide' : 'default', _dir, file);
    yield this.end();
  } else {
    yield this.next();
  }
}

module.exports = markdown;
module.exports.render = render;
