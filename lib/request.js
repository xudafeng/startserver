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

var request = require('co-request');
var logger = require('logx');

module.exports = function *(options) {
  try {
    return yield request(options);
  } catch (err) {
    logger.warn('Get remote update info failed.');
    if (err.code === 'ETIMEDOUT') {
      return null;
    }
  }
};
