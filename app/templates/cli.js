#!/usr/bin/env node

'use strict';

var pkg = require('./package.json');
var main = require('./');
var argv = process.argv.slice(2);


function help() {
  console.log([
    '',
    '  ' + pkg.description,
    '',
    '  Example:',
    '    <%= pkgName %> ',
    ''
  ].join('\n'));
}

function version() {
  console.log('package version:', pkg.version);
  console.log('process.version:', process.version);
}

if (argv.indexOf('--help') !== -1) {
  help();
  process.exit(0);
}

if (argv.indexOf('--version') !== -1) {
  version();
  process.exit(0);
}


process.on('SIGINT', function () {
  console.log('Got a SIGINT. Goodbye cruel world');
  process.exit(0);
});


main(argv[0], function() {
  var err = true;

  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
});
