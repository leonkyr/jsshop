'use strict';

var gulp = require('gulp-help')(require('gulp'));
var protractor = require('gulp-protractor').protractor;
var prepareSauceTools = require('../../util/prepareSauceTools');

gulp.task('sauce:e2e', 'Runs all e2e tests over the code base on sauce labs' , function (done) {
    prepareSauceTools
        .enableSauceTesting()
        .runSauceConnect()
        .then(function () {
            gulp.src(['/fake'])
                .pipe(protractor({
                    configFile: 'protactor.conf.js',
                    args: []
                }))
                .on('error', function () {
                    prepareSauceTools
                        .stopSauceConnect()
                        .then(function () {
                            done();
                        });
                })
                .on('end', function () {
                    prepareSauceTools
                        .stopSauceConnect()
                        .then(function () {
                            done();
                        });
                });
        });
});
