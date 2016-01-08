'use strict';

var router = require('express').Router();


router.use('/api', require('./api'));

//router.use('/ui', require('./ui'));

// Redirect from / to default page
//router.get('/', function(req, res) {
//  console.log('router.get(\'/\')');
//  res.redirect('/ui/');
//});

module.exports = router;

//module.exports = function(app) {
//app.use(router);

//app.use('/api', require('./api')(app));

//};

