'use strict';


module.exports = function(err, req, res, next) {

  res.setHeader('Cache-Control', 'no-cache');
  next();

};

