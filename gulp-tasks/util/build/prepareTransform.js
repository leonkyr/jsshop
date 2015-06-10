'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    react = require('gulp-react'),
    concat = require('gulp-concat');

function transformJsx () {
    var deferred = Q.defer();
    
    gulp.src(['components/**/*.js'])
        .pipe(react())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build/dev/js'))
        .on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    transformJsx: transformJsx
};