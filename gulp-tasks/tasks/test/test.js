'use strict';

var gulp = require('gulp-help')(require('gulp'));

gulp.task('test', 'Runs all tests over the code base', ['build:dev', 'test:unit']);
