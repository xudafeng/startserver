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
var ipv4 = require('ipv4');
var exec = foc(require('child_process').exec);
var path = require('path');
var logger = require('logx');
var request = require('./request');
var detect = require('./detect');
var fs = require('./file');
var Server = require('./server');
var middleware = require('./middleware');
var render = require('./middleware/markdown').render;

var platform = process.platform;
var root = process.cwd();
var npm_api = 'https://registry.npmjs.org/startserver/latest';
var pkg = require('../package.json');

var requestOpt = {
  uri: npm_api,
  method: 'get',
  timeout: 2000
};

/**
 * open browser when options.normal true
 */
var opener = platform === 'win32' ? 'start' : platform === 'linux' ? 'xdg-open' : 'open';

function *init(port, options) {
  var server = new Server();
  middleware(server);
  var result = yield request(requestOpt);
  if (result) {
    var data = JSON.parse(result.body);

    if (data.version && pkg.version !== data.version) {
      logger.warn('Your version [' + pkg.version.red + '] id outdate, please exec '.yellow + 'npm install -g startserver@'.gray + data.version.gray + ' to update.'.yellow);
    }
  }

  try {
    yield detect(ipv4, port);
  } catch (port) {
    yield server.listen(port, ipv4);
    var url = 'http://' + ipv4 + ':' + port;
    if (!options.normal) yield exec(opener + ' ' + url);
    logger.info('Running at '.blue + url.blue);
  }
}

function generate(file) {
  var dir = path.dirname(root).split(path.sep);
  var dist = path.resolve(file);
  var content = render('slide', dir[dir.length - 1], path.resolve(file));
  fs.writeFileSync(dist + '.html', content);
  logger.info('File ' + dist.gray + '.html '.gray + 'created.'.blue);
}

exports.init = foc(init);
exports.generate = generate;
