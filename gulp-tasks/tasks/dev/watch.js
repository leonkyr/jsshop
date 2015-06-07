'use strict';

var gulp = require('gulp-help')(require('gulp')),
    server = require('gulp-connect'),
    openPage = require('open'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareWatchHelper = require('../../util/prepareWatchHelper'),
    prepareTransform = require('../../util/build/prepareTransform'),
    prepareDevServer = require('../../util/prepareDevServer'),
    prepareBuildHelper = require('../../util/build/prepareBuildHelper'),
    prepareAppAssets = require('../../util/build/prepareAppAssets'),
    prepareVendorAssets = require('../../util/build/prepareVendorAssets'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareConfig = require('../../util/build/prepareConfig'),
    prepareRevision = require('../../util/build/prepareRevision');

var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var inject = require('gulp-inject');

var path = {
  HTML: './app/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: './build',
  DEST_BUILD: './build/dev',
  DEST_SRC: './build/dev/src',
  ENTRY_POINT: './app/components/test/App.js'
};

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', 'WATCH', ['copy', 'zbuild', 'zreplaceHTML'], function() {
  gulp.watch(path.HTML, ['copy', 'zbuild', 'zreplaceHTML']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('zbuild', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    //.pipe(streamify(uglify(path.MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('zreplaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(inject(
                    gulp.src(['./build/dev/**/*.js'], {
                        read: false
                    }), {
                        relative: true,
                        name: 'app'
                    }
                ))
    .pipe(gulp.dest(path.DEST_BUILD));
});