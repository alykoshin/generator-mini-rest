'use strict';

var Router = require('express').Router;


module.exports = function(config, app) {

  // does not work as some situations are still handled by default errohandler outside this router

  //var router = Router();
  //
  //router.use(require('./notFound404')(config));
  //router.use(require('./errorHandler')(config));
  //
  //return router;

  app.use(require('mini-rest-404')(config));
  app.use(require('./errorHandler')(config));


};

