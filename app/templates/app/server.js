'use strict';

var http = require('http');
var https   = require('https');
var fs      = require('fs');

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
    server.listen(port, function () {
      console.log('* Server listening at ' +
        server.address().address + ':' +
        server.address().port);
    });
    return server;
  }


  function getHttpsOptions(certConfig) {
    var options = {
      key:  fs.readFileSync(certConfig.PATH + certConfig.KEY),
      cert: fs.readFileSync(certConfig.PATH + certConfig.CERT),
      ca:   fs.readFileSync(certConfig.PATH + certConfig.CA),
      requestCert: false, // true, // When true, Firefox requests: 'This site has requested that you identify yourself with a certificate
      rejectUnauthorized: false
    };
    return options;
  }


  function openHTTP(app, port) {
    return createServer(http, app, null, port);
  }


  function openHTTPS(app, port) {
    var options = getHttpsOptions(CONFIG.CERTIFICATE);
    return createServer(https, app, options, port);
  }


  var https_redirect = function (httpsPort) {
    console.log('* Enabling redirect HTTP to HTTPS...');
    return function (req, res, next) {
      var link;
      // localhost:8080
      //var myRegexp = /(.+):(\d{1,5})/g; // does not match '10.10.10.10'
      var myRegexp = /([a-z0-9\-._~%]+):?(\d+)?/gi;
      var match    = myRegexp.exec(req.headers.host);
      var host     = match[ 1 ];
      var port     = match[ 2 ];
      //console.log('req.headers.host: \'' + req.headers.host + '; host: \''+host+'\'; port: \''+port+'\'');
      if (!port) {
        port = req.secure ? '443' : '80';
      } // Default values
      //console.log('host: \''+host+'\'; port: \''+port+'\'');
      link = 'https://' + host + ':' + httpsPort + req.url;
      if (req.secure) {
        //console.log('req.secure')
        //console.log('port:\''+port+'\'; CONFIG.HTTPS_PORT:\''+CONFIG.HTTPS_PORT+'\'');
        //console.log('typeof port:\'' + typeof port + '\'; typeof  CONFIG.HTTPS_PORT:\'' + typeof CONFIG.HTTPS_PORT + '\'');
        //console.log('port === CONFIG.HTTPS_PORT:', (port === CONFIG.HTTPS_PORT) );
        if (port === '' + httpsPort) {
          //console.log('req.secure: no redirect');
          return next();
        } else {
          //console.log('req.secure: redirect: '+link);
          return res.redirect(link);
        }
      } else {
        //console.log('else: '+link);
        return res.redirect(link);
      }
    };
  };


  var server;
  var httpPort  = config.httpPort;
  var httpsPort  = config.httpsPort;

  if (httpsPort) { // if HTTPS port is configured, start HTTPS server
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
