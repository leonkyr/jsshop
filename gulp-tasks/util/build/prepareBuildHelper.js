'use strict';

var gulp = require('gulp'),
    Q = require('q'),
    uglify = require('gulp-uglify'),
    extend = require('node.extend'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    jeditor = require('gulp-json-editor'),
    git = require('gulp-git');

function cleanBuild () {
    console.log('cleanBuild');
    var deferred = Q.defer();
    del(['build'], function () {
        deferred.resolve(true);
    });
    return extend(deferred.promise, module.exports);
}

function cleanDevBuild () {
    console.log('cleanBuild');
    var deferred = Q.defer();
    del(['build/dev'], function () {
        deferred.resolve(true);
    });
    return extend(deferred.promise, module.exports);
}

function cleanProdBuild () {
    var deferred = Q.defer();
    del(['build/prod'], function () {
        deferred.resolve(true);
    });
    return extend(deferred.promise, module.exports);
}

function addGitRepoInfoDev () {
    console.log('addGitRepoInfoDev');
    var deferred = Q.defer();
    git.revParse({args: '--abbrev-ref HEAD',quiet: true}, function (err, branch) {
        git.revParse({args: 'HEAD',quiet: true}, function (err, hash) {
            git.exec({args: 'tag',quiet: true}, function (err, tags) {
                gulp.src('build/dev/config-*.json')
                    .pipe(jeditor({
                        gitInfo: {
                            branch: branch,
                            tag: tags,
                            hash: hash
                        }
                    }))
                    .pipe(gulp.dest('build/dev'))
                    .on('finish', function () {
                        deferred.resolve(true);
                    });
            });
        });
    });
    return extend(deferred.promise, module.exports);
}

function addGitRepoInfoProd () {
    console.log('addGitRepoInfoProd');
    var deferred = Q.defer();
    git.revParse({args: '--abbrev-ref HEAD',quiet: true}, function (err, branch) {
        git.revParse({args: 'HEAD',quiet: true}, function (err, hash) {
            git.exec({args: 'tag',quiet: true}, function (err, tags) {
                gulp.src('build/prod/config-*.json')
                    .pipe(jeditor({
                        gitInfo: {
                            branch: branch,
                            tag: tags,
                            hash: hash
                        }
                    }))
                    .pipe(gulp.dest('build/prod'))
                    .on('finish', function () {
                        deferred.resolve(true);
                    });
            });
        });
    });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    cleanBuild: cleanBuild,
    cleanDevBuild: cleanDevBuild,
    cleanProdBuild: cleanProdBuild,
    addGitRepoInfoDev: addGitRepoInfoDev,
    addGitRepoInfoProd: addGitRepoInfoProd
};
