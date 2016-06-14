/**
 * Created by numminorihsf on 15.02.16.
 */
function searchDataInPath(path, sources){
  return path.reduce(function(result, key){
    return result[key];
  }, sources);
}

function getDataFromObject (path, sources, callback){
  var data;
  try{
    data = searchDataInPath(path, sources);
  }
  catch(e){
    return callback(new Error('Not such key-path in object (' + path.join('.') + ')'));
  }
  return callback(null, data);
}

function putDataIntoObject (path, destinations, data){
  var clone = path.slice();
  var lastKey = clone.pop();
  var destObject = clone.reduce(function(result, key){
    if (!(key in result)) result[key] = {};
    return result[key];
  }, destinations);
  destObject[lastKey] = data;
  return destinations;
}

function getFormatter (options){
  options = options || {};

  var human = 'human' in options ? !!options.human : (process.env.NODE_ENV !== 'production');
  var formatter = {};

  options.dataSource = options.dataSource || 'res.locals';
  options.dataDestination = options.dataDestination || 'res.sentData';
  if (options.formats instanceof Array){
    if (!options.formats.length){
      options.formats = ['application/json', 'text/xml', 'text/html', 'text/plain'];
    }
  }
  else {
    options.formats = ['application/json', 'text/xml', 'text/html', 'text/plain'];
  }

  options.userFormatters = options.userFormatters || {};
  options.formats.forEach(function(format){
    if (options.userFormatters[format]) formatter[format] = options.userFormatters[format];
    else if (human) formatter[format] = require('./human-formatter/'+format);
    else formatter[format] = require('./formatter/'+format);
  });

  options.fallback = options.formats[0];

  var boundGetData = getDataFromObject.bind(this, options.dataSource.split('.'));

  var boundPutData = putDataIntoObject.bind(this, options.dataDestination.split('.'));

  return function(req, res, next){
    var format = req.accepts(options.formats) || options.fallback;
    var sourceAndDestObject = {req: req, res: res, request: req, response: res};
    boundGetData(sourceAndDestObject, function(e, dataToFormat){
      if (e) return next(e);
      return formatter[format](dataToFormat, function(e, result){
        if (e) return next(e);
        boundPutData(sourceAndDestObject, result);
        return next();
      });
    });
  }
}


module.exports = getFormatter;

