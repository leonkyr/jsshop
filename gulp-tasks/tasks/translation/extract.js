'use strict';

var gulp = require('gulp-help')(require('gulp')),
    gettext = require('gulp-angular-gettext');

gulp.task('translation:extract', 'Extract strings to translate from templates', function (done) {
    gulp.src(['app/**/*.tmpl.html', 'app/**/*.js','!app/**/*spec.js', '!app/components/content/**'])
        .pipe(gettext.extract('strings.pot', {
            // options to pass to angular-gettext-tools...
        }))
        .pipe(gulp.dest('translations/'))
        .on('finish', function () {
            done();
        });
});