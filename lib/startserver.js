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

var ipv4 = require('./ipv4');
var util = require('./util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('startserver:');

function _listen(){
  console.log('listen');
}

function StartServer(){
}

var proto = {
  listen: _listen
};

util.augment(StartServer,proto);
util.inherits(StartServer, EventEmitter);

module.exports = StartServer;
