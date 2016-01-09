'use strict';

module.exports = function() {

  //Change current working directory to the component root.
  //This is due to Windows service setting cwd in a different place.
  process.chdir(__dirname + '/..');

};
