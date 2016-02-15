/**
 * Created by numminorihsf on 15.02.16.
 */
var formats = {
  string: function(data, cb){
    return cb(null, data);
  },
  number: function(data, cb){
    return cb(null, data.toString());
  },
  boolean: function(data, cb){
    return cb(null, (data ? 'true' : 'false'));
  },
  "function": function(data, cb){
    return cb(null, '');
  },
  "undefined": function(data, cb){
    return cb(new Error('Can not format `undefined` value.'));
  },
  "object": function(data, cb){
    if (data === null){
      return cb(null, 'null');
    }
    try{
      JSON.stringify(data);
    }
    catch(e){
      return cb(e);
    }
    return cb(null, '');
  }
};

module.exports = function(data, cb){
  var type = typeof data;
  formats[type](data, cb);
};

