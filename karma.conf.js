'use strict';
/*jshint node:true*/

// Karma configuration
// Generated on Wed Sep 10 2014 11:23:19 GMT+0530 (IST)

module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            //bower files
            './bower_components/jquery/dist/jquery.js',
            './bower_components/pace/pace.js',
            './bower_components/html5shiv/dist/html5shiv.js',
            './bower_components/respond/dest/respond.src.js',
            './bower_components/moment-duration-format/lib/moment-duration-format.js',
            //bower files end
            './bower_components/navgoco/src/jquery.navgoco.js',
            './custom_modules/qtip2/jquery.qtip.js',
            //app files
            './app/**/*.js',
            //app files end
            //config.json fixture
            {
                pattern:  './app/config.json',
                watched:  true,
                served:   true,
                included: false
            }
        ],

        // list of files to exclude
        exclude: [
            './app/**/content/**'
        ],

        sauceLabs: {
            testName: 'Web App Unit Tests'
        },
        customLaunchers: customLaunchers,
        captureTimeout: 120000,
        browserNoActivityTimeout: 120000,

        // test results reporter to use
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec','coverage','saucelabs'],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './app/**/!(*.spec).js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'text-summary',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
        // config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS']
        //browsers: Object.keys(customLaunchers),

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // singleRun: true
    });
};

var customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    }
  };
