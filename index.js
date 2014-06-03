#! /usr/bin/env node

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

//module.exports = require('./lib/startserver');
