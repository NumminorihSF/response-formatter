/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../human-formatter/text/plain');

describe('human-formatter/text/plain', function(){
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
    var a = {
      1:2,
      3:4,
      5:6
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('' +
        '1:\t2\n' +
        '3:\t4\n' +
        '5:\t6');
      done();
    });
  });

  it('wrap deep Object to formatted String', function(done){
    var a = {
      1:2,
      3:4,
      5:6,
      a:{
        1:2,
        2:3,
        3:{
          4:{
            5:6
          }
        },
        5:3
      }
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('' +
        '1:\t2\n' +
        '3:\t4\n' +
        '5:\t6\n' +
        'a:\n' +
        '\t1:\t2\n' +
        '\t2:\t3\n' +
        '\t3:\n' +
        '\t\t4:\n' +
        '\t\t5:\t6\n' +
        '\t5:\t3');
      done();
    });
  });

  it('wrap Array to formatted String', function(done){
    var a = [
      1,
      2,
      3,
      4,
      5,
      6
    ];
    mod(a, function(err, res){
      expect(res).to.be.equal(''+
        '1\n' +
        '2\n' +
        '3\n' +
        '4\n' +
        '5\n' +
        '6');
      done();
    });
  });

  it('wrap deep Array to formatted String', function(done){
    var a = [
      1,
      [
        2,
        [
          3,
          [
            4,
            4,
            4
          ],
          5
        ],
        6
      ],
      7
    ];
    mod(a, function(err, res){
      expect(res).to.be.equal('' +
        '1\n' +
        '\t2\n' +
        '\t\t3\n' +
        '\t\t\t4\n' +
        '\t\t\t4\n' +
        '\t\t\t4\n' +
        '\t\t5\n' +
        '\t6\n' +
        '7');
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