'use strict';

var ecmascript6 = require('ecmascript6');
var logger = require('logx');

logger.info('Now using ecmascript' + (ecmascript6 ? 6 : 5));
module.exports = require(ecmascript6 ? './lib' : './build');
