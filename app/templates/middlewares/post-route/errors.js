'use strict';

//var errorHandler = require('error-handler');


// define error-handling middleware last, after other app.use() and routes calls

module.exports = function(config, app) {

  app.use(function(err, req, res, next) {

    // Print error to console
    console.trace(err);
    //console.log(err.stack);

    var error = {
      code:   err.code || 'undefined',
      status: err.status || 500,
      error:  err.message,
    };

    if (app.get('env') === 'development') {

      error.stack = err.stack || ''; // Return stack only in development mode

      //res
      //  .status(error.status)
      //.json(error.message);
      //.json( error );
      //app.use(errorHandler());
      //} else {
      // Return 500
      //res
      //  .status(500)
      //  .send('Internal Server Error.');
    }

    res
      .status(error.status)
      .json( error );

  });

};

