/**
 * Created by numminorihsf on 17.02.16.
 */

module.exports = function(syncWrapper){
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
      if (data.toString instanceof Function) return cb(null, '<pre>'+data.toString()+'</pre>');
      return syncWrapper.object(data);
    }
  };
  return formats;
};