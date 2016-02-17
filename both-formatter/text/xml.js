/**
 * Created by numminorihsf on 17.02.16.
 */
module.exports = function validate(data, cb){
  if (data === undefined){
    return cb(new Error('Can not format `undefined` value.'));
  }  if (typeof data === 'function'){
    return cb(null);
  }
  try{
    JSON.stringify(data);
  }
  catch(e){
    return cb(e);
  }
  return cb(null);
};