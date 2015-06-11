'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    addsrc = require('gulp-add-src'),
    htmlmin = require('gulp-htmlmin');

function prepareDevIndexHtml () {
    console.log('Preparing Dev Index.html');
    var deferred = Q.defer();
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./build/dev')).on('finish', function () {
            gulp.src('./build/dev/index.html')
                // .pipe(inject(gulp.src(['./build/dev/js/vendor.js', './build/dev/css/vendor.css'], {
                //     read: false
                // }), {
                //     relative: true,
                //     name: 'bower'
                // }))
                .pipe(inject(
                    gulp.src(['./build/dev/js/app.js'], {
                        read: false
                    }), {
                        relative: true,
                        name: 'app'
                    }
                )).pipe(gulp.dest('./build/dev')).on('finish', function () {
                    deferred.resolve(true);
                });
        });
    return extend(deferred.promise, module.exports);
}

function prepareProdIndexHtml() {
    var deferred = Q.defer();
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./build/prod')).on('finish', function () {
            gulp.src('./build/prod/index.html')
                .pipe(inject(
                    gulp.src(['./build/prod/js/script.min.js', './build/prod/css/style.min.css'], {
                        read: false
                    }), {
                        relative: true,
                        name: 'app'
                    }
                ))
                .pipe(htmlmin({ // https://github.com/kangax/html-minifier
                    removeComments: true,
                    collapseWhitespace: true
                }))
                .pipe(gulp.dest('./build/prod')).on('finish', function () {
                    deferred.resolve(true);
                });
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    prepareDevIndexHtml: prepareDevIndexHtml,
    prepareProdIndexHtml: prepareProdIndexHtml
};
