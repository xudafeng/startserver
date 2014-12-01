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
var microtemplate = require('microtemplate');
var fs = require('../../file');

var root = process.cwd();

function *render(data) {
  var template = path.join(__dirname, 'default.tpl');
  template = yield fs.readFile(template, 'utf8');
  template = microtemplate.compile(template);
  return template(data);
}

function *filter(files, p) {
  var list = [];
  files.forEach(function (i) {
    var link = path.join(p, i);
    var local = root + link;
    var stat = fs.statSync(local);
    var size = stat.size;
    var mtime = stat.mtime

    if (fs.isExistedDir(local)) {
      i += '/';
      size = '-';
    }

    list.push({
      name: i,
      path: path.join(p, i),
      lastModified: format(mtime, 'year-month-day hour:minite:second'),
      size: size
    });
  });
  return list;
}

function format(date, format) {
  return format.replace(/year|month|day|hour|minite|second/g, function(t) {
    switch (t) {
      case 'year':
        return date.getFullYear();
        break;
      case 'month':
        return date.getMonth();
        break;
      case 'day':
        return date.getDate();
        break;
      case 'hour':
        return date.getHours();
        break;
      case 'minite':
        return date.getMinutes();
        break;
      case 'second':
        return date.getSeconds();
        break;
    }
  });
}

function *directory() {
  var _url = this.req.url;
  var dir = decodeURIComponent(url.parse(_url).pathname);
  var local = path.normalize(path.join(root, dir));
  var parentPath = path.normalize(dir.replace(path.basename(dir), ''));

  if (dir === '/') parentPath = '';

  if (!fs.isExistedDir(local)) return yield this.next();

  if (local.slice(-1) !== path.sep) {
    this.statusCode = 302;
    this.setHeader('Location', _url + '/');
    return yield this.next();
  }

  // index router
  var arr = ['index.html', 'index.htm', 'default.html', 'default.htm'];
  var file;

  for (var i = 0; i < arr.length; i++) {
    var p = local + arr[i];

    if (fs.isExistedFile(p)) {
      this.statusCode = 200;
      this.setHeader('Content-Type', this.mime['.html']);
      this.body = yield fs.readFile(p);
      yield this.next();
      break;
    } else {
      continue;
    }
  }

  if (file) return yield this.next();
  var files = yield fs.readdir(path.resolve(local));
  files = files.sort();
  files = yield *filter(files, dir);
  this.statusCode = 200;
  this.setHeader('Content-Type', this.mime['.html']);
  var res = yield *render({
    path: dir,
    parentDir: parentPath,
    list: files
  });
  this.body = res;
  yield this.next();
}

module.exports = directory;
