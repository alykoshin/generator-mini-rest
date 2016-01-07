'use strict';

var gulp        = require('gulp');

var bump        = require('gulp-bump');
var gutil       = require('gulp-util');
var zip         = require('gulp-zip');
var runSequence = require('run-sequence');

var moment      = require('moment');


var base = [
  './**/*',
  '!./gulpfile.js',
  '!./node_modules/**/*'
];

gulp.task( 'zip-src', function() {
  var version = require('./package.json').version;  // Get current version
  var date = moment().format('YYYYMMDD-HHmmss');    // ... and current date
  var archiveName = 'source-'+ version + '-' + date +'.zip';
  var files = base;
  gutil.log('files:', files);

  return gulp.src( files , { cwd: '.', cwdbase: true } )
    .pipe( zip( archiveName ) )
    .pipe( gulp.dest( './dist/' ) );
});

gulp.task('bump-patch', function () {
  //Note: I have hardcoded the version change type to 'patch' but it may be a good idea to use
  //      minimist (https://www.npmjs.com/package/minimist) to determine with a command argument whether you are doing
  //      a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: "patch"}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
  return runSequence(
    'bump-patch',
    'zip-src',
    function (error) {
      if (error) { gutil.log(error.message); }
      else { gutil.log('RELEASE FINISHED SUCCESSFULLY'); }
      //callback(error);
    }
  );
});


