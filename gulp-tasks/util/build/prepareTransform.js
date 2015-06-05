'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    react = require('gulp-react');

function transformJsx (folder) {
    var deferred = Q.defer();
    gulp.src(['components/**/*.js'])
        .pipe(react())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build/'+folder+'/js')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    transformJsx: transformJsx
};