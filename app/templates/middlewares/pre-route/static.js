'use strict';

var path = require('path');

var express = require('express');
var router = express.Router();

///**
// *
// * @param aliases        - hash object containing url:dir aliases,
// *                         for example { '/' : '/public', '/other': '/other/dir' }
// * @param config
// * @param config.rootDir - local directory to be taken as root for aliases
// *                         default is __dirname
// * @param config.options - options to pass to express.static()
// *                         for more info read http://expressjs.com/en/guide/using-middleware.html#express.static
// * @param app
// */
var useStatic = function(aliases, config) {
//module.exports = function(config, app) {

  aliases = aliases || {};
  config = config || {};
  config.rootDir = config.rootDir || __dirname;
  config.options = config.options || {};

  for (var alias in aliases)
    if (aliases.hasOwnProperty(alias)) {
      var localDir = path.join(config.rootDir, aliases[alias]);
      router.use(alias, express.static(localDir, config.options));
      console.log('* Mapping static alias \''+alias+'\' to \''+localDir+'\'');
    }
};


// To set maxAge use following format: https://www.npmjs.com/package/ms

module.exports = function(config) {


  //function use(alias, dir) {
  //  console.log('* Mapping static alias \'' + alias + '\' to \'' + dir + '\'');
  //  var options = { /* maxAge: '1d' */ };
  //  app.use(alias, express.static(dir, options));
  //}
  //use ('/', '/public');

//  var alias = '/', dir = '/public';
//  app.use('/', express.static('/public', { /* maxAge: '1d' */ }));
//  console.log('* Mapping static alias \'/\' to \'/public\'');


  useStatic({ '/': '/public' });

  return router;
};

