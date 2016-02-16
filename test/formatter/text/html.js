/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/text/html');

describe('formatter/text/plain', function(){
  it('return String as is', function(done){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal('<span>asdfe sdfjkejreGERT</span>');
      done();
    });
  });

  it('wrap Number to String', function(done){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal('<code>100500</code>');
      done();
    });
  });

  it('wrap NaN to String ("NaN")', function(done){
    var a = NaN;
    mod(a, function(err, res){
      expect(res).to.be.equal('<code>NaN</code>');
      done();
    });
  });

  it('wrap Boolean to String', function(done){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal('<mark>true</mark>');
      done();
    });
  });

  it('wrap Object to formatted String', function(done){
    var a = {
      1:2,
      3:"4",
      5:false
    };
    mod(a, function(err, res){
      expect(res).to.be.equal('<ul>' +
        '<li>1:<code>2</code></li>' +
        '<li>3:<span>4</span></li>' +
        '<li>5:<mark>false</mark></li></ul>');
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
      expect(res).to.be.equal('<ul>' +
        '<li>1:2</li>' +
        '<li>3:4</li>' +
        '<li>5:6</li>' +
        '<li>a:<ul>' +
        '<li>1:2</li>' +
        '<li>2:3</li>' +
        '<li>3:<ul>' +
        '<li>4:<ul>' +
        '<li>5:6</li>' +
        '</ul></li>' +
        '</ul></li>' +
        '<li>5:3</li>' +
        '</ul></li>' +
        '</ul>');
      done();
    });
  });

  it('wrap Array to formatted String', function(done){
    var a = [
      1,
      "2",
      true,
      4,
      5,
      6
    ];
    mod(a, function(err, res){
      expect(res).to.be.equal('<ol>'+
        '<li><code>1</code></li>' +
        '<li><span>2</span></li>' +
        '<li><mark>true</mark></li>' +
        '<li><code>4</code></li>' +
        '<li><code>5</code></li>' +
        '<li><code>6</code></li>' +
        '</ol>');
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
      expect(res).to.be.equal('<ol>' +
        '<li>1</li>' +
        '<li><ol>' +
        '<li>2</li>' +
        '<li><ol>' +
        '<li>3</li>' +
        '<li><ol>' +
        '<li>4</li>' +
        '<li>4</li>' +
        '<li>4</li>' +
        '</ol></li>' +
        '<li>5</li>' +
        '</ol></li>' +
        '<li>6</li>' +
        '</ol></li>' +
        '<li>7</li>' +
        '</ol>');
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
      expect(res).to.be.equal('<ul><li></li></ul>');
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