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
  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    callback();
  }).listen(port, "127.0.0.1");
}

/**
 * bundle function
 */
function _bundle(route, callback){
  
}

/**
 * constructor function
 */
function StartServer(){
}

// add event target
util.inherits(StartServer, EventEmitter);


//augment function
var proto = {
  listen: _listen,
  bundle: _bundle
};
util.augment(StartServer,proto);

module.exports = StartServer;
