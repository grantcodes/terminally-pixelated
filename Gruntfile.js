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
    jsFiles: ['js/**/*.js', 'terminally-pixelated.json'],
    templateFiles: ['**/*.php', 'views/**/*.twig']
  };
  config.allSassFiles = config.sassFiles.concat(config.sassPartials);
  config.bsFiles = config.cssFiles.concat(config.jsFiles).concat(config.templateFiles);

  var tpConfig = require('./terminally-pixelated.json');

  grunt.initConfig({

    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'style.css': 'scss/style.scss',
          'editor-style.css': 'scss/editor-style.scss'
        }
      }
    },

    // default watch configuration
    watch: {
      js: {
        files: 'js/**/*.js',
        tasks: ['jsCompileDev']
      },
      sass: {
        files: 'scss/**/*.scss',
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
          open: false,
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
          'lazysizes.js': 'lazysizes/lazysizes.min.js',
          'fs/core.js': 'formstone/dist/js/core.js',
          'fs/swap.js': 'formstone/dist/js/swap.js',
          'fs/touch.js': 'formstone/dist/js/touch.js',
          'fs/lightbox.js': 'formstone/dist/js/lightbox.js',
          'fs/navigation.js': 'formstone/dist/js/navigation.js',
          'fs/checkbox.js': 'formstone/dist/js/checkbox.js',
          'fs/range.js': 'formstone/dist/js/range.js',
          'fs/carousel.js': 'formstone/dist/js/carousel.js',
          'fs/mediaquery.js': 'formstone/dist/js/mediaquery.js',
          'fs/dropdown.js': 'formstone/dist/js/dropdown.js',
          'fs/equalize.js': 'formstone/dist/js/equalize.js',
          'fs/number.js': 'formstone/dist/js/number.js',
          'fs/tabs.js': 'formstone/dist/js/tabs.js',
          'fs/background.js': 'formstone/dist/js/background.js',
        }
      },
      scss: {
        options: {
          destPrefix: 'scss/vendor'
        },
        files: {
          '_normalize.scss': 'normalize.scss/_normalize.scss',
          '_scut.scss': 'scut/dist/_scut.scss',
          '_breakpoint.scss': 'compass-breakpoint/stylesheets/_breakpoint.scss',
          'breakpoint': 'compass-breakpoint/stylesheets/breakpoint',
          '_susy.scss': 'susy/sass/_susy.scss',
          'susy': 'susy/sass/susy',
          '_typographic.scss': 'typographic/scss/typographic.scss',
          'fs/_lightbox.scss': 'formstone/dist/css/lightbox.css',
          'fs/_navigation.scss': 'formstone/dist/css/navigation.css',
          'fs/_checkbox.scss': 'formstone/dist/css/checkbox.css',
          'fs/_range.scss': 'formstone/dist/css/range.css',
          'fs/_carousel.scss': 'formstone/dist/css/carousel.css',
          'fs/_dropdown.scss': 'formstone/dist/css/dropdown.css',
          'fs/_number.scss': 'formstone/dist/css/number.css',
          'fs/_tabs.scss': 'formstone/dist/css/tabs.css',
          'fs/_background.scss': 'formstone/dist/css/background.css',
        }
      },
      php: {
        options: {
          destPrefix: 'lib/vendor'
        },
        files: {
          'tha-theme-hooks.php': 'themehookalliance/tha-theme-hooks.php',
          'class-tgm-plugin-activation.php': 'TGM-Plugin-Activation/class-tgm-plugin-activation.php'
        }
      }
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
    },

    webfont: {
        icons: {
            src: 'img/icons/*.svg',
            dest: 'fonts',
            destCss: 'scss/vendor',
            options: {
                stylesheet: 'scss',
                syntax: 'bem',
                htmlDemo: false,
                template: './icon-font-template.scss',
                relativeFontPath: 'fonts/',
                templateOptions: {
                    baseClass: 'icon-icon',
                    classPrefix: 'icon-',
                    mixinPrefix: 'icon-'
                }
            }
        }
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'js/dist/main.map'
        },
        files: {
          'js/dist/main.min.js': ['js/vendor/lazysizes.js', 'js/vendor/fs/core.js', 'js/vendor/fs/mediaquery.js', 'js/vendor/fs/swap.js', 'js/vendor/fs/touch.js', 'js/vendor/fs/navigation.js', 'js/vendor/fs/checkbox.js', 'js/vendor/fs/dropdown.js', 'js/src/main/*.js']
        }
      },
      dist: {
        options: {
          sourceMap: false,
          compress: {
            drop_console: true
          }
        },
        files: {
          'js/dist/main.min.js': ['js/vendor/lazysizes.js', 'js/vendor/fs/core.js', 'js/vendor/fs/mediaquery.js', 'js/vendor/fs/swap.js', 'js/vendor/fs/touch.js', 'js/vendor/fs/navigation.js', 'js/vendor/fs/checkbox.js', 'js/vendor/fs/dropdown.js', 'js/src/main/*.js']
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'js/src/*.js']
    }

});

grunt.registerTask('cssCompileDev', ['sass']);
grunt.registerTask('cssCompileDist', ['webfont', 'sass', 'autoprefixer', 'csso']);
grunt.registerTask('jsCompileDev', ['jshint', 'uglify:dev']);
grunt.registerTask('jsCompileDist', ['jshint', 'uglify:dist']);
grunt.registerTask('default', ['browserSync', 'watch']);
grunt.registerTask('serve', ['default']);
grunt.registerTask('build', ['bowercopy', 'shared_config', 'cssCompileDist', 'jsCompileDist']);

};
