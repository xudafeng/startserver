'use strict';

var StartServer = require('../build/server');
var logger = require('../build/middleware/logger');
var markdown = require('../build/middleware/markdown');
var statics = require('../build/middleware/static');
var directory = require('../build/middleware/directory');

describe('/build/server.js', function() {
  var server;
  describe('main', function () {
    it('should has not error', function() {
      var error;
      try{
        server = new StartServer();
      } catch (e) {
        error = e;
      }
      (typeof error === 'undefined').should.be.true;
    });
  });
  describe('stack', function() {
    it('init function must have this members', function() {
      server.stack.should.have.length(0);
    });
  });
  describe('middleware', function() {
    it('should be ok', function() {
      server
      .bundle(logger)
      .bundle(markdown)
      .bundle(statics)
      .bundle(directory);
      server.stack.should.have.length(4);
    });
  });
});
