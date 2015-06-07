'use strict';

var http = require('http'),
    server = require('gulp-connect'),
    Q = require('q'),
    extend = require('node.extend');

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
    startAssetServer: startAssetServer
};
