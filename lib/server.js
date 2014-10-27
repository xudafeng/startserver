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
var mime = require('./mime');

/**
 * constructor function
 */
function Server() {
  var that = this;
  that.stack = [];
  _bind.call(that);
}

/**
 * server listen
 */
function _listen(port, host, callback) {
  var that = this;
  http.createServer(function(req, res) {
    that.emit('start', req, res);
  }).listen(port, host);
  callback.call(that);
  return that;
}

/**
 * bundle function
 */
function _bundle(middleware) {
  var that = this;
  var name = middleware.prototype.constructor.name;
  that.stack.push({
    name: name || 'anonymous',
    handle: foc(middleware)
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
    var ctx = {
      mime: mime,
      req: req,
      res: res,
      next: foc(function next() {
        that.emit('next', req, res);
      })
    };

    if (that.stack[that.count]) {
      that.stack[that.count].handle.call(ctx);
    } else {
      that.emit('end', res);
    }
  }).on('end', function(res) {
    res.end();
  });
}

// add event target
util.inherits(Server, EventEmitter);

//augment function
Server.prototype.listen = foc(_listen);
Server.prototype.bundle = _bundle;

module.exports = Server;
