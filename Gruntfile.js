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
    sassFiles: ['scss/style.scss', 'scss/editor-style.scss'],
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
          environment: 'development',
          specify: config.sassFiles
        }
      }
    },

    // default watch configuration
    watch: {
      compass: {
        files: '**/*.scss',
        tasks: ['compass', 'autoprefixer', 'csso']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['**/*.css', '**/*.js', '**/*.php', '**/*.twig']
      },
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      dist: {
        options: {
          // Target-specific options go here.
        },
        src: '*.css',
        dest: ''
      }
    },

    csso: {
      compress: {
        options: {
          report: 'min'
        },
        files: {
          'main.css': ['style.css'],
          'editor-style.css': ['editor-style.css']
        }
      }
    },

});


grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['compass', 'autoprefixer', 'csso']);

};