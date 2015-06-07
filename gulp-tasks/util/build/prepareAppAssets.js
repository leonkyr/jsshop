'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    extend = require('node.extend'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace');

function prepareAppAssets () {
    var deferred = Q.defer();
    gulp.src(['app/theme/neuboard/fonts/**/*'])
        .pipe(gulp.dest('build/dev/fonts')).on('finish', function () {
            gulp.src(['app/theme/neuboard/images/**/*'])
                .pipe(gulp.dest('build/dev/images')).on('finish', function () {
                    deferred.resolve(true);
                });
        });
    return extend(deferred.promise, module.exports);
}

function prepareAppJs () {
    var deferred = Q.defer();
    gulp.src(['app/**/*.js','!app/**/*spec.js', '!app/components/content/**', '!app/components/handle/**'])
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/dev/js')).on('finish', function () {
            deferred.resolve(true);
        });

    return extend(deferred.promise, module.exports);
}

function prepareAppCss () {
    var deferred = Q.defer();
    gulp.src(['app/theme/**/*.css'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/dev/css')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

// function prepareTemplateCache () {
//     var deferred = Q.defer();
//     gulp.src('app/**/*.tmpl.html')
//         .pipe(replace(/theme\/neuboard\/images\//g, 'images/'))
//         .pipe(templateCache('template.js', {
//             module: 'shopFrontend'
//         }))
//         .pipe(gulp.dest('build/dev/js')).on('finish', function () {
//             deferred.resolve(true);
//         });
//     return extend(deferred.promise, module.exports);
// }

module.exports = {
    prepareAppAssets: prepareAppAssets,
    prepareAppJs: prepareAppJs,
    prepareAppCss: prepareAppCss
};
