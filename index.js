/**
 * Created by numminorihsf on 15.02.16.
 */
function getFormatters (options){
  options = options || {};
  options.dataSource = options.dataSource || 'res.locals';
  var human = 'human' in options ? !!options.human : (process.env.NODE_ENV !== 'production');
  options.formats = options.formats || ['application/json'];//TODO 'text/xml','text/plain', 'text/html'
  var formatter = {};
  options.formats.forEach(function(format){
    if (human) formatter[format] = require('./human-formatter/'+format);
    else formatter[format] = require('./formatter/'+format);
  });
  return function(req, res, next){

  }
}

module.exports = getFormatters;

