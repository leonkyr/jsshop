'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend');

function prepareDevConfig () {
    var deferred = Q.defer();
    gulp.src(['./app/config.json'])
        .pipe(gulp.dest('build/dev')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function prepareProdConfig () {
    var deferred = Q.defer();
    gulp.src(['./app/config.json'])
        .pipe(gulp.dest('build/prod')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    prepareDevConfig: prepareDevConfig,
    prepareProdConfig: prepareProdConfig
};
