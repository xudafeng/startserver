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

var net = require('net');
var logger = require('logx');
var foc = require('foc');

function detect(ipv4, port, callback) {
  var server = net.createServer();
  server.listen(port, ipv4, function() {
    server.once('close', function() {
      callback(port);
    });
    server.close();
  });
  server.on('error', function() {
    logger.warn('Port ' + port + ' is occupied.');
    port ++;
    detect(ipv4, port, callback);
  });
}

module.exports = foc(detect);
