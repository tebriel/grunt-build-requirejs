module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['src/**/*.coffee','spec/**/*.coffee'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    },
    coffee: {
        compile: {
            files: {
                'lib/*.js': ['src/*.coffee']
            }
        }
    },
    jasmine_node: {
        projectRoot: "./spec",
        forceExit: true,
        extensions: 'coffee',
        jUnit: {
            report: false,
            savePath : "./build/reports/jasmine/",
            useDotNotation: true,
            consolidate: true
        }
    }
  });

  // Default task.
  grunt.registerTask('default', 'coffee lint jasmine_node');
  grunt.registerTask('test', 'jasmine_node');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-jasmine-node');

};
