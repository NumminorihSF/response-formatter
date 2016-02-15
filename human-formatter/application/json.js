/**
 * Created by numminorihsf on 15.02.16.
 */
module.exports = function(data, cb){
  var res;
  try{
    res = JSON.stringify(data, null, '\t');
  }
  catch(e){
    return cb(e);
  }
  return cb(null, res);
};