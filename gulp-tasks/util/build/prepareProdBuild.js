'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin');

function prepareJs () {
    var deferred = Q.defer();
    gulp.src(['build/dev/js/vendor-*.js', 'build/dev/js/app-*.js', 'build/dev/js/template-*.js'])
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('build/prod/js')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function prepareCss () {
    var deferred = Q.defer();
    gulp.src(['build/dev/css/vendor-*.css', 'build/dev/css/app-*.css'])
        .pipe(minifyCSS())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('build/prod/css')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function prepareAssets () {
    var deferred = Q.defer();
    gulp.src(['build/dev/fonts/**', 'build/dev/images/**'],{
            base: 'build/dev'
        })
        .pipe(gulp.dest('build/prod')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function optimiseImages () {
    var deferred = Q.defer();
    gulp.src(['build/dev/images/**'],{
            base: 'build/dev'
        })
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('build/prod')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    prepareJs: prepareJs,
    prepareCss: prepareCss,
    prepareAssets: prepareAssets,
    optimiseImages: optimiseImages
};
