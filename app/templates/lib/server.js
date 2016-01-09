'use strict';

var http  = require('http');
var https = require('https');
var fs    = require('fs');

/**
 *
 * @param {object} config
 * @param {number} config.httpPort
 * @param {number} config.httpsPort
 * @param {object} app
 * @returns {object}
 */
module.exports = function(config, app) {


  /**
   * Create HTTP or HTTPS server
   *
   * @param {object} module  - http or https module
   * @param {object} app     - express app
   * @param {object} options - options for createServer() (for HTTPS)
   * @param {number} port    - port to listen
   * @returns {object}       - returns server
   */
  function createServer(module, app, options, port) {
    console.log('* Creating server at port ' + port + '...');
    var server;
    if (options) {
      server = module.createServer(options, app); // https
    } else {
      server = module.createServer(app);          // http
    }
    server.on('error', function(e) {
      switch(e.errno) {
        case 'EADDRINUSE':
          console.log('* Port '+port+' is in use:', e);
          break;
        case 'EACCES':
          console.log('* Insufficient privileges, Try to run with sudo', e);
          break;
        default:
          console.log('* Unhandled HTTP/HTTPS error:', e);
      }
    });

    server.listen(port, function () {
      console.log('* Server listening at ' +
        server.address().address + ':' +
        server.address().port);
    });
    return server;
  }


  function getHttpsOptions(certConfig) {
    var options = {
      key:  fs.readFileSync(certConfig.PATH + certConfig.KEY,  'utf8'),
      cert: fs.readFileSync(certConfig.PATH + certConfig.CERT, 'utf8'),
      ca:   fs.readFileSync(certConfig.PATH + certConfig.CA,   'utf8'),
      requestCert: false, // Request client certificate
      rejectUnauthorized: false
    };
    return options;
  }


  function openHTTP(app, port) {
    return createServer(http, app, null, port);
  }


  function openHTTPS(app, port) {
    var options = getHttpsOptions(config.certs);
    return createServer(https, app, options, port);
  }


  var server;
  var httpPort  = config.httpPort;
  var httpsPort = config.httpsPort;

  if (httpsPort) { // If HTTPS port is configured, start HTTPS server
    server = openHTTPS(app, httpsPort);
    if (httpPort) { // If HTTP port is configured, open also HTTP only for redirection to HTTPS
      openHTTP(app, httpPort);
      app.use(https_redirect(httpsPort));
    }
  } else {
    server = openHTTP(app, httpPort); // Start only HTTP server
  }


  return server;
};
