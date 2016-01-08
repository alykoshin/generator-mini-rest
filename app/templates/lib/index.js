'use strict';


require('./dumpInfo')();

var app = require('./express')();//({ serveStatic: false });
var server = require('./server')({ httpPort: 8080/*, https: 8081*/ }, app);

module.exports = {
  app: app,
  server: server
};
