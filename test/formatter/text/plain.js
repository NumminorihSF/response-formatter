/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/text/plain');

describe('formatter/text/plain', function(){
  it('return String as is', function(done){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal('asdfe sdfjkejreGERT');
      done();
    });
  });

  it('wrap Number to String', function(done){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal('100500');
      done();
    });
  });

  it('wrap NaN to String ("NaN")', function(done){
    var a = NaN;
    mod(a, function(err, res){
      expect(res).to.be.equal('NaN');
      done();
    });
  });

  it('wrap Boolean to String', function(done){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal('true');
      done();
    });
  });

  it('wrap Object to formatted String', function(done){
    var a = {1:2,3:4,5:6};
    mod(a, function(err, res){
      expect(res).to.be.equal('1:\t2\n3:\t4,\n5:\t6');
      done();
    });
  });

  it('wrap deep Object to formatted String', function(done){
    var a = {1:2,3:4,5:6,a:{1:2}};
    mod(a, function(err, res){
      expect(res).to.be.equal('1:\t2,\n3:\t4,\n5:\t6,a:\n\t1:\t2');
      done();
    });
  });

  it('wrap Array to formatted String', function(done){
    var a = [1,2,3,4,5,6];
    mod(a, function(err, res){
      expect(res).to.be.equal('1,\n2,\n3,\n4,\n5,\n6');
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