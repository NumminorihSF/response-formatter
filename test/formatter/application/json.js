/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/application/json');

describe('formatter/application/json', function(){
  it('wrap String to JSON', function(){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal('"asdfe sdfjkejreGERT"');
    });
  });

  it('wrap Number to JSON', function(){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal('100500');
    });
  });

  it('wrap Boolean to JSON', function(){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal('true');
    });
  });

  it('wrap Object to JSON', function(){
    var a = {1:2,3:4,5:6};
    mod(a, function(err, res){
      expect(res).to.be.equal('{"1":2,"3":4,"5":6}');
    });
  });

  it('wrap Array to JSON', function(){
    var a = [1,2,3,4,5,6];
    mod(a, function(err, res){
      expect(res).to.be.equal('[1,2,3,4,5,6]');
    });
  });

  it('wrap null to JSON', function(){
    var a = null;
    mod(a, function(err, res){
      expect(res).to.be.equal('null');
    });
  });

  it('pass error to callback on Function', function(){
    var a = function(){};
    mod(a, function(err){
      expect(err).to.exist;
    });
  });

  it('pass error to callback on undefined', function(){
    var a;
    mod(a, function(err){
      expect(err).to.exist;
    });
  });

  it('pass error to callback on recursive Object', function(){
    var a = {1:2,3:4,5:6};
    a['a'] = a;
    mod(a, function(err){
      expect(err).to.exist;
    });
  });
});