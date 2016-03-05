'use strict';

var fs = require('fs');
var router = require('express').Router();

var FILENAME = 'requests.txt';

function dataToFile(fname, data, res) {
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
  console.log( 'req.body:', req.body );
  var data = 'app.post(\'/post_json\'):' + JSON.stringify(req.body) + '\n';
  dataToFile(FILENAME, data, res);
});

router.post('/post_urlencoded',function(req, res){
  console.log( 'req.body:', req.body );
  var data = 'app.post(\'/post_urlencoded\'):' + JSON.stringify(req.body) + '\n';
  dataToFile(FILENAME, data, res);
});


module.exports = router;
