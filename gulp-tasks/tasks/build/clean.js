'use strict';

var gulp = require('gulp-help')(require('gulp')),
    prepareBuildHelper = require('../../util/build/prepareBuildHelper');

gulp.task('build:clean', 'Cleans up build folder' , function (done) {
    prepareBuildHelper.cleanBuild()
        .then(function () {
            done();
        });
});
