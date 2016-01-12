'use strict';

var fs   = require('fs');
var path = require('path');
var constants = require('constants');

var http  = require('http');
var https = require('https');

var redirect = require('mini-https-redirect');

var log = console.log;
var fatal = function(err) { console.log('FATAL ERROR:'); throw err; };

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
   * @param {object} serverModule - http or https module
   * @param {object} app     - express app
   * @param {object} options - options for createServer() (for HTTPS)
   * @param {number} port    - port to listen
   * @returns {object}       - returns server
   */
  function createServer(serverModule, app, options, port) {
    log('* Creating server at port ' + port + '...');
    var server;
    if (options) {
      server = serverModule.createServer(options, app); // https
    } else {
      server = serverModule.createServer(app);          // http
    }
    server.on('error', function(e) {
      switch(e.errno) {
        case 'EADDRINUSE':
          fatal('Port '+port+' is in use:', e);
          break;
        case 'EACCES':
          fatal('Insufficient privileges, Try to run with sudo', e);
          break;
        default:
          fatal('Unhandled HTTP/HTTPS server error:', e);
      }
    });

    server.listen(port, function () {
      log('* Server listening at ' +
        server.address().address + ':' +
        server.address().port);
    });
    return server;
  }


  function getHttpsOptions(httpsConfig) {

    function fileExists(filePath) {
      try {
        return fs.statSync(filePath).isFile();
      } catch (err) {
        return false;
      }
    }
    /**
     *
     * @param {string} [filepath=__dirname]
     * @param {string} filename
     * @param {boolean} optional
     * @returns {null|string}
     */
    function readFile(filepath, filename, optional) {
      filepath = filepath || __dirname;
      if (filename) {
        var pathname = path.join(filepath, filename);
        if (!fileExists(pathname)) { // Filename is provided, but file does not
          return fatal('Cert/Key filename is provided, but file does not exists: \''+pathname+'\'');
        }
        return fs.readFileSync(pathname, 'utf8');
      } else if (optional) {
        return null;
      } else {
        return fatal('Cert/Key filename must be provided.');
      }
    }

    var path = httpsConfig.path || __dirname;

    var options = {
      key:  readFile(path, httpsConfig.key),
      cert: readFile(path, httpsConfig.cert),
      ca:   readFile(path, httpsConfig.ca, true),
      requestCert:        httpsConfig.requestCert || false, // Request client certificate
      rejectUnauthorized: httpsConfig.requestCert || false  // Reject unauthorised clients
    };
    if (httpsConfig.disabledMethods) {
      var secureOptions = 0;
      for (var i=0; i<httpsConfig.disabledMethods.length; i++) {
        var method = httpsConfig.disabledMethods[i];
        switch (method) {
          /*jshint -W016 */
          case 'TLSv1_2': secureOptions |= constants.SSL_OP_NO_TLSv1_2; log('Disabling TLSv1_2'); break;
          case 'TLSv1_1': secureOptions |= constants.SSL_OP_NO_TLSv1_1; log('Disabling TLSv1_1'); break;
          case 'TLSv1':   secureOptions |= constants.SSL_OP_NO_TLSv1;   log('Disabling TLSv1');   break;
          case 'SSLv3':   secureOptions |= constants.SSL_OP_NO_SSLv3;   log('Disabling SSLv3');   break;
          case 'SSLv2':   secureOptions |= constants.SSL_OP_NO_SSLv2;   log('Disabling SSLv2');   break;
          /*jshint +W016 */
          default:
            fatal('Invalid httpsConfig.disabledMethods value: \'' + method + '\'');
        }
        if (secureOptions !== 0) { options.secureOptions = secureOptions; }
      }
      log('* Setting HTTPS secureOptions:', options.secureOptions);
    }

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
      app.use(redirect(httpsPort));
    }
  } else {
    server = openHTTP(app, httpPort); // Start only HTTP server
  }


  return server;
};
