'use strict';

var gulp = require('gulp-help')(require('gulp'));

gulp.task('lint', 'Runs all syntax checks for the codebase', ['lint:jscs', 'lint:jshint']);
