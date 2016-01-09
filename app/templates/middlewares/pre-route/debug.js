'use strict';


module.exports = function(config, app) {

  app.use(function(req, res, next) {
    console.log('req.method: \'' + req.method + '\', originalUrl: \'' + req.originalUrl + '\'');
    next();
  });

};

