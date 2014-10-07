module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


  var config = {
    sassFiles: ['scss/style.scss', 'scss/editor-style.scss'],
    sassPartials: ['scss/**/_*.scss'],
    cssFiles: ['style.css', 'main.css'],
    jsFiles: ['js/**/*.js'],
    templateFiles: ['**/*.php', 'views/**/*.twig']
  };
  config.allSassFiles = config.sassFiles.concat(config.sassPartials);
  config.bsFiles = config.cssFiles.concat(config.jsFiles).concat(config.templateFiles);

  var tpConfig = require('./terminally-pixelated.json');

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
          environment: 'development',
          specify: config.sassFiles
        }
      }
    },

    // default watch configuration
    watch: {
      compass: {
        files: '**/*.scss',
        tasks: ['cssCompileDev']
      },
      tpconfig: {
        files: 'terminally-pixelated.json',
        tasks: ['shared_config']
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: config.bsFiles
        },
        options: {
          watchTask: true,
          debugInfo: true,
          proxy: tpConfig.devDomain.replace(/'/g, ''),
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      dist: {
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

    bowercopy: {
      js: {
        options: {
          destPrefix: 'js/vendor'
        },
        files: {
          'require.js': 'requirejs/require.js',
          'unveil.js': 'unveil/jquery.unveil.min.js',
          'bxslider.js': 'bxslider-4/jquery.bxslider.min.js'
        }
      },
      scss: {
        options: {
          destPrefix: 'scss/vendor'
        },
        files: {
          '_normalize.scss': 'normalize.scss/_normalize.scss',
          '_scut.scss': 'scut/dist/_scut.scss',
          '_breakpoint.scss': 'breakpoint-sass/stylesheets/_breakpoint.scss',
          'breakpoint': 'breakpoint-sass/stylesheets/breakpoint',
          '_susy.scss': 'susy/sass/_susy.scss',
          'susy': 'susy/sass/susy',
          '_modular-scale.scss': 'modular-scale/stylesheets/_modular-scale.scss',
          'modular-scale': 'modular-scale/stylesheets/modular-scale',
          '_animate.sass': 'animate.sass/stylesheets/_animate.sass',
          'animate': 'animate.sass/stylesheets/animate',
          '_sassybuttons.sass': 'sassy-buttons/_sassybuttons.sass',
          'sassy-buttons': 'sassy-buttons/sassy-buttons'
        }
      }
    },

    favicons: {
      options: {
        appleTouchBackgroundColor: '#FFFFFF',
        trueColor: true,
        tileColor: 'auto',
        androidHomescreen: true,
        html: 'views/partials/icons.twig',
        HTMLPrefix: '{{icon_path}}'
      },
      icons: {
        src: 'icons/icon.png',
        dest: 'icons'
      },
    },

    clean: {
      icons: ['views/partials/icons.twig']
    },

    styleguide: {
      options: {
        framework: {
          name: 'kss'
        },
        template: {
          src: 'styleguide'
        }
      },
      dist: {
        files: {
          'docs/styleguide': 'scss/*/**/*.scss'
        }
      }
    },

    phantomcss: {
      options: {},
      large_screen: {
        options: {
          screenshots: 'test/visual/large/screenshots/',
          results: 'results/visual/large',
          viewportSize: [1024, 768]
        },
        src: [
          'test/visual/**/*.js'
        ]
      },
      small_screen: {
        options: {
          screenshots: 'test/visual/small/screenshots/',
          results: 'results/visual/small',
          viewportSize: [320, 480]
        },
        src: [
          'test/visual/**/*.js'
        ]
      }
    },

    shared_config: {
      filesTest: {
        options: {
          name: 'globalConfig',
          cssFormat: 'dash',
          jsFormat: 'camelcase'
        },
        src: 'terminally-pixelated.json',
        dest: [
          'scss/utils/_tp-config.scss'
        ]
      }
    }

});

grunt.registerTask('cssCompileDev', ['compass']);
grunt.registerTask('cssCompileDist', ['compass', 'autoprefixer', 'csso']);
grunt.registerTask('jsCompile', []);
grunt.registerTask('iconsCompile', ['clean:icons', 'favicons']);
grunt.registerTask('default', ['browserSync', 'watch']);
grunt.registerTask('serve', ['default']);
grunt.registerTask('build', ['bowercopy', 'shared_config', 'cssCompileDist', 'jsCompile', 'iconsCompile']);

};
