'use strict';


module.exports = function() {

  //Change current working directory to the component root.
  //This is due to Windows service setting cwd in a different place.
  process.chdir(__dirname + '/..');

  process.on('uncaughtException', function(e) {
    console.error('FATAL ERROR:');
    console.error('process.on(uncaughtException):');
    console.error(e.stack || e);
    process.exit(1);
  });


};
