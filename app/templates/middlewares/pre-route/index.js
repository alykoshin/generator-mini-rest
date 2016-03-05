'use strict';


module.exports = function(config, app) {

  var router = require('express').Router();

  router.use(require('compression')());


  router.use(require('mini-https-redirect')(config));
  //
  //router.use(require('./queue')(config, app));
  router.use(require('./debug')(config));
  router.use(require('./parsers')(config));
  router.use(require('./security')(config, app));
  router.use(require('./static')(config));

  return router;

};

