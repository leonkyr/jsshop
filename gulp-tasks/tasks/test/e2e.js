'use strict';

var gulp = require('gulp-help')(require('gulp'));
var protractor = require('gulp-protractor').protractor;
var prepareProtactorTools = require('../../util/prepareProtactorTools');

gulp.task('test:e2e', 'Runs all e2e tests over the code base' , function (done) {
    prepareProtactorTools
        .enableLocalTesting()
        .installWebDriver()
        .then(function () {
            gulp.src(['/fake'])
                .pipe(protractor({
                    configFile: 'protactor.conf.js',
                    args: []
                }))
                .on('error', function () {})
                .on('end', function () {
                    done();
                });
        });
});
