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
var parse = require('url').parse;
var microtemplate = require('microtemplate');
var fs = require('../../file');

var root = process.cwd();
var dateReg = /year|month|day|hour|minite|second/g;

function *render(data) {
  var template = path.join(__dirname, 'default.tpl');
  template = yield fs.readFile(template, 'utf8');
  template = microtemplate.compile(template);
  return template(data);
}

function format(date) {
  return 'year-month-day hour:minite:second'.replace(dateReg, function(t) {
    switch (t) {
      case 'year':
        return date.getFullYear();
      case 'month':
        return date.getMonth();
      case 'day':
        return date.getDate();
      case 'hour':
        return date.getHours();
      case 'minite':
        return date.getMinutes();
      case 'second':
        return date.getSeconds();
    }
  });
}

function *filter(files, p) {
  var list = [];
  files.forEach(function(i) {
    var link = path.join(p, i);
    var local = root + link;
    var stat = fs.statSync(local);
    var size = stat.size;
    var mtime = stat.mtime;

    if (fs.isExistedDir(local)) {
      i += '/';
      size = '-';
    }

    list.push({
      name: i,
      path: link,
      lastModified: format(mtime),
      size: size
    });
  });
  return list;
}

function *directory() {
  var url = this.req.url;
  var dir = decodeURIComponent(parse(url).pathname);
  var local = path.normalize(path.join(root, dir));
  var parentPath = path.normalize(dir.replace(path.basename(dir), ''));

  if (dir === '/') {
    parentPath = '';
  }

  if (!fs.isExistedDir(local)) {
    return yield this.next();
  }

  if (local.slice(-1) !== path.sep) {
    this.statusCode = 302;
    this.setHeader('Location', url + '/');
    return yield this.next();
  }

  // index router
  if (!this.options.disable) {
    var arr = ['index.html', 'index.htm', 'default.html', 'default.htm'];

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
  }

  var files = yield fs.readdir(path.resolve(local));
  files = files.sort();
  files = yield *filter(files, dir);
  this.statusCode = 200;
  this.setHeader('Content-Type', this.mime['.html']);

  this.body = yield *render({
    path: dir,
    parentDir: parentPath,
    list: files
  });
  yield this.next();
}

module.exports = directory;
