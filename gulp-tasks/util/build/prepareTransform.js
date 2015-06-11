'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    react = require('gulp-react'),
    concat = require('gulp-concat');

function transformJsx () {
    console.log('transformJsx');
    var deferred = Q.defer();
    
    gulp.src(['components/**/*.jsx'])
        .pipe(react())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/dev/src'))
        .on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    transformJsx: transformJsx
};