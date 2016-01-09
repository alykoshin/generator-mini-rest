'use strict';

var bodyParser = require('body-parser');


module.exports = function(config, app) {

  var limit = '1mb';

  // HTML Body Parser
  app.use(bodyParser.urlencoded({ extended: true, limit: limit }));
  app.use(bodyParser.json({ limit: limit }));
  console.log('* Using urlencoded & json bodyParser, limit:', limit);

};

