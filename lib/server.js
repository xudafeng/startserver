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
var os = require('os');
var EventEmitter = require('events').EventEmitter;
var ecmascript6 = require('ecmascript6');
var http = require('http');
var exec = foc(require('child_process').exec);
var logger = require('logx');
var detect = require('./detect');
var mime = require('./mime');

var platform = process.platform;
var linuxShell = platform === 'linux' ? 'xdg-open' : 'open';
var openShell = platform === 'win32' ? 'start' : linuxShell;
var defalutHost = '0.0.0.0';

/**
 * bind
 */
function bind() {
  var that = this;
  that.on('start', function(ctx) {
    that.count = -1;
    that.emit('next', ctx);
  }).on('next', function(ctx) {
    try {
      that.count++;
      if (that.stack[that.count]) {
        that.stack[that.count].handle.call(ctx);
      } else {
        that.emit('end', ctx);
      }
    } catch(e) {
      ctx.res.end(e.toString());
    }
  }).on('end', function(ctx) {
    that.emit('beforeEnd', ctx);
    ctx.res.statusCode = ctx.statusCode || 500;

    ctx.headers.forEach(function(header) {
      Object.keys(header).forEach(function(k) {
        ctx.res.setHeader(k, header[k]);
      });
    });
    var powerByString = that.options.pkg.name + '/' + that.options.pkg.version;
    powerByString += ' node' + '/' + process.version;
    powerByString += ' (' + os.platform() + ')';
    ctx.res.setHeader('Server', powerByString);
    ctx.res.write(ctx.body || '', 'utf8');
    ctx.res.end();
  });
}

/**
 * constructor function
 */
function Server(options) {
  var that = this;
  that.options = options || {};
  that.stack = [];
  bind.call(that);
}

/**
 * server listen
 */
function *listen(port, host) {
  var that = this;

  logger.info('Using ECMAScript ' + (ecmascript6 ? 6 : 5) + ' now');

  port = yield detect(port, defalutHost);

  http.createServer(function(req, res) {
    // malloc ctx
    var ctx = {
      mime: mime,
      req: req,
      res: res,
      options: that.options,
      headers: [],
      next: foc(function next() {
        that.emit('next', ctx);
      }),
      end: foc(function() {
        that.emit('end', ctx);
      }),
      body: null,
      statusCode: null,
      type: null,
      setHeader: function(k, v) {
        var obj = {};
        obj[k] = v;
        this.headers.push(obj);
      }
    };

    that.emit('start', ctx);
  }).listen(port, defalutHost);

  var url = 'http://' + host + ':' + port;

  /**
   * open browser when options.silent true
   */
  if (!this.options.silent) {
    yield exec(openShell + ' ' + url);
  }

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

// add event target
util.inherits(Server, EventEmitter);

//augment function
Server.prototype.listen = listen;
Server.prototype.bundle = bundle;

module.exports = Server;
