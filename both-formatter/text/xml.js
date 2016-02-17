/**
 * Created by numminorihsf on 17.02.16.
 */
module.exports = function(builder){
  return function(data, cb){
    if (data === undefined) {
      return cb(new Error('Can not format `undefined` value.'));
    }
    if (typeof data === 'function'){
      return cb(null, builder.buildObject(''));
    }
    try {
      JSON.stringify(data);
    }
    catch (e) {
      return cb(e);
    }
    if (data === null){
      return cb(null, builder.buildObject(''));
    }
    return cb(null, builder.buildObject(data));
  }
};