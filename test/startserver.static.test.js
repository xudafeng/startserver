'use strict';

var http = require('http');
var staticModel = require('../lib/middleware/static');

describe('lib/middleware/static', function () {

  it('static should be working ok', function (done) {

    var proxy = http.createServer(function( request, response ){
    staticModel(request, response, function(){}, done());
    proxy.close();
    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/test.txt').end();
  });

  it('Content-Type Must be 200', function (done) {
    var proxy = http.createServer(function( request, response ){
      response.statusCode.should.equal(200);
      proxy.close();
      done();

    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/test.txt').end();

  });

  it('Content-Type Must be 404', function (done) {
    var proxy = http.createServer(function( request, response ){
      staticModel(request, response, function(){
        (response._header.indexOf(404) != '-1').should.equal(true);
        (response._header.indexOf('text/plain') != '-1').should.equal(true);
        response.end();
        done();
      });
      proxy.close();

    }).listen(3333);

    http.request('http://127.0.0.1:3333/test/files/test.html').end();

  });

});
