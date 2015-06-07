'use strict';

var gulp = require('gulp-help')(require('gulp')),
    prepareBuildHelper = require('../../util/build/prepareBuildHelper'),
    prepareAppAssets = require('../../util/build/prepareAppAssets'),
    prepareTransform = require('../../util/build/prepareTransform'),
    prepareVendorAssets = require('../../util/build/prepareVendorAssets'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareRevision = require('../../util/build/prepareRevision'),
    prepareConfig = require('../../util/build/prepareConfig');

gulp.task('build:dev', 'Builds development build in build folder' , function (done) {

    prepareBuildHelper.cleanDevBuild()
        // process vendor assets
        // .then(prepareVendorAssets.prepareVendorJs)
        // .then(prepareVendorAssets.prepareVendorCss)
        // .then(prepareVendorAssets.prepareVendorAssets)
        // transform JSX
        .then(prepareTransform.transformJsx)
        // process app assets
        // .then(prepareAppAssets.prepareAppJs)
        // .then(prepareAppAssets.prepareAppCss)
        // // .then(prepareAppAssets.prepareTemplateCache)
        // .then(prepareAppAssets.prepareAppAssets)
        // // prepare index html
        // .then(prepareIndexHtml.prepareDevIndexHtml)
        // // prepare config json
        // .then(prepareConfig.prepareDevConfig)
        .then(prepareRevision.revisionDevBuild)
        .then(prepareBuildHelper.addGitRepoInfoDev)
        .then(function () {
            done();
        });
});
