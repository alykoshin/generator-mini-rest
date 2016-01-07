'use strict';


// All pages returns 404 (excluding handled before)
module.exports =  function(app) {

  app.use(function (req, res, next) {

    res
      .status(404)
      .send('Not found.');

    //var notFound = new Error('Not found');
    //notFound.status = 404;
    //next(err);

    //var err = new Error('Not Found');
    //err.code = 404;
    //err.message = 'Not Found';
    //next(err);

  });

};


