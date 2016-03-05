'use strict';

var express = require('express');


module.exports = function(config) {

  var app = express();

  app.use(require('../middlewares/pre-route')(config, app));

  // Application HTTP Routes
  app.use('/', require('../routes')(config, app));
  //require('../routes')(app);

  require('../middlewares/post-route')(config, app);
  // does not work while router is used inside post-route (see post-route/index.js for more info)
  //app.use( require('../middlewares/post-route')(config, app) );

  return app;
};
