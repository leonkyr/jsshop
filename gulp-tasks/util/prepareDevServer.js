'use strict';

var http = require('http'),
    mock = require('../../custom_modules/canned'),
    server = require('gulp-connect'),
    Q = require('q'),
    extend = require('node.extend');

function startMockServer () {
    var deferred = Q.defer();
    var mocker = mock('mock-api', {
        cors: true,
        logger: process.stdout
    });
    http
        .createServer(mocker)
        .listen(7000);
    deferred.resolve(true);
    return extend(deferred.promise, module.exports);
}

function startAssetServer () {
    var deferred = Q.defer();
    server.server({
        root: __dirname + '../../../',
        host: '127.0.0.1',
        port: 8000,
        livereload: true
    });
    deferred.resolve(true);
    return extend(deferred.promise, module.exports);
}

module.exports = {
    startMockServer: startMockServer,
    startAssetServer: startAssetServer
};
