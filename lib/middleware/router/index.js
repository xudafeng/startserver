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

function router(data, next){
  console.log('exec router')
  next();
}

module.exports = router;
/**
 * #! /usr/bin/env node

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var root = process.cwd();

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  var localPath = root + pathname;
  path.exists(localPath, function (exists){
    if(!exists){
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("This request URL " + pathname + " was not found on this server.");
      res.end();
    } else {
      fs.readFile(localPath, 'binary', function (err, file){
        if(err){
          res.writeHead(500, {'Content-Type': 'text/plain'});
          res.end();
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(file, "binary");
          res.end();
        }
      });
    }
  });

}).listen(1337, '127.0.0.1');
*/
