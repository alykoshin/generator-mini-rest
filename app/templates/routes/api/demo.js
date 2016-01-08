'use strict';

//var express = require('express');
//var router = express.Router();
var router = require('express').Router();


router.route('/')
  // $ curl -v -X GET  "http://localhost:8080/api/getSteps?domain=www.google.com&limit=100"
  .get(function (req, res) {
    var domain = decodeURIComponent(req.query.domain);
    var limit  = decodeURIComponent(req.query.limit);
    console.log('router.get(\'/getSteps\'): domain:', domain, ', limit:', limit);
    var result = [
      { step1: 'step1' },
      { step2: 'step2' },
      { step3: 'step3' },
      { info: { domain: domain, limit: limit } }
    ];
    res
      .status(200)
      .send(result);
  })

  // $ curl -v -H "Content-Type: application/json" -X POST -d '{ "domain":"www.google.com", "limit":"100"}' "http://localhost:8080/api/getSteps"
  .post(function (req, res) {
    var domain = decodeURIComponent(req.body.domain);
    var limit  = decodeURIComponent(req.body.limit);
    console.log('router.post(\'/getSteps\'): domain:', domain, ', limit:', limit);
    var result = [
      { step1: 'step1' },
      { step2: 'step2' },
      { step3: 'step3' },
      { info: { domain: domain, limit: limit } }
    ];
    res
      .status(200)
      .send(result);
  });


module.exports = router;
