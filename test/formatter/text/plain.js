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
    var a = {
      1:2,
      3:4,
      5:6,
      6:function(){},
      7:undefined,
      8:true,
      9:false
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('' +
        '1: 2\n' +
        '3: 4\n' +
        '5: 6\n' +
        '8: true\n' +
        '9: false');
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
        '1: 2\n' +
        '3: 4\n' +
        '5: 6\n' +
        'a:\n' +
        ' 1: 2\n' +
        ' 2: 3\n' +
        ' 3:\n' +
        '  4:\n' +
        '  5: 6\n' +
        ' 5: 3');
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
        ' 2\n' +
        '  3\n' +
        '   4\n' +
        '   4\n' +
        '   4\n' +
        '  5\n' +
        ' 6\n' +
        '7');
      done();
    });
  });

  it('wrap Object with custom #toString() to String', function(done){
    function A(){}
    A.prototype.toString = function(){
      return 'blalbalba';
    };
    var a = {1: new A()};
    mod(a, function(err, res){
      expect(res).to.be.equal('1: blalbalba');
      done();
    });
  });


  it('wrap Object with null to String', function(done){
    var a = {1:null};
    mod(a, function(err, res){
      expect(res).to.be.equal('1: null');
      done();
    });
  });

  it('wrap deep Object with null to String', function(done){
    var a = {1:{2:null}};
    mod(a, function(err, res){
      expect(res).to.be.equal('1:\n 2: null');
      done();
    });
  });

  it('wrap null to String', function(done){
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