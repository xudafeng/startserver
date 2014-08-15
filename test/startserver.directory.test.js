'use strict';

var http = require('http');
var directoryModel = require('../lib/middleware/directory');

describe('lib/middleware/directory', function () {

  it('directory should be working ok', function (done) {

    var proxy = http.createServer(function( request, response ){
      directoryModel(request, response, function(){
        (response._header.indexOf(200) != '-1').should.equal(true);
        (response._header.indexOf('text/html') != '-1').should.equal(true);
        done();
      });
      proxy.close();
    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/').end();
  });

  it('file just return and noting to do', function (done) {

    var proxy = http.createServer(function( request, response ){
      directoryModel(request, response, function(){
        response._header.should.equal('');
        done();
      });
      proxy.close();
    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/test.txt').end();
  });

  it('file just return and noting to do', function (done) {

    var proxy = http.createServer(function( request, response ){
      directoryModel(request, response, function(){
        response._header.should.equal('');
        done();
      });
      proxy.close();
    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/test.psd').end();
  });

  it('if has index.html,show the file', function () {

    var proxy = http.createServer(function( request, response ){
      directoryModel(request, response, function(res, next, localPath, url){
        (response._header.indexOf(200) != '-1').should.equal(true);
        (response._header.indexOf('text/html') != '-1').should.equal(true);
      });
      proxy.close();
    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/').end();
  });

});
