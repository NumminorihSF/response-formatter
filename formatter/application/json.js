/**
 * Created by numminorihsf on 15.02.16.
 */
module.exports = function(data, cb){
  if (data === undefined){
    return cb(new Error('Can not format `undefined` value.'));
  }
  if (typeof data === 'function'){
    return cb(null, '');
  }
  var res;
  try{
    res = JSON.stringify(data);
  }
  catch(e){
    return cb(e);
  }
  return cb(null, res);
};