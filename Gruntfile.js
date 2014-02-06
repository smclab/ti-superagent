'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      "modules": [ 'test/fake-app/modules' ],
      "app": [ 'test/fake-app/build' ]
    },

    titaniumifier: {
      "module": {}
    },

    titanium: {
      "ios": {
        options: {
          command: 'build',
          logLevel: 'debug',
          projectDir: './test/fake-app',
          platform: 'ios'
        }
      },
      "droid": {
        options: {
          command: 'build',
          logLevel: 'trace',
          projectDir: './test/fake-app',
          platform: 'android',
          deviceId: grunt.option('device-id')
        }
      }
    },

    unzip: {
      "module": {
        src: 'ti-request-commonjs-<%= pkg.version %>.zip',
        dest: 'test/fake-app'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titaniumifier');
  grunt.loadNpmTasks('grunt-titanium');
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('build', [ 'titaniumifier:module' ]);
  grunt.registerTask('test:ios', [ 'unzip:module', 'titanium:ios' ]);
  grunt.registerTask('test:droid', [ 'unzip:module', 'titanium:droid' ]);

  grunt.registerTask('ios', [ 'clean', 'build', 'test:ios' ]);
  grunt.registerTask('droid', [ 'clean', 'build', 'test:droid' ]);

  grunt.registerTask('default', [ 'ios' ]);
};
