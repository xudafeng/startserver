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

var foc = require('foc');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var ecmascript6 = require('ecmascript6');
var http = require('http');
var exec = foc(require('child_process').exec);
var logger = require('logx');
var detect = require('./detect');
var mime = require('./mime');

var platform = process.platform;
var opener = platform === 'win32' ? 'start' : platform === 'linux' ? 'xdg-open' : 'open';

/**
 * constructor function
 */
function Server(options) {
  var that = this;
  that.options = options || {};
  that.stack = [];
  _bind.call(that);
}

/**
 * server listen
 */
function *listen(port, host) {
  var that = this;

  logger.info('Now using ECMAScript ' + (ecmascript6 ? 6 : 5));

  port = yield detect(port, host);

  http.createServer(function(req, res) {
    that.emit('start', req, res);
  }).listen(port, host);

  var url = 'http://' + host + ':' + port;

  /**
   * open browser when options.normal true
   */
  if (!this.options.normal) yield exec(opener + ' ' + url);

  logger.info('Running at '.blue + url.blue);
}

/**
 * bundle function
 */
function bundle(middleware) {
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
Server.prototype.listen = listen;
Server.prototype.bundle = bundle;

module.exports = Server;
