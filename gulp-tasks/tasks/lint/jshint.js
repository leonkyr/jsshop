'use strict';

var gulp = require('gulp-help')(require('gulp')),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish');

gulp.task('lint:jshint', 'Runs jshint syntax checks over the codebase', function () {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter('fail'));
});
