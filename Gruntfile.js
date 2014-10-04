'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      "modules": [ 'test/fake-app/modules' ],
      "app": [ 'test/fake-app/build' ]
    },

    titaniumifier: {
      "module": {
        options: {
          as: "superagent"
        }
      }
    },

    titanium: {
      "ios": {
        options: {
          command: 'build',
          logLevel: 'debug',
          projectDir: './test/fake-app',
          platform: 'ios',
          failureTest: /NOTOK/i,
          successTest: /ALLOK/i
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
        src: 'superagent-commonjs-<%= pkg.version %>.zip',
        dest: 'test/fake-app'
      }
    }

  });

  grunt.loadTasks('./tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-titaniumifier');
  /*grunt.loadNpmTasks('grunt-titanium');*/
  grunt.loadNpmTasks('grunt-zip');

  var server;

  grunt.registerTask('server:start', 'Starts the fake server', function () {
    if (!server) {
      server = require('./test/fake-server/server');
      grunt.log.oklns('Server startup');
    }
    else {
      grunt.log.oklns('Server already listening');
    }
  });

  grunt.registerTask('server:stop', 'Starts the fake server', function () {
    var done = this.async();

    if (!server) {
      grunt.log.oklns('No server to stop');
      done();
    }
    else server.close(function () {
      grunt.log.oklns('Server stopped correctly');
      done();
    });
  });

  grunt.registerTask('env', 'Builds env.js file from the current process.', function () {
    grunt.file.write('test/fake-app/Resources/env.js', 'module.exports = ' + JSON.stringify(process.env, null, 2) + ';');
  });

  grunt.registerTask('build', [ 'titaniumifier:module' ]);
  grunt.registerTask('test:ios', [ 'unzip:module', 'titanium:ios' ]);
  grunt.registerTask('test:droid', [ 'unzip:module', 'titanium:droid' ]);

  grunt.registerTask('ios', [ 'clean', 'build', 'test:ios' ]);
  grunt.registerTask('droid', [ 'clean', 'build', 'test:droid' ]);

  grunt.registerTask('default', [ 'ios' ]);
};
