'use strict';

var express = require('express');
var path = require('path');

///**
// *
// * @param config
// * @param config.rootDir - local directory to be taken as root for aliases
// *                         default is __dirname
// * @param config.aliases - hash object containing url:dir aliases,
// *                         for example { '/' : '/public' }
// * @param config.options - options to pass to express.static()
// *                         for more info read http://expressjs.com/en/guide/using-middleware.html#express.static
// * @param app
// */
var useStatic = function(config, app) {
//module.exports = function(config, app) {

  config = config || {};
  config.aliases = config.aliases || {};
  config.options = config.options || {};
  config.rootDir = config.rootDir || __dirname;

  for (var alias in config.aliases)
    if (config.aliases.hasOwnProperty(alias)) {
      var localDir = path.join(config.rootDir, config.aliases[alias]);
      app.use(alias, express.static(localDir, config.options));
      console.log('* Static alias \''+alias+'\' to \''+localDir+'\'');
    }
};


// To set maxAge use following format: https://www.npmjs.com/package/ms

module.exports = function(config, app) {
//  var alias = '/', dir = '/public';
//  app.use('/', express.static('/public', { /* maxAge: '1d' */ }));
//  console.log('Static alias \'/\' to \'/public\'');
  useStatic({ aliases: { '/': '/public' } }, app);
};

