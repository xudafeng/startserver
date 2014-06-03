"use strict";

var os = require('os');
var util = require('./util');

/**
 * get ipv4
 */

function getIpv4() {
  var networkInterfaces = os.networkInterfaces();
  var ipv4 = null;
  util.each(networkInterfaces,function(networkInterface){
    networkInterface.forEach(function (network) {
      if (network.family === 'IPv4' && !network.internal) {
        ipv4 = network.address;
        return;
      }
    });
  });
  return ipv4;
};

module.exports = getIpv4();
