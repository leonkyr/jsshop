'use strict';

var Q = require('q'),
    extend = require('node.extend'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    watchify = require('watchify');

function watchAppJsx () {
    var deferred = Q.defer();
    var watcher  = watchify(browserify({
        entries: ['app/**/*.js', 'app/**/*.jsx'],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    return watcher.on('update', function () {
            watcher
                .bundle()
                .pipe(source('index.js'))
                .pipe(gulp.dest('./build/dev/src'));
            console.log('Updated');
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./build/dev/src'));
        .on('finish', function () {
            deferred.resolve(true);
        });
    
    return extend(deferred.promise, module.exports);
}

function watchAllButJsxFiles () {
    var deferred = Q.defer();
    var watcher = watch([
        'bower_components/**/*.js',
        'bower_components/**/*.css',
        'app/**/*.js',
        'app/config.json',
        '!app/**/*spec.js',
        'app/**/*.css',
        'app/**/*.html',
        '!app/**/index.html'
    ], function (vinyl) {
        extend(vinyl, watcher);
        deferred.notify(vinyl);
    });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    watchAppJs: watchAppJs,
    watchAllFiles: watchAllFiles
};
