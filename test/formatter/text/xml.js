/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../formatter/text/xml');

var wrap = function(data){
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><root>' +data+'</root>';
};

describe('formatter/text/xml', function(){
  it('wrap String to XML', function(done){
    var a = 'asdfe sdfjkejreGERT';
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('asdfe sdfjkejreGERT'));
      done();
    });
  });

  it('wrap Number to XML', function(done){
    var a = 100500;
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('100500'));
      done();
    });
  });

  it('wrap NaN to XML (to NaN)', function(done){
    var a = NaN;
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('NaN'));
      done();
    });
  });

  it('wrap Boolean to XML', function(done){
    var a = true;
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('true'));
      done();
    });
  });

  it('wrap Object to XML', function(done){
    var a = {1:2,3:4,5:6};
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('' +
        '<1>2</1>' +
        '<3>4</3>' +
        '<5>6</5>'));
      done();
    });
  });

  it('wrap deep Object to XML', function(done){
    var a = {1:2,3:4,5:6,a:{1:2}};
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('' +
        '<1>2</1>' +
        '<3>4</3>' +
        '<5>6</5>' +
        '<a>' +
        '<1>2</1>' +
        '</a>'));
      done();
    });
  });

  it('wrap Array to XML', function(done){
    var a = [1,2,3,4,5,6];
    mod(a, function(err, res){
      expect(res).to.be.equal(wrap('' +
        '<0>1</0>' +
        '<1>2</1>' +
        '<2>3</2>' +
        '<3>4</3>' +
        '<4>5</4>' +
        '<5>6</5>'));
      done();
    });
  });

  it('wrap null to empty XML', function(done){
    var a = null;
    mod(a, function(err, res){
      expect(res).to.be.equal('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><root/>');
      done();
    });
  });

  it('pass Function to empty XML', function(done){
    var a = function(){};
    mod(a, function(err, res){
      expect(res).to.be.equal('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><root/>');
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