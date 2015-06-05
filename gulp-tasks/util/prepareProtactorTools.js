'use strict';

var path = require('path'),
    Q = require('q'),
    childProcess = require('child_process'),
    extend = require('node.extend'),
    glob = require('glob'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    replace = require('gulp-replace');

function getProtractorBinary(binaryName) {
    var winExt = /^win/.test(process.platform) ? '.cmd' : '';
    var pkgPath = path.dirname(require.resolve('protractor'));
    var protractorDir = path.resolve(path.join(pkgPath, '..', 'bin'));
    return path.join(protractorDir, '/' + binaryName + winExt);
}

function enableLocalTesting () {
    var deferred = Q.defer();
    gulp.src('protactor.conf.js')
        .pipe(replace('    sauceUser', '    //sauceUser'))
        .pipe(replace('    sauceKey', '    //sauceKey'))
        .pipe(replace(': sauceCapabilities,', ': localCapabilities,'))
        .pipe(gulp.dest('./')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function installWebDriver () {
    var deferred = Q.defer();
    childProcess
        .spawn(getProtractorBinary('webdriver-manager'), ['update'], {
            stdio: 'inherit'
        }).once('close', function () {
            var pkgPath = path.dirname(require.resolve('protractor'));
            var seleniumDir = path.resolve(path.join(pkgPath, '..', 'selenium'));
            glob(seleniumDir + '/selenium-server-standalone-*.jar', function (er, files) {
                var seleniumJarPath = path.relative(path.join(__dirname,'..','..'),files[0]);
                gulp.src('protactor.conf.js')
                    .pipe(inject(gulp.src([seleniumJarPath],{
                        read:false
                    }), {
                        relative: true,
                        starttag: '// inject:selenium server jar location',
                        endtag: '// end:inject',
                        /**
                         * transforms filepath to format for karma include list
                         */
                        transform: function (filepath) {
                            return 'seleniumServerJar: \'' + filepath + '\',';
                        }
                    }))
                    .pipe(gulp.dest('./')).on('finish', function () {
                        deferred.resolve(true);
                    });
            });
        });
    return extend(deferred.promise, module.exports);
}

module.exports = {
    installWebDriver: installWebDriver,
    enableLocalTesting: enableLocalTesting
};
