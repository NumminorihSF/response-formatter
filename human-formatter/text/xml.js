/**
 * Created by numminorihsf on 15.02.16.
 */
var xml2js = require('xml2js');
var builder = new xml2js.Builder();
var validate = require('../../both-formatter/text/xml');

module.exports = function(data, cb){
  validate(data, function(err){
    if (err){
      return cb(err);
    }
    if (typeof data === 'function'){
      return cb(null, builder.buildObject(''));
    }
    if (data === null){
      return cb(null, builder.buildObject(''));
    }
    return cb(null, builder.buildObject(data));
  });
};