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
      sass: {
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
          'require.js': 'requirejs/require.js',
          'lazysizes.js': 'lazysizes/lazysizes.min.js',
          'fs/boxer.js': 'Boxer/jquery.fs.boxer.min.js',
          'fs/naver.js': 'Naver/jquery.fs.naver.min.js',
          'fs/pager.js': 'Pager/jquery.fs.pager.min.js',
          'fs/picker.js': 'Picker/jquery.fs.picker.min.js',
          'fs/ranger.js': 'Ranger/jquery.fs.ranger.min.js',
          'fs/roller.js': 'Roller/jquery.fs.roller.min.js',
          'fs/rubberband.js': 'Rubberband/jquery.fs.rubberband.min.js',
          'fs/scroller.js': 'Scroller/jquery.fs.scroller.min.js',
          'fs/selecter.js': 'Selecter/jquery.fs.selecter.min.js',
          'fs/shifter.js': 'Shifter/jquery.fs.shifter.min.js',
          'fs/sizer.js': 'Sizer/jquery.fs.sizer.min.js',
          'fs/stepper.js': 'Stepper/jquery.fs.stepper.min.js',
          'fs/tabber.js': 'Tabber/jquery.fs.tabber.min.js',
          'fs/wallpaper.js': 'Wallpaper/jquery.fs.wallpaper.min.js',
          'fs/zoomer.js': 'Zoomer/jquery.fs.zoomer.min.js'
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
          '_modular-scale.scss': 'modular-scale/stylesheets/_modular-scale.scss',
          'modular-scale': 'modular-scale/stylesheets/modular-scale',
          '_animate.sass': 'animate.sass/stylesheets/_animate.sass',
          'animate': 'animate.sass/stylesheets/animate',
          'fs/_boxer.scss': 'Boxer/jquery.fs.boxer.css',
          'fs/_naver.scss': 'Naver/jquery.fs.naver.css',
          'fs/_pager.scss': 'Pager/jquery.fs.pager.css',
          'fs/_picker.scss': 'Picker/jquery.fs.picker.css',
          'fs/_ranger.scss': 'Ranger/jquery.fs.ranger.css',
          'fs/_roller.scss': 'Roller/jquery.fs.roller.css',
          'fs/_scroller.scss': 'Scroller/jquery.fs.scroller.css',
          'fs/_selecter.scss': 'Selecter/jquery.fs.selecter.css',
          'fs/_shifter.scss': 'Shifter/jquery.fs.shifter.css',
          'fs/_stepper.scss': 'Stepper/jquery.fs.stepper.css',
          'fs/_tabber.scss': 'Tabber/jquery.fs.tabber.css',
          'fs/_wallpaper.scss': 'Wallpaper/jquery.fs.wallpaper.css',
          'fs/_zoomer.scss': 'Zoomer/jquery.fs.zoomer.css'
        }
      },
      php: {
        options: {
          destPrefix: 'lib/vendor'
        },
        files: {
          'tha-theme-hooks.php': 'themehookalliance/tha-theme-hooks.php'
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
    }

});

grunt.registerTask('cssCompileDev', ['sass']);
grunt.registerTask('cssCompileDist', ['webfont', 'sass', 'autoprefixer', 'csso']);
grunt.registerTask('jsCompile', []);
grunt.registerTask('iconsCompile', ['clean:icons', 'favicons']);
grunt.registerTask('default', ['browserSync', 'watch']);
grunt.registerTask('serve', ['default']);
grunt.registerTask('build', ['bowercopy', 'shared_config', 'cssCompileDist', 'jsCompile', 'iconsCompile']);

};
