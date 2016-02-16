/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/text/html');

function A(){}
A.prototype.toString = function(){return 'ASDFjkvcren,rt 12348gvf4'};

describe('formatter/text/plain', function(){
  it('return String wrapped to <span/>', function(done){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal('<span>asdfe sdfjkejreGERT</span>');
      done();
    });
  });

  it('wrap Number to <code/>', function(done){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal('<code>100500</code>');
      done();
    });
  });

  it('wrap NaN to <code>NaN</code>)', function(done){
    var a = NaN;
    mod(a, function(err, res){
      expect(res).to.be.equal('<code>NaN</code>');
      done();
    });
  });

  it('wrap Boolean to <mark/>', function(done){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal('<mark>true</mark>');
      done();
    });
  });

  it('wrap Object to <ul/>', function(done){
    var a = {
      1:2,
      3:"4",
      5:false,
      6:function(){},
      7:undefined,
      8:new A(),
      9: null
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('<ul>' +
        '<li>1:<code>2</code></li>' +
        '<li>3:<span>4</span></li>' +
        '<li>5:<mark>false</mark></li>' +
        '<li>6:</li>' +
        '<li>7:</li>' +
        '<li>8:<pre>ASDFjkvcren,rt 12348gvf4</pre></li>' +
        '<li>9:<strong>null</strong></li>' +
        '</ul>');
      done();
    });
  });

  it('wrap deep Object to <ul/>', function(done){
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
      expect(res).to.be.equal('<ul>' +
        '<li>1:<code>2</code></li>' +
        '<li>3:<code>4</code></li>' +
        '<li>5:<code>6</code></li>' +
        '<li>a:<ul>' +
        '<li>1:<code>2</code></li>' +
        '<li>2:<code>3</code></li>' +
        '<li>3:<ul>' +
        '<li>4:<ul>' +
        '<li>5:<code>6</code></li>' +
        '</ul></li>' +
        '</ul></li>' +
        '<li>5:<code>3</code></li>' +
        '</ul></li>' +
        '</ul>');
      done();
    });
  });

  it('wrap Array to <ol/>', function(done){
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
      expect(res).to.be.equal('<ol>'+
        '<li><code>1</code></li>' +
        '<li><span>2</span></li>' +
        '<li><mark>true</mark></li>' +
        '<li><code>4</code></li>' +
        '<li></li>' +
        '<li><pre>ASDFjkvcren,rt 12348gvf4</pre></li>' +
        '<li></li>' +
        '<li><code>6</code></li>' +
        '<li><strong>null</strong></li>' +
        '</ol>');
      done();
    });
  });

  it('wrap deep Array to <ol/>', function(done){
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
      expect(res).to.be.equal('<ol>' +
        '<li><code>1</code></li>' +
        '<li><ol>' +
        '<li><code>2</code></li>' +
        '<li><ol>' +
        '<li><code>3</code></li>' +
        '<li><ol>' +
        '<li><code>4</code></li>' +
        '<li><code>4</code></li>' +
        '<li><code>4</code></li>' +
        '</ol></li>' +
        '<li><code>5</code></li>' +
        '</ol></li>' +
        '<li><code>6</code></li>' +
        '</ol></li>' +
        '<li><code>7</code></li>' +
        '</ol>');
      done();
    });
  });

  it('wrap null to formatted String', function(done){
    var a = null;
    mod(a, function(err, res){
      expect(res).to.be.equal('<strong>null</strong>');
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