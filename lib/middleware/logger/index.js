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

'use strict';

var logx = require('logx');

function *logger() {
  logx.info('Method: '.gray + this.req.method.red, ' Url: '.gray + this.req.url.red);
  yield this.next();
}

module.exports = logger;
