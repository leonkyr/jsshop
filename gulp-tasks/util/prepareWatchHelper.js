'use strict';

var Q = require('q'),
    gulp = require('gulp-help')(require('gulp')),
    extend = require('node.extend'),
    watch = require('gulp-watch'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    watchify = require('watchify');

function watchAppJsx () {
    console.log('watchAppJsx');
    var watcher  = watchify(browserify({
        entries: ['app/App.jsx'],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));
    var deferred = Q.defer();

    watcher.on('update', function () {
            watcher
                .bundle()
                .pipe(source('app.js'))
                .pipe(gulp.dest('./build/dev/src'));
            console.log('Updated');
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./build/dev/src'))
        .on('finish', function () {
            deferred.resolve(true);
        });
    
    return extend(deferred.promise, module.exports);
}

function watchAllButJsxFiles () {
    console.log('watchAllButJsxFiles');
    var deferred = Q.defer();
    var watcher = watch([
        'bower_components/**/*.js',
        'bower_components/**/*.css',
        'app/**/*.*',
        '!app/**/*spec.js',
        '!app/**/*.jsx'
    ], function () {
        console.log('inside watchAllButJsxFiles');
        extend(vinyl, watcher);
        console.log('inside watchAllButJsxFiles');
        deferred.resolve(true);
    });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    watchAppJsx: watchAppJsx,
    watchAllButJsxFiles: watchAllButJsxFiles
};
