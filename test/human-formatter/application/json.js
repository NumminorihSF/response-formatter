/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../human-formatter/application/json');

describe('human-formatter/application/json', function(){
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
      expect(res).to.be.equal('{\n\t"1": 2,\n\t"3": 4,\n\t"5": 6\n}');
      done();
    });
  });

  it('wrap deep Object to formatted String', function(done){
    var a = {1:2,3:4,5:6,a:{1:2}};
    mod(a, function(err, res){
      expect(res).to.be.equal('{\n\t"1": 2,\n\t"3": 4,\n\t"5": 6,\n\t"a": {\n\t\t"1": 2\n\t}\n}');
      done();
    });
  });

  it('wrap Array to JSON', function(done){
    var a = [1,2,3,4,5,6];
    mod(a, function(err, res){
      expect(res).to.be.equal('[\n\t1,\n\t2,\n\t3,\n\t4,\n\t5,\n\t6\n]');
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

  it('pass error to callback on Function', function(done){
    var a = function(done){};
    mod(a, function(err){
      expect(err).to.exist;
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