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

"use strict";

var util = require('./util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('lib/startserver:');
var http = require('http');

/**
 * server listen
 */
function _listen(port, callback){
  var that = this;
  http.createServer(function (req, res) {
    that.middleware(req, res);
  }).listen(8888||port, "127.0.0.1");
}

/**
 * bundle function
 */
function _bundle(middleware){
  var that = this;
  var name = middleware.prototype.constructor.name;
  that.stack.push({
    name: !!name ? name: 'anonymous',
    handle: middleware
  });
}

/**
 * middleware
 */
function _middleware(req, res){
  var that = this;
  that.stack.forEach(function(i){
    i.handle(req, res);
  });
}

/**
 * constructor function
 */
function StartServer(){
  this.stack = [];
}

// add event target
util.inherits(StartServer, EventEmitter);


//augment function
var proto = {
  listen: _listen,
  bundle: _bundle,
  middleware: _middleware
};
util.augment(StartServer,proto);

module.exports = StartServer;
