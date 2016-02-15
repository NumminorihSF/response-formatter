/**
 * Created by numminorihsf on 15.02.16.
 */
function getFormatter (options){
  options = options || {};

  var human = 'human' in options ? !!options.human : (process.env.NODE_ENV !== 'production');
  var formatter = {};

  options.dataSource = options.dataSource || 'res.locals';
  options.formats = options.formats || ['application/json'];//TODO 'text/xml','text/plain', 'text/html'
  options.formats.forEach(function(format){
    //TODO user formatters
    if (human) formatter[format] = require('./human-formatter/'+format);
    else formatter[format] = require('./formatter/'+format);
  });

  options.fallback = options.formats[0];

  var getData = function (path, allData){
    return path.reduce(function(result, key){
      return result[key];
    }, allData);
  }.bind(this, options.dataSource.split('.'));

  return function(req, res, next){
    var format = req.accepts(options.formats) || options.fallback;
    return formatter[format](getData({req: req, res: res, request: req, response: res}), next);
  }
}


module.exports = getFormatter;

