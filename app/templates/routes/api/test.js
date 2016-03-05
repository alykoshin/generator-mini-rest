'use strict';

var fs = require('fs');
var router = require('express').Router();

var FILENAME = 'requests.txt';

function dataToFile(fname, req, res) {
  console.log( 'req.body:', req.body );
  var data = 'app.post(\''+req.url+'\'):' + JSON.stringify(req.body) + '\n';
  fs.appendFile(fname, data, function(err) {
    if (err) {
      console.log('Error writing file:', err);
      res.status(500).send( { error: err } );
      return;
    }
    res.send( { result: 'success'} );
  });
}

router.post('/post_json',function(req, res){
  dataToFile(FILENAME, req, res);
});

router.post('/post_urlencoded',function(req, res){
  dataToFile(FILENAME, req, res);
});


module.exports = router;
