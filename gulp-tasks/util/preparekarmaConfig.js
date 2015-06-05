'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    bowerFiles = require('main-bower-files'),
    Q = require('q'),
    replace = require('gulp-replace'),
    extend = require('node.extend');

/**
 * prepares karma config file including bower components scripts there
 * @return {Promise} Q promise
 */
function includeBowerJsFiles () {
    var deferred = Q.defer();

    gulp.src('./karma.conf.js')
        .pipe(inject(gulp.src(bowerFiles({
            filter: new RegExp('\\.js')
        }), {
            read: false
        }), {
            starttag: '//bower files',
            endtag: '//bower files end',
            /**
             * transforms filepath to format for karma include list
             */
            transform: function (filepath) {
                return '\'.' + filepath + '\',';
            }
        }))
        .pipe(gulp.dest('./')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function runLocally () {
    var deferred = Q.defer();
    gulp.src('./karma.conf.js')
        .pipe(replace(' //browsers: [', ' browsers: ['))
        .pipe(replace(' browsers: Object.keys(', ' //browsers: Object.keys('))
        .pipe(gulp.dest('./')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function runOnSauce () {
    var deferred = Q.defer();
    gulp.src('./karma.conf.js')
        .pipe(replace(' browsers: [', ' //browsers: ['))
        .pipe(replace(' //browsers: Object.keys(', ' browsers: Object.keys('))
        .pipe(gulp.dest('./')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    includeBowerJsFiles: includeBowerJsFiles,
    runLocally: runLocally,
    runOnSauce: runOnSauce
};
