/* ================================================================
 * startserver by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2014 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var foc = require('foc');
var host = require('ipv4');
var path = require('path');
var logger = require('logx');
var request = require('./request');
var fs = require('./file');
var Server = require('./server');
var middleware = require('./middleware');
var render = require('./middleware/markdown').render;

var root = process.cwd();
var npm_api = 'https://registry.npmjs.org/startserver/latest';
var pkg = require('../package.json');

var opt = {
  uri: npm_api,
  method: 'get',
  timeout: 2000
};

var plugin = [];

function *init(port, options) {
  var that = this;
  var server = new Server(options);

  middleware(server);

  yield *getUpdateInfo();

  yield *server.listen(port, host);

  yield *plugins(true);

  server.on('beforeEnd', function(req, res) {
    plugin.forEach(function(i) {
      i.call(that, req, res);
    });
  });
}

function *getUpdateInfo() {
  var result = yield request(opt);

  if (!result) return;

  var data = JSON.parse(result.body);

  if (data.version && pkg.version !== data.version) {
    logger.warn('Version [' + pkg.version.gray + '] is outdate'.yellow);
    logger.warn('Exec ' + 'npm install -g startserver@'.gray + data.version.gray + ' for update'.yellow);
  }
}

function *generate(file) {
  var dir = path.dirname(root).split(path.sep);
  var dist = path.resolve(file);
  var res = yield *render('slide', dir[dir.length - 1], dist);
  yield fs.writeFile(dist + '.html', res);
  logger.info('File ' + dist.gray + '.html '.gray + 'created'.blue);
}

/**
 * show plugins
 */
function *plugins(load) {
  var pluginsDir = path.join(__dirname, '..', 'plugins');

  if (fs.isExistedDir(pluginsDir)) {
    var list = yield fs.readdir(pluginsDir);

    list.forEach(function(i) {
      var current = path.join(pluginsDir, i);

      if (!fs.isExistedDir(current)) return;

      if (load) {
        var mod = require(current);
        if (typeof mod === 'function') plugin.push(mod);
      } else {
        console.log('  ' + i.blue);
      }
    });
  } else {
    !load && logger.warn('not any plugins');
  }
}

exports.init = foc(init);
exports.generate = foc(generate);
exports.plugins = foc(plugins);
