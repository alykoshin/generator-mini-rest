'use strict';


module.exports = function(config) {
  return function(req, res, next) {

    console.log('req.method: \'' + req.method + '\', originalUrl: \'' + req.originalUrl + '\'');
    next();

  };
};

