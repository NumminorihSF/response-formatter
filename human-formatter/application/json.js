/**
 * Created by numminorihsf on 15.02.16.
 */
module.exports = function(data, cb){
  if (data === undefined){
    return cb(new Error('Can format `undefined` value.'));
  }
  if (typeof data === 'function'){
    return cb(new Error('Can not format Function value.'));
  }
  var res;
  try{
    res = JSON.stringify(data, null, '\t');
  }
  catch(e){
    return cb(e);
  }
  return cb(null, res);
};