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

var util = require('util');
var EventEmitter = require('events').EventEmitter;
var http = require('http');
var foc = require('foc');

/**
 * constructor function
 */
function Server() {
  var that = this;
  that.stack = [];
  that.bind();
}

// add event target
util.inherits(Server, EventEmitter);

//augment function
Server.prototype.listen = foc(_listen);
Server.prototype.bundle = _bundle;
Server.prototype.bind = _bind;

/**
 * server listen
 */
function _listen(port, host, callback) {
  var that = this;
  http.createServer(function(req, res) {
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
    name: name || 'anonymous',
    handle: middleware
  });
  return that;
}

/**
 * bind
 */

function _bind() {
  var that = this;
  that.on('start', function(req, res) {
    that.count = -1;
    that.emit('next', req, res);
  }).on('next', function(req, res) {
    that.count++;

    if (that.stack[that.count]) {
      that.stack[that.count].handle(req, res, function next() {
        that.emit('next', req, res);
      });
    } else {
      that.emit('end', req, res);
    }
  }).on('end', function(req, res) {
    res.end();
  });
}

module.exports = Server;
