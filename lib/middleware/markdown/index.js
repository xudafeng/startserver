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
var marked = require('marked');
var parse = require('url').parse;
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

function isMarkdownJSFile(url) {
  return !!~url.lastIndexOf('.md.js');
}

function *render(type, title, file, pdf) {
  if (isMarkdownJSFile(file)) {
    var reg = /---md-start---([\s\S]*)---md-end---/;
    var str = require(file).toString();
    var match = str.match(reg);
    file = match[1];
  } else {
    file = yield fs.readFile(file, 'utf8');
  }
  var res = yield *template(type, {
    content: marked(file),
    title: title,
    pdf: pdf || false
  });
  return res;
}

function *markdown() {
  if (!this.options.markdown && !this.options.pdf) {
    return yield this.next();
  }
  var cookie = this.req.headers.cookie;
  var url = parse(this.req.url);
  var dir = decodeURIComponent(url.pathname);
  var file = path.normalize(path.join(root, dir));
  var extname = path.extname(file).toLowerCase();
  var isMarkdownFile = extname === '.md' || extname === '.markdown' || isMarkdownJSFile(file);

  if (isMarkdownFile) {
    var type = cookie && !!~cookie.indexOf('startserver-slide=true');
    this.statusCode = 200;
    this.setHeader('Content-Type', this.mime['.html']);
    var t = type ? 'slide' : 'default';
    this.body = yield *render.call(this, t, dir, file, !!this.options.pdf);
    yield this.end();
  } else {
    yield this.next();
  }
}

module.exports = markdown;
module.exports.render = render;
