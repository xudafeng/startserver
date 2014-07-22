var chai = require('chai');
var should = chai.should();
var StartServer = require('../');


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
      should.equal(error, undefined);

    });
  });

  describe('StartServer', function () {
    it('init function must have this members', function () {
      server.stack.length.should.equal(0);
    });
    it('init function must have this members', function () {
      server._events.start.should.be.a('Function');
      server._events.next.should.be.a('Function');
      server._events.end.should.be.a('Function');
    });

  });

  describe('StartServer Prototype', function () {
    it('must has this types', function () {
      server.listen.should.be.a('Function');
      server.bundle.should.be.a('Function');
      server.bind.should.be.a('Function');
    });
  });
});