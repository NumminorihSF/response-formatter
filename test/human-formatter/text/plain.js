/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../human-formatter/text/plain');

function A(){}
A.prototype.toString = function(){return 'ASDFjkvcren,rt 12348gvf4'};

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

  it('wrap NaN to String("NaN")', function(done){
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
      3:"4",
      5:false,
      6:function(){},
      7:undefined,
      8:new A(),
      9:null
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('' +
        '1: 2\n' +
        '3: 4\n' +
        '5: false\n' +
        '6:\n' +
        '7:\n' +
        '8: ASDFjkvcren,rt 12348gvf4\n' +
        '9: null');
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
        '   5: 6\n' +
        ' 5: 3');
      done();
    });
  });

  it('wrap Array to formatted String', function(done){
    function A(){}
    A.prototype.toString = function(){return 'ASDFjkvcren,rt 12348gvf4'};
    var a = [
      1,
      "2",
      true,
      4,
      undefined,
      new A(),
      function(){},
      6,
      null
    ];
    mod(a, function(err, res){
      expect(res).to.be.equal(''+
        '1\n' +
        '2\n' +
        'true\n' +
        '4\n' +
        '\n' +
        'ASDFjkvcren,rt 12348gvf4\n' +
        '\n' +
        '6\n' +
        'null');
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

  it('wrap null to formatted String', function(done){
    var a = null;
    mod(a, function(err, res){
      expect(res).to.be.equal('null');
      done();
    });
  });

  it('wrap Object with custom #toString method to String', function(done){
    var a = new A();
    mod(a, function(err, res){
      expect(res).to.be.equal('ASDFjkvcren,rt 12348gvf4');
      done();
    });
  });

  it('wrap deep Object in Array to String', function(done){
    var a = [1,{a:1,b:2,c:{d:4}}];
    mod(a, function(err, res){
      expect(res).to.be.equal('1\na: 1\nb: 2\nc:\n d: 4');
      done();
    });
  });


  it('wrap deep Array in Object to String', function(done){
    var a = {a:1,b:[1,2,[3]]};
    mod(a, function(err, res){
      expect(res).to.be.equal('a: 1\nb:\n 1\n 2\n  3');
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