'use strict';

var gulp = require('gulp-help')(require('gulp')),
    jscs = require('gulp-jscs');

gulp.task('lint:jscs', 'Runs jscs syntax check over the codebase', function () {
    return gulp.src('app/**/*.js')
        .pipe(jscs());
});
