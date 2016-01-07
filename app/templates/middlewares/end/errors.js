'use strict';


module.exports = function(app) {

  app.use(function(err, req, res, next) {

    // Print error to console
    //console.log(err.stack);
    console.log(err);

    // Return 500
    res
      .status(500)
      .send('Internal Server Error.');


    //var error = {
    //  code: err.code || 500,
    //  error: err.error || err.message
    //};
    //console.log('error:', error.error);
    //
    //res.status(error.code).json(error);

  });

};

