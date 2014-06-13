/* ================================================================
 * startserver by xdf(xudafeng[at]126.com)
 *
 * first created at : Mon Jun 02 2014 20:15:51 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright 2013 xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

"use strict";

var color = require('colorx');

function logger(req, res, next){
  console.log('Method: '.gray() + req.method.yellow(), 'url: '.gray()+ req.url.red());
  next();
}

module.exports = logger;
