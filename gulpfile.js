'use strict';
/*jshint node:true*/
var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp-tasks/tasks', {
    recurse: true
});
