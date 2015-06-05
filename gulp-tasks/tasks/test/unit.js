'use strict';

var gulp = require('gulp-help')(require('gulp')),
    karma = require('karma'),
    notifier = require('node-notifier'),
    prepareKarmaConfig = require('../../util/prepareKarmaConfig');

gulp.task('test:unit', 'Runs unit tests over the code base', function (done) {
    prepareKarmaConfig
        .includeBowerJsFiles()
        .runLocally()
        .then(function () {
            karma.server.start({
                configFile: __dirname + '/../../../karma.conf.js'
            }, function (exitCode) {
                if (exitCode) {
                    notifier.notify({
                        title: 'JS Shop Build System Notification',
                        message: 'Tests are failing :('
                    });
                }else {
                    notifier.notify({
                        title: 'JS Shop Build System Notification',
                        message: 'All tests passing :)'
                    });
                }
                //this.emit('end');
                done();
            });
        });
});
