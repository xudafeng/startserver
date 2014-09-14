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

var util = require('xutil');
var EventEmitter = require('events').EventEmitter;
var http = require('http');

// add event target
util.inherits(StartServer, EventEmitter);

//augment function
util.augment(StartServer, {
  listen: _listen,
  bundle: _bundle,
  bind: _bind
});

module.exports = StartServer;

/**
 * constructor function
 */
function StartServer() {
  var that = this;
  that.stack = [];
  that.bind();
}

/**
 * server listen
 */
function _listen(port, host, callback) {
  var that = this;
  http.createServer(function (req, res) {
    that.emit('start', req, res);
  }).listen(port, host);
  callback();
}

/**
 * bundle function
 */
function _bundle(middleware) {
  var that = this;
  var name = middleware.prototype.constructor.name;
  that.stack.push({
    name: !!name ? name : 'anonymous',
    handle: middleware
  });
  return that;
}

/**
 * bind
 */

function _bind() {
  var that = this;
  that.on('start', function (req, res) {
    that.count = -1;
    that.emit('next', req, res);
  }).on('next', function (req, res) {
    that.count++;

    if (!that.stack[that.count]) {
      that.emit('end', req, res);
      return;
    }
    that.stack[that.count].handle(req, res, function next() {
      that.emit('next', req, res);
    });
  }).on('end', function (req, res) {
    res.end();
  });
}
