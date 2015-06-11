'use strict';

var gulp = require('gulp-help')(require('gulp')),
    server = require('gulp-connect'),
    openPage = require('open'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareWatchHelper = require('../../util/prepareWatchHelper'),
    prepareTransform = require('../../util/build/prepareTransform'),
    prepareDevServer = require('../../util/prepareDevServer'),
    prepareBuildHelper = require('../../util/build/prepareBuildHelper'),
    prepareAppAssets = require('../../util/build/prepareAppAssets'),
    prepareVendorAssets = require('../../util/build/prepareVendorAssets'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareConfig = require('../../util/build/prepareConfig'),
    prepareRevision = require('../../util/build/prepareRevision');

gulp.task('dev', 'Start a fully functioning dev environment with watch', ['build:dev'], function (done) {
    // prepareDevServer
    //     .startAssetServer()
    //     .then(function () {
    //         openPage('http://localhost:8000/build/dev/index.html');
    //         done();
    //     });

    prepareWatchHelper
        .watchAppJsx()
        .then(prepareWatchHelper.watchAllButJsxFiles)
        .then(function () {}, function () {}, function (vinyl) {
            prepareBuildHelper
                .cleanBuild()
                // process vendor assets
                .then(prepareVendorAssets.prepareVendorJs)
                .then(prepareVendorAssets.prepareVendorCss)
                .then(prepareVendorAssets.prepareVendorAssets)
                // transform JSX
                //.then(prepareTransform.transformJsx)
                // process app assets
                //.then(prepareAppAssets.prepareAppJs)
                //.then(prepareAppAssets.prepareAppCss)
                //.then(prepareAppAssets.prepareTemplateCache)
                //.then(prepareAppAssets.prepareAppAssets)
                // prepare index html
                .then(prepareIndexHtml.prepareDevIndexHtml)
                // prepare config json
                .then(prepareConfig.prepareDevConfig)
                .then(prepareRevision.revisionDevBuild)
                .then(prepareBuildHelper.addGitRepoInfoDev)
                .then(function () {
                    gulp.src('build/dev/index.html')
                        .pipe(server.reload());
                });
        });

    // prepareWatchHelper
    //     .watchAppJs()
    //     .then(function () {},function () {}, function () {
    //         gulp.run('test:unit');
    //     });
});
