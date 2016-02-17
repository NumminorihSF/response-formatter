/**
 * Created by numminorihsf on 15.02.16.
 */

var formats = {
  string: function(data, cb){
    return cb(null, syncWrapper.string(data));
  },
  number: function(data, cb){
    return cb(null, syncWrapper.number(data));
  },
  boolean: function(data, cb){
    return cb(null, syncWrapper.boolean(data));
  },
  "function": function(data, cb){
    return cb(null, syncWrapper.function(data));
  },
  "undefined": function(data, cb){
    return cb(new Error('Can not format `undefined` value.'));
  },
  "object": function(data, cb){
    if (data === null){
      return cb(null, syncWrapper.null());
    }
    try{
      JSON.stringify(data);
    }
    catch(e){
      return cb(e);
    }
    if (data instanceof Array){
      return cb(null, syncWrapper.array(data));
    }
    if (data.toString === Object.prototype.toString) return cb(null,syncWrapper.object(data));
    return cb(null, '<pre>'+data.toString()+'</pre>');
  }
};

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
  "array": function(data){
    var arrayMap = data.map(function(val){
      var type = typeof val;
      switch (type) {
        case 'string':
          return '<li>' + syncWrapper.string(val) + '</li>';
        case 'number':
          return '<li>' + syncWrapper.number(val) + '</li>';
        case 'boolean':
          return '<li>' + syncWrapper.boolean(val) + '</li>';
        case 'function':
          return '<li>' + syncWrapper.function(val) + '</li>';
        case 'undefined':
          return '<li>' + syncWrapper.undefined(val) + '</li>';
        default:
          if (val === null) return '<li>' + syncWrapper.null(val) + '</li>';
          if (val instanceof Array) return '<li>' + syncWrapper.array(val) + '</li>';
          if (val.toString === Object.prototype.toString) return '<li>' + syncWrapper.object(val) + '</li>';
          return '<li><pre>' + val.toString() + '</pre></li>';
      }
    }).join('');
    return '<ol>'+arrayMap+'</ol>';
  },
  "object": function(data){
    var objectMap = Object.keys(data).map(function(key){
      var val = data[key];
      var type = typeof val;
      switch (type) {
        case 'string':
          return '<li>' + key + ':' + syncWrapper.string(val) + '</li>';
        case 'number':
          return '<li>' + key + ':' + syncWrapper.number(val) + '</li>';
        case 'boolean':
          return '<li>' + key + ':' + syncWrapper.boolean(val) + '</li>';
        case 'function':
          return '<li>' + key + ':' + syncWrapper.function(val) + '</li>';
        case 'undefined':
          return '<li>' + key + ':' + syncWrapper.undefined(val) + '</li>';
        default:
          if (val === null) return '<li>' + key + ':' + syncWrapper.null(val) + '</li>';
          if (val instanceof Array) return '<li>' + key + ':' + syncWrapper.array(val) + '</li>';
          if (val.toString === Object.prototype.toString) return '<li>' + key + ':' + syncWrapper.object(val) + '</li>';
          return '<li>' + key + ':<pre>' + val.toString() + '</pre></li>';
      }
    }).join('');
    return '<ul>' + objectMap + '</ul>';
  }
};


module.exports = function(data, cb){
  var type = typeof data;
  formats[type](data, cb);
};

