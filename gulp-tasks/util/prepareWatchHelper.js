'use strict';

var Q = require('q'),
    extend = require('node.extend'),
    watch = require('gulp-watch');

function watchAppJs () {
    var deferred = Q.defer();
    var watcher = watch([
        'app/**/*.js'
    ], function (vinyl) {
        extend(vinyl, watcher);
        deferred.notify(vinyl);
    });
    return extend(deferred.promise, module.exports);
}

function watchAllFiles () {
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
