'use strict';


require('./init')();

require('./dumpInfo')();


var config = { httpPort: 8080 };//, httpsPort: 8081 };

var app = require('./express')(config);//({ serveStatic: false });
var server = require('./server')(config, app);

module.exports = {
  app: app,
  server: server
};
