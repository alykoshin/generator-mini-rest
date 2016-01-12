'use strict';


module.exports = function(config) {

  var router = require('express').Router();


  router.use('./notFound404')(config);
  router.use('./errors')(config);


};

