var expect = require('chai').expect;
var mod = require('../index');

function Request(waitType){
  return {
    data: {
      data:'from_request'
    },
    accepts: function(canType){
      if (canType.indexOf(waitType) === -1){
        return undefined;
      }
      return waitType;
    }
  }
}

describe('Main Module', function(){
  describe('without process.env.NODE_ENV="production"', function(){
    it('provides function as module.exports', function(){
      expect(mod).to.be.instanceof(Function);
    });

    it('not throw error if no options passed in module call', function(){
      expect(mod).to.not.throw(Error);
    });

    it('return function on initialize', function(){
      expect(mod()).to.be.instanceof(Function);
    });

    it('return function that expect 3 arguments', function(){
      expect(mod().length).to.be.equal(3);
    });

    describe('on work with empty available type list', function(){
      it('not throw error on create', function(){
        expect(mod.bind(this, {formats:[]})).to.not.throw(Error);
      });
    });

    describe('on work with [application/json] type list', function(){
      it('not throw error on create', function(){
        expect(mod.bind(this, {formats:['application/json']})).to.not.throw(Error);
      });

      describe('on request that wait "application/json"', function(){
        it('not throw error on usage', function(){
          var req = new Request('application/json');
          var module = mod({formats:['application/json']});
          expect(module.bind(this,req,{},function(){})).to.not.throw(Error);
        });

        it('return valid json to callback', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{\n\t"my": "json"\n}');
            done();
          });
        });

        it('get data from request (by "request") if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'request.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{\n\t"data": "from_request"\n}');
            done();
          });
        });

        it('get data from req (by "req") if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'req.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{\n\t"data": "from_request"\n}');
            done();
          });
        });

        it('get data from res with user path if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}, my:{data:"from_user_space"}};

          var module = mod({dataSource:'res.my.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('"from_user_space"');
            done();
          });
        });

        it('put data into req if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataDestination:'req.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(req.need.here).to.be.equal('{\n\t"my": "json"\n}');
            done();
          });
        });

        it('put data into res with user path if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataDestination:'res.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(res.need.here).to.be.equal('{\n\t"my": "json"\n}');
            done();
          });
        });

        it('return non-humanised data if options#human = false', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({human: false, dataDestination:'res.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(res.need.here).to.be.equal('{"my":"json"}');
            done();
          });
        });

        it('not throws error on unexpected path', function(){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'res.want.here',formats:['application/json']});
          expect(module.bind(this,req, res, function(){})).to.not.throw(Error);
        });

        it('pass error to callback on unexpected path', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'res.want.here',formats:['application/json']});
          module(req, res, function(e){
            expect(e).to.be.instanceof(Error);
            done();
          });
        });
      });
    });
  });

  describe('on process.env.NODE_ENV="production"', function(){
    var env = process.env;
    beforeEach(function(){
      process.env = {NODE_ENV:"production"};
    });
    afterEach(function(){
      process.env = env;
    });

    it('provides function as module.exports', function(){
      expect(mod).to.be.instanceof(Function);
    });

    it('not throw error if no options passed in module call', function(){
      expect(mod).to.not.throw(Error);
    });

    it('return function on initialize', function(){
      expect(mod()).to.be.instanceof(Function);
    });

    it('return function that expect 3 arguments', function(){
      expect(mod().length).to.be.equal(3);
    });

    describe('on work with empty available type list', function(){
      it('not throw error on create', function(){
        expect(mod.bind(this, {formats:[]})).to.not.throw(Error);
      });
    });

    describe('on work with [application/json] type list', function(){
      it('not throw error on create', function(){
        expect(mod.bind(this, {formats:['application/json']})).to.not.throw(Error);
      });

      describe('on request that wait "application/json"', function(){
        it('not throw error on usage', function(){
          var req = new Request('application/json');
          var module = mod({formats:['application/json']});
          expect(module.bind(this,req,{},function(){})).to.not.throw(Error);
        });

        it('return valid json to callback', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{"my":"json"}');
            done();
          });
        });

        it('get data from request (by "request") if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'request.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{"data":"from_request"}');
            done();
          });
        });

        it('get data from req (by "req") if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'req.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('{"data":"from_request"}');
            done();
          });
        });

        it('get data from res with user path if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}, my:{data:"from_user_space"}};

          var module = mod({dataSource:'res.my.data',formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('"from_user_space"');
            done();
          });
        });

        it('put data into req if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataDestination:'req.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(req.need.here).to.be.equal('{"my":"json"}');
            done();
          });
        });

        it('put data into res with user path if need', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataDestination:'res.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(res.need.here).to.be.equal('{"my":"json"}');
            done();
          });
        });

        it('return humanised data if options#human = true', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({human: true, dataDestination:'res.need.here',formats:['application/json']});
          module(req, res, function(){
            expect(res.need.here).to.be.equal('{\n\t"my": "json"\n}');
            done();
          });
        });

        it('not throws error on unexpected path', function(){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'res.want.here',formats:['application/json']});
          expect(module.bind(this,req, res, function(){})).to.not.throw(Error);
        });

        it('pass error to callback on unexpected path', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({dataSource:'res.want.here',formats:['application/json']});
          module(req, res, function(e){
            expect(e).to.be.instanceof(Error);
            done();
          });
        });
      });
    });
  });

  describe('use userFormatter', function(){
    var uFor = function(data,cb){
      return cb(null, 'Use user formatter');
    };
    it('provides function as module.exports', function(){
      expect(mod).to.be.instanceof(Function);
    });

    it('not throw error if no options passed in module call', function(){
      expect(mod).to.not.throw(Error);
    });

    it('return function on initialize', function(){
      expect(mod({userFormatters:{'application/json':uFor}})).to.be.instanceof(Function);
    });

    it('return function that expect 3 arguments', function(){
      expect(mod({userFormatters:{'application/json':uFor}}).length).to.be.equal(3);
    });

    describe('on work with [application/json] type list', function(){
      it('not throw error on create', function(){
        expect(mod.bind(this, {userFormatters:{'application/json':uFor}, formats:['application/json']})).to.not.throw(Error);
      });

      describe('on request that wait "application/json"', function(){
        it('not throw error on usage', function(){
          var req = new Request('application/json');
          var module = mod({userFormatters:{'application/json':uFor}, formats:['application/json']});
          expect(module.bind(this,req,{},function(){})).to.not.throw(Error);
        });

        it('return expected value from user formatter', function(done){
          var req = new Request('application/json');
          var res = {locals: {my:'json'}};

          var module = mod({userFormatters:{'application/json':uFor}, formats:['application/json']});
          module(req, res, function(){
            expect(res.sentData).to.be.equal('Use user formatter');
            done();
          });
        });
      });
    });
  });

  describe('use fallback formatter (1st on list) if req.accepts returns undefined', function(){
    it('return expected value from user formatter', function(done){
      var req = new Request('application/unexpected');
      var res = {locals: {my:'json'}};

      var module = mod({human: false,formats:['application/json']});
      module(req, res, function(){
        expect(res.sentData).to.be.equal('{"my":"json"}');
        done();
      });
    });
  });
});