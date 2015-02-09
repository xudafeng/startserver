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

var mime = {
  '.css': 'text/css',
  '.gif': 'image/gif',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.swf': 'application/x-shockwave-flash',
  '.tiff': 'image/tiff',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.wma': 'audio/x-ms-wma',
  '.wmv': 'video/x-ms-wmv',
  '.xml': 'text/xml',
  '.swp': 'text/html',
  '.md': 'text/html',
  '.markdown': 'text/html',
  '.cer': 'application/pkix-cert',
  '.crt': 'application/x-x509-ca-cert',
  '.doc': 'application/msword',
  'unknow': 'application/octet-stream'
};

module.exports = mime;
