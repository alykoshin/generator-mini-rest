'use strict';

var os = require('os');

var pkg = require('../package.json');

module.exports = function() {

  console.log('* pkg.name: \''    + pkg.name    + '\'');
  console.log('* pkg.version: \'' + pkg.version + '\'');
  console.log('* process.env.NODE_ENV: \'' + process.env.NODE_ENV + '\'');

  console.log('* process.version: \''      + process.version + '\'');
  console.log('* process.platform: \''     + process.platform + '\'');
  console.log('* os.type(): \''            + os.type() + '\'');
  console.log('* os.release(): \''         + os.release() + '\'');

  console.log('* __dirname: \'' + __dirname + '\'');
  console.log('* process.cwd(): \'' + process.cwd() + '\'');

  console.log('* os.hostname(): \'' + os.hostname() + '\'');
  console.log('*');

};

