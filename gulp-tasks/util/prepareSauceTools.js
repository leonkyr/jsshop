'use strict';

var sauceConnectLauncher = require('sauce-connect-launcher'),
    Q = require('q'),
    extend = require('node.extend'),
    replace = require('gulp-replace'),
    gulp = require('gulp');

var sauceConnectProcess;

function enableSauceTesting () {
    var deferred = Q.defer();
    gulp.src('protactor.conf.js')
        .pipe(replace('    //sauceUser', '    sauceUser'))
        .pipe(replace('    //sauceKey', '    sauceKey'))
        .pipe(replace(': localCapabilities,', ': sauceCapabilities,'))
        .pipe(gulp.dest('./')).on('finish', function () {
            deferred.resolve(true);
        });
    return extend(deferred.promise, module.exports);
}

function runSauceConnect () {
    var deferred = Q.defer();
    console.log('Starting Sauce Connect Service');
    sauceConnectLauncher({
    }, function (err, process) {
        if (err) {
            console.error(err.message);
            return;
        }
        sauceConnectProcess = process;
        deferred.resolve(true);
    });
    return extend(deferred.promise, module.exports);
}

function stopSauceConnect () {
    var deferred = Q.defer();
    if (!sauceConnectProcess) {
        deferred.resolve(true);
    }else {
        console.log('Killing Sauce Connect Service');
        sauceConnectProcess.close(function () {
            deferred.resolve(true);
        });
    }
    return extend(deferred.promise, module.exports);
}

module.exports = {
    runSauceConnect: runSauceConnect,
    stopSauceConnect: stopSauceConnect,
    enableSauceTesting: enableSauceTesting
};
