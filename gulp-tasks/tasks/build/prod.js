'use strict';

var gulp = require('gulp-help')(require('gulp')),
    prepareProdBuild = require('../../util/build/prepareProdBuild'),
    prepareIndexHtml = require('../../util/build/prepareIndexHtml'),
    prepareConfig = require('../../util/build/prepareConfig'),
    prepareRevision = require('../../util/build/prepareRevision'),
    prepareBuildHelper = require('../../util/build/prepareBuildHelper'),
    prepareTransform = require('../../util/build/prepareTransform');

gulp.task('build:prod', 'Builds production build in build folder', ['build:dev'] , function (done) {
    prepareBuildHelper
        .cleanProdBuild()
        // transform JSX
        .then(prepareTransform.transformJsx)
        // process app assets
        .then(prepareProdBuild.prepareJs)
        .then(prepareProdBuild.prepareCss)
        .then(prepareProdBuild.prepareAssets)
        .then(prepareProdBuild.optimiseImages)
        .then(prepareIndexHtml.prepareProdIndexHtml)
        .then(prepareConfig.prepareProdConfig)
        .then(prepareRevision.revisionProdBuild)
        .then(prepareBuildHelper.addGitRepoInfoProd)
        .then(function () {
            done();
        });
});
