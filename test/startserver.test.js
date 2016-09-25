'use strict';

var path = require('path');
var CliTest = require('command-line-test');

var StartServer = require('../lib/server');
var logger = require('../lib/middleware/logger');
var markdown = require('../lib/middleware/markdown');
var statics = require('../lib/middleware/static');
var directory = require('../lib/middleware/directory');

var pkg = require('../package');

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

  describe('middleware', function() {
    it('command line tool should be ok', function *() {
      var cliTest = new CliTest();
      var binFile = path.resolve(pkg.bin['startserver']);

      var res = yield cliTest.execFile(binFile, ['-v'], {});
      res.stdout.should.be.containEql(pkg.version);
    });
  });
});
