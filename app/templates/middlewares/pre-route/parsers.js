'use strict';

module.exports = function(config) {

  var bodyParser = require('body-parser');
  var router = require('express').Router();

  config = config || {};
  config.limit = config.limit || '1mb';

  // HTML Body Parser
  router.use(bodyParser.urlencoded({ extended: true, limit: config.limit }));
  router.use(bodyParser.json({ limit: config.limit }));

  console.log('* Using urlencoded & json bodyParser, limit:', config.limit);

  return router;
};

