'use strict';

var pkg = require('./package.json');

var app = require('./lib/express')({ serveStatic: false });
var server = require('./lib/server')({ httpPort: 8080 }, app);

module.exports = require('./lib/index');

