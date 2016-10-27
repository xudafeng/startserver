/* ================================================================
 * StartServer by xdf(xudafeng[at]126.com)
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

var WebSocketServer = require('ws').Server;

var detect = require('./detect');

var wss = null;
var ws = null;
var port = null;

exports.init = function *() {
  var _port = yield detect(8085);
  port = _port;
  wss = wss || new WebSocketServer({port: port});
  wss.on('connection', function(_ws) {
    ws = ws || _ws;
  });
};

exports.send = function(data) {
  ws && ws.send(data);
};

exports.getSocketPort = function() {
  return port;
};
