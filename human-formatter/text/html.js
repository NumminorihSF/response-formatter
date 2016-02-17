/**
 * Created by numminorihsf on 15.02.16.
 */


var syncWrapper = {
  string: function(data){
    return '<span>'+data+'</span>';
  },
  number: function(data){
    return '<code>'+data.toString()+'</code>';
  },
  boolean: function(data){
    return '<mark>'+(data ? 'true' : 'false')+'</mark>';
  },
  "function": function(){
    return '';
  },
  "undefined": function(){
    return '';
  },
  "null": function(){
    return '<strong>null</strong>';
  },
  "array": function(data, rec){
    rec = rec || 1;
    var prefix = '';
    var lastPre = '';
    var i = rec;
    while (i-- > 0){
      lastPre = prefix;
      prefix += ' ';
    }
    var arrayMap = data.map(function(val){
      var type = typeof val;
      switch (type) {
        case 'string':
          return prefix + '<li>' + syncWrapper.string(val) + '</li>';
        case 'number':
          return prefix + '<li>' + syncWrapper.number(val) + '</li>';
        case 'boolean':
          return prefix + '<li>' + syncWrapper.boolean(val) + '</li>';
        case 'function':
          return prefix + '<li>' + syncWrapper.function(val) + '</li>';
        case 'undefined':
          return prefix + '<li>' + syncWrapper.undefined(val) + '</li>';
        default:
          if (val === null) return prefix + '<li>' + syncWrapper.null(val) + '</li>';
          if (val instanceof Array) return prefix + '<li>' + syncWrapper.array(val, rec+1) + '</li>';
          if (val.toString === Object.prototype.toString) return prefix + '<li>' + syncWrapper.object(val, rec+1) + '</li>';
          return prefix + '<li><pre>' + val.toString() + '</pre></li>';
      }
    }).join('\n');
    return '<ol>\n' + arrayMap + '\n' + lastPre+ '</ol>';
  },
  "object": function(data, rec){
    rec = rec || 1;
    var prefix = '';
    var lastPre = '';
    var i = rec;
    while (i-- > 0){
      lastPre = prefix;
      prefix += ' ';
    }
    var objectMap = Object.keys(data).map(function(key){
      var val = data[key];
      var type = typeof val;
      switch (type) {
        case 'string':
          return prefix + '<li>' + key + ':' + syncWrapper.string(val) + '</li>';
        case 'number':
          return prefix + '<li>' + key + ':' + syncWrapper.number(val) + '</li>';
        case 'boolean':
          return prefix + '<li>' + key + ':' + syncWrapper.boolean(val) + '</li>';
        case 'function':
          return prefix + '<li>' + key + ':' + syncWrapper.function(val) + '</li>';
        case 'undefined':
          return prefix + '<li>' + key + ':' + syncWrapper.undefined(val) + '</li>';
        default:
          if (val === null) return prefix + '<li>' + key + ':' + syncWrapper.null(val) + '</li>';
          if (val instanceof Array) return prefix + '<li>' + key + ':' + syncWrapper.array(val, rec+1) + '</li>';
          if (val.toString === Object.prototype.toString) return prefix + '<li>' + key + ':' + syncWrapper.object(val, rec+1) + '</li>';
          return prefix + '<li>' + key + ':<pre>' + val.toString() + '</pre></li>';
      }
    }).join('\n');
    return '<ul>\n'+objectMap+'\n' + lastPre + '</ul>';
  }
};

var formats = require('../../both-formatter/text/html')(syncWrapper);

module.exports = function(data, cb){
  var type = typeof data;
  formats[type](data, cb);
};

