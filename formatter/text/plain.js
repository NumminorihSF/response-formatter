/**
 * Created by numminorihsf on 15.02.16.
 */

function mapObjectFromArray(prefix, val, rec){
  if (val === null) return prefix + syncWrapper.null(val);
  if (val instanceof Array) return syncWrapper.array(val, rec+1);
  if (val.toString === Object.prototype.toString) return syncWrapper.object(val, rec);
  return prefix + val.toString();
}

function mapObjectFromObject(prefix, key, val, rec){
  if (val === null) return prefix + key + ': ' + syncWrapper.null(val);
  if (val instanceof Array) return prefix  + key + ':\n' + syncWrapper.array(val, rec+1);
  if (val.toString === Object.prototype.toString) return prefix  + key + ':\n' + syncWrapper.object(val, rec+1);
  return prefix  + key + ': ' + val.toString();
}

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
    return cb(null, data.toString());
  }
};

var syncWrapper = {
  string: function(data){
    return data;
  },
  number: function(data){
    return data.toString();
  },
  boolean: function(data){
    return (data ? 'true' : 'false');
  },
  "function": function(){
    return '';
  },
  "undefined": function(){
    return '';
  },
  "null": function(){
    return 'null';
  },
  "array": function(data, rec){
    rec = rec || 0;
    var prefix = '';
    var i = rec;
    while (i-- > 0){
      prefix += ' ';
    }
    return data.map(function(val){
        var type = typeof val;

        switch (type) {
          case 'string':
            return prefix + syncWrapper.string(val);
          case 'number':
            return prefix + syncWrapper.number(val);
          case 'boolean':
            return prefix + syncWrapper.boolean(val);
          case 'function':
            return prefix + syncWrapper.function(val);
          case 'undefined':
            return prefix + syncWrapper.undefined(val);
          default:
            return mapObjectFromArray(prefix, val, rec);
        }
      }).join('\n');
  },
  "object": function(data, rec){
    rec = rec || 0;
    var prefix = '';
    var i = rec;
    while (i-- > 0){
      prefix += ' ';
    }
    return Object.keys(data).map(function(key){
        var val = data[key];
        var type = typeof val;
        switch (type) {
          case 'string':
            return prefix + key + ': ' + syncWrapper.string(val);
          case 'number':
            return prefix + key + ': ' + syncWrapper.number(val);
          case 'boolean':
            return prefix + key + ': ' + syncWrapper.boolean(val);
          case 'function':
            //return [key]:\n
            return prefix + key + ':';
          case 'undefined':
            //return [key]:\n
            return prefix + key + ':';
          default:
            return mapObjectFromObject(prefix, key, val, rec);
        }
      }).join('\n');
  }
};


module.exports = function(data, cb){
  var type = typeof data;
  formats[type](data, cb);
};

