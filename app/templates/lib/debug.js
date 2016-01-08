'use strict';

var pkg = require('../package.json');

module.exports = function(app) {

  console.log('* pkg.name: \''    + pkg.name    + '\'');
  console.log('* pkg.version: \'' + pkg.version + '\'');
  console.log('* process.version: \''      + process.version + '\'');
  console.log('* process.env.NODE_ENV: \'' + process.env.NODE_ENV + '\'');
  console.log('* process.platform: \''     + process.platform + '\'');
  console.log('* __dirname: \'' + __dirname + '\'');

};

