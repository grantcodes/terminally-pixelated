module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  var config = {
    sassModules: ['susy', 'modular-scale', 'animate'],
    uglify: []
  };

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          imagesDir: 'img',
          cssDir: '.',
          javascriptsDir: 'js',
          fontsDir: 'fonts',
          relativeAssets: true,
          require: config.sassModules,
          environment: 'production',
        }
      }
    },

    // default watch configuration
    watch: {
      compass: {
        files: '**/*.scss',
        tasks: 'compass'
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['**/*.css', '**/*.js', '**/*.php']
      },
      uglify: {
        files: 'js/*.js',
        tasks: 'uglify',
        options: {
          livereload: true
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        beautify: true,
        files: config.uglify
      }
    },

    imagemin: {
      files: [{
        expand: true,
        cwd: 'img',
      src: '{,*/}*.{png,jpg,jpeg}',
      dest: 'img'
    }]
  }

});


grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['compass', 'uglify', 'imagemin']);

};