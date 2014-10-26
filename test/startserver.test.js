'use strict';

var StartServer = require('../build/server');

describe('startserver.js', function () {
  var server;
  describe('startserver', function () {
    it('should has not error', function () {
      var error;
      try{
        server = new StartServer();
      } catch (e) {
        error = e;
      }
      (typeof error === 'undefined').should.be.true;
    });
  });

  describe('StartServer', function () {
    it('init function must have this members', function () {
      server.stack.should.have.length(0);
    });
  });
});
