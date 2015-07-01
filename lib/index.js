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
var plugin = require('./plugin');
var request = require('./request');
var fs = require('./file');
var Server = require('./server');
var middleware = require('./middleware');
var render = require('./middleware/markdown').render;

var root = process.cwd();

var opt = {
  uri: 'http://registry.npmjs.org/startserver/latest',
  method: 'get',
  timeout: 2000
};

function *getUpdateInfo(options) {
  var pkg = options.pkg;
  var result = yield request(opt);

  if (!result) {
    return;
  }

  var data = JSON.parse(result.body);

  if (data.version && pkg.version !== data.version) {
    logger.warn('Version [' + pkg.version.gray + '] is outdate'.yellow);
    var npmi = 'Exec npm i -g startserver@';
    logger.warn(npmi.gray + data.version.gray + ' to update'.yellow);
  }
}

function *init(port, options) {
  var server = new Server(options);

  middleware(server);

  yield *getUpdateInfo(options);

  yield *server.listen(port, host);

  var plugins = yield *plugin(true);

  server.on('beforeEnd', function(ctx) {
    plugins.forEach(function(i) {
      i.call(ctx, ctx.req, ctx.res);
    });
  });
}

function *generate(file) {
  var dir = path.dirname(root).split(path.sep);
  var dist = path.resolve(file);
  var res = yield *render('slide', dir[dir.length - 1], dist);
  yield fs.writeFile(dist + '.html', res);
  logger.info('File ' + dist.gray + '.html '.gray + 'created'.blue);
}

exports.init = foc(init);
exports.generate = foc(generate);
exports.plugin = foc(plugin);
