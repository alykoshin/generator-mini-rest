'use strict';

var fs = require('fs');
var router = require('express').Router();

var FILENAME = 'requests.txt';

function dataToFile(req, res) {
  console.log( 'req.body:', req.body );
  var data = 'app.post(\''+req.url+'\'):' + JSON.stringify(req.body) + '\n';
  fs.appendFile(FILENAME, data, function(err) {
    if (err) {
      console.log('Error writing file:', err);
      res.status(500).send( { error: err } );
      return;
    }
    res.send( { result: 'success'} );
  });
}

router.post('/post_json',dataToFile);

router.post('/post_urlencoded', dataToFile);


module.exports = router;
