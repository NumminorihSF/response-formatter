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
    return cb(null, data ? 'true' : 'false');
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
    var res;
    try{
      res = JSON.stringify(data);
    }
    catch(e){
      return cb(e);
    }
    return cb(null, recursiveFormat(data).join('\n'));
  }
};

module.exports = function(data, cb){
  var type = typeof data;
  formats[type](data, cb);
};

//возвращает из себя массив строк
function recursiveFormat (data, rec){
  var type = typeof data;
  if (type === 'function'){
    return [];
  }
  if (type === 'boolean'){
    return [data?'true':'false'];
  }
  if (type === 'undefined'){
    return [];
  }

  if (type === 'object'){
    if (data === null){
      return ['null'];
    }
    else if (data instanceof Array){
      return data.reduce(function(gRes, val){
        var localRes = recursiveFormat(val, true);
        if (localRes.length) {
          return gRes.concat(localRes.map(function(val){
            return (rec ? '\t' : '') + val
          }));
        }
        return gRes;
      }, []);
    }
    else {
      return Object.keys(data).reduce(function(gRes, key){
        var localRes = recursiveFormat(data[key], true);
        if (localRes.length) {
          if (typeof data[key] === 'object'){
            return gRes.concat([(rec ? '\t' : '') + key + ':\n'+ localRes.map(function(val){
              return (rec ? '\t' : '') + val;
            }).join('\n')]);
          }
          else {
            return gRes.concat([(rec ? '\t' : '') + key + ':\t'+ localRes.join(',\n')]);
          }
        }
        return gRes;
      }, []);
    }
  }
  return [data.toString()];
}