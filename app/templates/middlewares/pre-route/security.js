/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// security.js
//var secure  = require('express-secure-only');
var rateLimit = require('express-rate-limit');
var helmet    = require('helmet');

var log = console.log;

var router = require('express').Router();


module.exports = function (config, app) {

  app.enable('trust proxy');

  // 1. redirects http to https
  //router.use(secure());

  log('* Enabling helmet package...');
  // 2. helmet with defaults
  router.use(helmet());

  //app.disable('x-powered-by');

  log('* Limiting number of requests using express-rate-limit...');
  // 3. rate-limit to /api/
  //router.use('/api/', rateLimit({
  router.use('*', rateLimit({
      windowMs: 60 * 1000, // seconds
      delayMs: 0,
      max: 50
    })
  );

  return router;

};


