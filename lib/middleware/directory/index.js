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

function render(data) {
  var template = path.join(__dirname, 'default.tpl');
  template = fs.readFileSync(template, 'utf8');
  template = microtemplate.compile(template);
  return template(data);
}

function filter(files, p) {
  var list = [];
  var local = '';
  var stat, linkPath, size, mtime;

  files.forEach(function (i) {
    linkPath = path.join(p, i);
    local = root + linkPath;
    stat = fs.statSync(local);
    size = stat.size;
    mtime = stat.mtime

    if (fs.isExistedDir(local)) {
      i += '/';
      linkPath += '/';
      size = '-';
    }

    list.push({
      name: i,
      path: path.join(p, i),
      lastModified: formatDate(mtime, 'year-month-day hour:minite:second'),
      size: size
    });
  });

  return list;
}

function formatDate(date, format) {
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
  var _url = url.parse(this.req.url);
  var dir = decodeURIComponent(_url.pathname);
  var local = path.normalize(path.join(root, dir));
  var parentPath = path.normalize(dir.replace(path.basename(dir), ''));

  if (dir === path.sep) parentPath = '';

  if (!fs.isExistedDir(local) || router.call(this, local)) {
    return yield this.next();
  }

  var files = yield fs.readdir(path.resolve(local));
  files = files.sort();
  files = filter(files, dir);
  this.res.writeHead(200, {
    'Content-Type': this.mime['.html']
  });
  this.res.write(render({
    path: dir,
    parentDir: parentPath,
    list: files
  }));
  yield this.next();
}

function router(local) {
  var arr = ['index.html', 'index.htm'];
  var p = '';
  var file;

  if (local.slice(-1) !== path.sep) {
    this.res.writeHead(302, {
      'Location': this.req.url + path.sep
    });
    this.next()();
  }

  for (var i = 0; i < arr.length; i++) {
    p = local + arr[i];

    if (fs.isExistedFile(p)) {
      file = fs.readFileSync(p, 'binary');
      this.res.writeHead(200, {
        'Content-Type': this.mime['.html']
      });
      this.res.write(file, 'binary');
      this.next()();
      break;
    } else {
      continue;
    }
  }
  return file;
}

module.exports = directory;
