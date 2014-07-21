var chai = require('chai');
var should = chai.should();
var http = require('http');
var staticModel = require('../lib/middleware/static');


describe('lib/middleware/static', function () {
    var done = false;
    var config = {
      req: {
        url: 'http://127.0.0.1:3333/test/files/test.txt'
      },
      next: function () {
        done = true;
      }
    }
    var server = http.createServer();
    server.listen('3333', 'http://127.0.0.1');

    var req = http.request({
      hostname: 'http://127.0.0.1',
      port: '3333',
      path: '/test/files/test.txt'
    });

    it('static should be working ok', function () {
      staticModel(config.req, req, function(){
        done = true;
        req.end();
      });
      done.should.equal(false);
    });

});