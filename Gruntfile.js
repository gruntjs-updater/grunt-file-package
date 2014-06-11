/*
 * grunt-file-package
 * https://github.com/robinma/grunt-file-package
 *
 * Copyright (c) 2014 robinma
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({




    // Configuration to be run (and then tested).
    file_package: {
      demo:{
        src:'test/fileslist/*.txt',
        dest:'test/package/',
        type:'.zip',
        sep:'/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['file_package', 'nodeunit']);
  grunt.registerTask('package', ['file_package','nodeunit']);

  // By default, lint and run all tests.
 // grunt.registerTask('default', ['jshint', 'test']);

};
