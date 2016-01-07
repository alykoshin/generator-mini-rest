'use strict';

var router = require('express').Router();


module.exports = function(app) {
  //router.use('/api', require('./api'));

  //router.use('/ui', require('./ui'));

  // Redirect from / to default page
  //router.get('/', function(req, res) {
  //  console.log('router.get(\'/\')');
  //  res.redirect('/ui/');
  //});

  //app.use(router);

  app.use('/api', require('./api')(app));

};

