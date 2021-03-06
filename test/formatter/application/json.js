/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/application/json');

describe('formatter/application/json', function(){
  it('wrap String to JSON', function(done){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal('"asdfe sdfjkejreGERT"');
      done();
    });
  });

  it('wrap Number to JSON', function(done){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal('100500');
      done();
    });
  });

  it('wrap NaN to JSON (to null)', function(done){
    var a = NaN;
    mod(a, function(err, res){
      expect(res).to.be.equal('null');
      done();
    });
  });

  it('wrap Boolean to JSON', function(done){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal('true');
      done();
    });
  });

  it('wrap Object to JSON', function(done){
    var a = {1:2,3:4,5:6};
    mod(a, function(err, res){
      expect(res).to.be.equal('{"1":2,"3":4,"5":6}');
      done();
    });
  });

  it('wrap deep Object to JSON', function(done){
    var a = {1:2,3:4,5:6,a:{1:2}};
    mod(a, function(err, res){
      expect(res).to.be.equal('{"1":2,"3":4,"5":6,"a":{"1":2}}');
      done();
    });
  });

  it('wrap Array to JSON', function(done){
    var a = [1,2,3,4,5,6];
    mod(a, function(err, res){
      expect(res).to.be.equal('[1,2,3,4,5,6]');
      done();
    });
  });

  it('wrap null to JSON', function(done){
    var a = null;
    mod(a, function(err, res){
      expect(res).to.be.equal('null');
      done();
    });
  });

  it('pass empty string to callback on Function', function(done){
    var a = function(){};
    mod(a, function(err, res){
      expect(res).to.be.equal('');
      done();
    });
  });

  it('pass error to callback on undefined', function(done){
    var a;
    mod(a, function(err){
      expect(err).to.exist;
      done();
    });
  });

  it('pass error to callback on recursive Object', function(done){
    var a = {1:2,3:4,5:6};
    a['a'] = a;
    mod(a, function(err){
      expect(err).to.exist;
      done();
    });
  });
});