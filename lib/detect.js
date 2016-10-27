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
var http = require('http');
var logger = require('logx');

var host = '0.0.0.0';

function detect(port, fn) {
  var server = http.createServer();
  server.listen(port, host, function() {
    server.once('close', function() {
      fn(null, port);
    });
    server.close();
  });
  server.on('error', function() {
    logger.warn('Port ' + port + ' was occupied');
    port++;
    detect(port, host, fn);
  });
}

module.exports = foc(detect);
