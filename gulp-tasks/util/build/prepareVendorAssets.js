'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    bowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    addsrc = require('gulp-add-src');

function prepareVendorJs () {
    console.log('prepareVendorJs');
    var deferred = Q.defer();
    gulp.src(bowerFiles())
        .pipe(addsrc.append('./bower_components/navgoco/src/jquery.navgoco.js'))
        .pipe(addsrc.append('./custom_modules/qtip2/jquery.qtip.js'))
        .pipe(gulpFilter(['**/*.js']))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/dev/js')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function prepareVendorAssets () {
    console.log('prepareVendorAssets');
    var deferred = Q.defer();
    gulp.src(bowerFiles())
        .pipe(gulpFilter(['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.otf']))
        .pipe(gulp.dest('build/dev/fonts')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function prepareVendorCss () {
    console.log('prepareVendorCss');
    var deferred = Q.defer();
    gulp.src(bowerFiles())
        .pipe(addsrc.append('./custom_modules/qtip2/jquery.qtip.css'))
        .pipe(gulpFilter(['**/*.css']))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.css'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/dev/css')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function compressVendorJs () {
    console.log('compressVendorJs');
    var deferred = Q.defer();
    gulp.src(['build/dev/js/vendor.js'])
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('build/prod/js')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    prepareVendorJs: prepareVendorJs,
    prepareVendorAssets: prepareVendorAssets,
    prepareVendorCss: prepareVendorCss,
    compressVendorJs: compressVendorJs
};
