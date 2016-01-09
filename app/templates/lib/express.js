'use strict';

var express = require('express');


module.exports = function(config) {

  var app = express();

  require('../middlewares/pre-route')(config, app);

  // Application HTTP Routes
  app.use('/', require('../routes'));
  //require('../routes')(app);

  require('../middlewares/post-route')(config, app);

  return app;
};
