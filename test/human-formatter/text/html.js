/**
 * Created by numminorihsf on 15.02.16.
 */
var expect = require('chai').expect;
var mod = require('../../../human-formatter/text/html');

function A(){}
A.prototype.toString = function(){return 'ASDFjkvcren,rt 12348gvf4'};

describe('human-formatter/text/plain', function(){
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
      expect(res).to.be.equal('<ul>\n' +
        ' <li>1:<code>2</code></li>\n' +
        ' <li>3:<span>4</span></li>\n' +
        ' <li>5:<mark>false</mark></li>\n' +
        ' <li>6:</li>\n' +
        ' <li>7:</li>\n' +
        ' <li>8:<pre>ASDFjkvcren,rt 12348gvf4</pre></li>\n' +
        ' <li>9:<strong>null</strong></li>\n' +
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
      expect(res).to.be.equal('<ul>\n' +
        ' <li>1:<code>2</code></li>\n' +
        ' <li>3:<code>4</code></li>\n' +
        ' <li>5:<code>6</code></li>\n' +
        ' <li>a:<ul>\n' +
        '  <li>1:<code>2</code></li>\n' +
        '  <li>2:<code>3</code></li>\n' +
        '  <li>3:<ul>\n' +
        '   <li>4:<ul>\n' +
        '    <li>5:<code>6</code></li>\n' +
        '   </ul></li>\n' +
        '  </ul></li>\n' +
        '  <li>5:<code>3</code></li>\n' +
        ' </ul></li>\n' +
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
      expect(res).to.be.equal('<ol>\n'+
        ' <li><code>1</code></li>\n' +
        ' <li><span>2</span></li>\n' +
        ' <li><mark>true</mark></li>\n' +
        ' <li><code>4</code></li>\n' +
        ' <li></li>\n' +
        ' <li><pre>ASDFjkvcren,rt 12348gvf4</pre></li>\n' +
        ' <li></li>\n' +
        ' <li><code>6</code></li>\n' +
        ' <li><strong>null</strong></li>\n' +
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
      expect(res).to.be.equal('<ol>\n' +
        ' <li><code>1</code></li>\n' +
        ' <li><ol>\n' +
        '  <li><code>2</code></li>\n' +
        '  <li><ol>\n' +
        '   <li><code>3</code></li>\n' +
        '   <li><ol>\n' +
        '    <li><code>4</code></li>\n' +
        '    <li><code>4</code></li>\n' +
        '    <li><code>4</code></li>\n' +
        '   </ol></li>\n' +
        '   <li><code>5</code></li>\n' +
        '  </ol></li>\n' +
        '  <li><code>6</code></li>\n' +
        ' </ol></li>\n' +
        ' <li><code>7</code></li>\n' +
        '</ol>');
      done();
    });
  });

  it('wrap deep Object in Array to String', function(done){
    var a = [1,{a:1,b:2,c:{d:4}}];
    mod(a, function(err, res){
      expect(res).to.be.equal('<ol>\n' +
        ' <li><code>1</code></li>\n' +
        ' <li><ul>\n' +
        '  <li>a:<code>1</code></li>\n' +
        '  <li>b:<code>2</code></li>\n' +
        '  <li>c:<ul>\n' +
        '   <li>d:<code>4</code></li>\n' +
        '  </ul></li>\n' +
        ' </ul></li>\n' +
        '</ol>');
      done();
    });
  });


  it('wrap deep Array in Object to String', function(done){
    var a = {a:1,b:[1,2,[3]]};
    mod(a, function(err, res){
      expect(res).to.be.equal('<ul>\n' +
        ' <li>a:<code>1</code></li>\n' +
        ' <li>b:<ol>\n' +
        '  <li><code>1</code></li>\n' +
        '  <li><code>2</code></li>\n' +
        '  <li><ol>\n' +
        '   <li><code>3</code></li>\n' +
        '  </ol></li>\n' +
        ' </ol></li>\n' +
        '</ul>');
      done();
    });
  });

  it('wrap Object with custom #toString method to String', function(done){
    var a = new A();
    mod(a, function(err, res){
      expect(res).to.be.equal('<pre>ASDFjkvcren,rt 12348gvf4</pre>');
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