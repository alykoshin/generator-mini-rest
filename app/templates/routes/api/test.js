
var FILENAME = 'requests.txt';

app.post('/post_json',function(req, res){
  console.log( 'req.body:', req.body );
  var data = 'app.post(\'/post_json\'):' + JSON.stringify(req.body) + '\n';
  fs.appendFile(FILENAME, data, function(err) {
    if (err) {
      console.log('Error writing file:', err);
      res.status(500).send( { error: err } );
      return;
    }
    res.send( { result: 'success'} );
  });

});

app.post('/post_urlencoded',function(req, res){
  console.log( 'req.body:', req.body );
  var data = 'app.post(\'/post_urlencoded\'):' + JSON.stringify(req.body) + '\n';
  fs.appendFile(FILENAME, data, function(err) {
    if (err) {
      console.log('Error writing file:', err);
      res.status(500).send( 'error: ' + JSON.stringify(err)  );
      return;
    }
    res.send( 'result: success' );
  });

});
