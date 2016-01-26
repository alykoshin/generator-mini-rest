'use strict';


// All pages returns 404 (excluding handled before)

module.exports =  function(config) {
  return function (req, res, next) {

    //res
    //  .status(404)
    //  .send('Not found.');

    //var notFound = new Error('Not found');
    //notFound.status = 404;
    //next(err);

    var err = new Error('Page Not Found: originalUrl: \''+ req.originalUrl+'\'');
    err.code = 'pageNotFound';
    err.status = 404;
    //err.message = 'Not Found';
    //err.text = 'Not Found';
    next(err);

  };
};


