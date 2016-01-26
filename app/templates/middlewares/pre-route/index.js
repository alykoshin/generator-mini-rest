'use strict';


module.exports = function(config, app) {

  var router = require('express').Router();

  router.use(require('compression'));


  router.use(require('./debug')(config));

  router.use(require('./parsers')(config));

  router.use(require('./security')(config, app));

  router.use(require('./static')(config));


  router.use(require('mini-https-redirect'));

  /*
   app.use('/', express.static(__dirname + '/public', {}));
   */
  /*
   var staticMw = require('./static');
   app.use( staticMw([{ '/': '/public' }], {} );
   //app.use( staticMw({ aliases: { '/': '/public' }} );
   */

  /*  require('./static')({
   //root: __dirname,
   aliases: { '/': '/public' },
   //options: { maxAge: '1d' }, // default = 0;
   }, app); */

};

