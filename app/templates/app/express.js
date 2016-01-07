'use strict';

var express = require('express');


module.exports = function(config) {

  var app = express();

  require('../middlewares/begin')(app);

  // Application HTTP Routes
  app.use('/', require('../routes'));
  //require('../routes')(app);

  require('../middlewares/end')(app);

  return app;
};
