/**
 * Created by numminorihsf on 15.02.16.
 */
var xml2js = require('xml2js');
var builder = new xml2js.Builder({renderOpts: {pretty: false}});
var formatter = require('../../both-formatter/text/xml')(builder);

module.exports = function(data, cb){
  formatter(data, cb);
};
