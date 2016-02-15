/**
 * Created by numminorihsf on 15.02.16.
 */
var xml2js = require('xml2js');
var builder = new xml2js.Builder({renderOpts: {pretty: false}});

module.exports = function(data, cb){
  if (data === undefined){
    return cb(new Error('Can not format `undefined` value.'));
  }
  if (typeof data === 'function'){
    return cb(null, builder.buildObject(''));
  }
  try{
    JSON.stringify(data);
  }
  catch(e){
    return cb(e);
  }
  if (data === null){
    return cb(null, builder.buildObject(''));
  }
  var res = builder.buildObject(data);
  return cb(null, res);
};
