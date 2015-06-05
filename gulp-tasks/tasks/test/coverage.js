'use strict';

var gulp = require('gulp-help')(require('gulp')),
    karma = require('karma'),
    prepareKarmaConfig = require('../../util/prepareKarmaConfig.js');

gulp.task('test:coverage', 'Checks test coverage for codebase',function (done) {
    prepareKarmaConfig
        .includeBowerJsFiles()
        .then(function () {
            karma.server.start({
                configFile: __dirname + '/../../../karma.conf.js',
                reporters: ['coverage'],
                coverageReporter: {
                    type: 'text'
                }
            }, function () {
                //this.emit('end');
                done();
            });
        });
});
