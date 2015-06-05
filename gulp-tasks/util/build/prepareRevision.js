'use strict';

var Q = require('q'),
    gulp = require('gulp'),
    extend = require('node.extend'),
    rev = require('gulp-rev'),
    vinylPaths = require('vinyl-paths'),
    del = require('del'),
    revReplace = require("gulp-rev-replace"),
    addsrc = require('gulp-add-src'),
    sourcemaps = require('gulp-sourcemaps');

function revisionDevBuild () {
    var deferred = Q.defer();
    var originalFiles = vinylPaths();
    gulp.src(['build/dev/**/*.*', '!build/dev/index.html', '!build/dev/**/*.map'])
        .pipe(originalFiles)
        .pipe(rev())
        .pipe(gulp.dest('build/dev'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/dev'))
        .on('finish', function () {
            gulp.src(['build/dev/**/*-*.js', 'build/dev/**/*-*.css'])
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(addsrc.append('build/dev/index.html'))
                .pipe(revReplace({
                    manifest: gulp.src('build/dev/rev-manifest.json')
                }))
                .pipe(gulp.dest('build/dev'))
                .on('finish', function () {
                    del(originalFiles.paths.concat([
                        'build/dev/rev-manifest.json',
                        'build/dev/**/*.map',
                        '!build/dev/**/*-*.map'
                        ]), function () {
                            deferred.resolve(true);
                        });
                });
        });
    return extend(deferred.promise, module.exports);
}

function revisionProdBuild () {
    var deferred = Q.defer();
    var originalFiles = vinylPaths();
    gulp.src(['build/prod/**/*.*', '!build/prod/index.html'])
        .pipe(originalFiles)
        .pipe(rev())
        .pipe(gulp.dest('build/prod'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('build/prod'))
        .on('finish', function () {
            gulp.src(['build/prod/**/*-*.js', 'build/prod/**/*-*.css', 'build/prod/index.html'])
                .pipe(revReplace({
                    manifest: gulp.src('build/prod/rev-manifest.json')
                }))
                .pipe(gulp.dest('build/prod'))
                .on('finish', function () {
                    del(originalFiles.paths.concat([
                        'build/prod/rev-manifest.json'
                        ]), function () {
                            deferred.resolve(true);
                        });
                });
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    revisionDevBuild: revisionDevBuild,
    revisionProdBuild: revisionProdBuild
}