'use strict';

//var express = require('express');
//var router = express.Router();
var router = require('express').Router();

function getDecodedValues(names, hash) {
  var res = {};
  for (var len=names.length, i=0; i<len; ++i) {
    res[names[i]] = decodeURIComponent( hash[names[i]] );
  }
  console.log('getDecodedValues(): res:', res);
  return res;
}

var result = [
  { step1: 'step1' },
  { step2: 'step2' },
  { step3: 'step3' }
];


router.route('/')
  // $ curl -v -X GET  "http://localhost:8080/api/getSteps?domain=www.google.com&limit=100"
  .get(function (req, res) {
    //var params = getDecodedValues(['domain', 'limit'], req.query);
    res
      .status(200)
      .send(result);
  })

  // $ curl -v -H "Content-Type: application/json" -X POST -d '{ "domain":"www.google.com", "limit":"100"}' "http://localhost:8080/api/getSteps"
  .post(function (req, res) {
    //var params = getDecodedValues(['domain', 'limit'], req.body);
    res
      .status(200)
      .send(result);
  });


module.exports = router;
