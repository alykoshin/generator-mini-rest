'use strict';

var _ = require('lodash');
//var errorHandler = require('error-handler');


// define error-handling middleware last, after other app.use() and routes calls

module.exports = function(config) {
  return function(err, req, res, next) {

    // sanitize error
    var error = _.pick(err, ['code', 'status', 'message', 'text']);
    _.defaults(error, {
      code: 'undefined',
      status: 500,
      message: (typeof err==='string') ? err : 'Internal Server Error'
    });

    // prepare and print to console
    var consoleError = (err.status !== 404) ?  _.extend(error, { stack: err.stack }) : error;
    console.error('errorHandler: err:', consoleError); // Print full error info to console

    // prepare and set as HTTP response
    var httpError = (process.env.NODE_ENV === 'development') ? _.extend(error, { stack: err.stack }) : error;
    res
      .status(httpError.status)
      .json( httpError );

  };
};

