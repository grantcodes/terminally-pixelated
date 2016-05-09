// ## Globals
var fs             = require('fs');
var browserSync    = require('browser-sync').create();
var gulp           = require('gulp');
var gutil          = require('gulp-util');
var watch          = require('gulp-watch');
var sourcemaps     = require('gulp-sourcemaps');
var jsonSass       = require('json-sass');
var source         = require('vinyl-source-stream');
var rename         = require('gulp-rename');
var sass           = require('gulp-sass');
var Eyeglass       = require('eyeglass');
var postcss        = require('gulp-postcss');
var cssnano        = require('cssnano');
var runSequence    = require('run-sequence');
var autoprefixer   = require('autoprefixer');
var styleguide     = require('sc5-styleguide');
var webpack        = require('webpack');
var del            = require('del');
var svgSprite      = require('gulp-svg-sprite');
var config         = require('./src/config');

var eyeglass = new Eyeglass({
    importer: function(uri, prev, done) {
        done(sass.compiler.types.NULL);
    }
});

config.dirs = {
  theme: __dirname + '/themes/' + config.theme,
  src: __dirname + '/src',
};
// Cheeky hack since dots break sass variables
config.devDomain = config.devDomain.replace(new RegExp('-dot-', 'g'), '.');

var webpackConf = {
  entry: config.dirs.src + '/js/app.js',
  output: {
    path: config.dirs.theme + '/js',
    filename: 'app.js'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /(flickity|imagesloaded|fizzy-ui-utils|get-size|unipointer)/, loader: 'imports?define=>false&this=>window' },
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};

gulp.task('clean', function(){
  return del([
    config.dirs.theme + '/styleguide',
    config.dirs.theme + '/js/app.js',
    config.dirs.theme + '/config.json',
    config.dirs.theme + '/main.css',
    config.dirs.theme + '/main.css.map',
    config.dirs.theme + '/style.css',
    config.dirs.theme + '/style.css.map',
    config.dirs.theme + '/editors-style.css',
    config.dirs.theme + '/editors-style.css.map',
  ]);
});

var processors = [
  autoprefixer({browsers: ['last 2 versions']}),
  cssnano
];
gulp.task('scss', function() {
  return gulp.src(config.dirs.src + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass.options).on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write(config.dirs.theme))
    .pipe(gulp.dest(config.dirs.theme));
});

gulp.task('styleguide:generate', function() {
  gulp.src([config.dirs.src + '/scss/**/_*.scss', '!src/scss/vendor/**/*'])
    .pipe(styleguide.generate({
        title: 'Style Guide',
        rootPath: config.dirs.theme + '/styleguide',
        overviewPath: 'README.md',
        appRoot: '/' + config.wpContentFolder + '/themes/' + config.theme + '/styleguide',
        disableEncapsulation: true,
        disableHtml5Mode: true
      }))
    .pipe(gulp.dest(config.dirs.theme + '/styleguide'));
});

gulp.task('styleguide:applystyles', function() {
  gulp.src(config.dirs.src + '/scss/style.scss')
    .pipe(sass(eyeglass.options).on("error", sass.logError))
    .pipe(postcss(processors))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(config.dirs.theme + '/styleguide'));
});

gulp.task('jsonconfig', function() {
  return fs.createReadStream(config.dirs.src + '/config.json')
    .pipe(jsonSass({
      prefix: '$tp-config: ',
    }))
    .pipe(source(config.dirs.src + '/config.json'))
    .pipe(rename('_config.scss'))
    .pipe(gulp.dest(config.dirs.src + '/scss/utils'));
});

gulp.task('webpack', function() {
  return webpack(webpackConf, function(err, stats) {
    if (err) {
      gutil.beep();
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({}));
  });
});

gulp.task('copyfiles', function() {
  return gulp.src(
    config.dirs.src + '/config.json',
    { base: 'src' })
  .pipe(gulp.dest(config.dirs.theme));
});

gulp.task('svgs', function() {
  var svgConfig = {
    mode: {
      symbol: true,
    }
  };
  return gulp.src(config.dirs.src + '/svgs/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(config.dirs.theme + '/img'));
});

gulp.task('watch', function() {
  browserSync.init({
    files: [
      config.dirs.theme + '/**/*.css',
      config.dirs.theme + '/**/*.php',
      config.dirs.theme + '/views/**/*.twig',
      config.dirs.theme + '/js/app.js',
      config.dirs.theme + '/img/**/*'
    ],
    open: false,
    proxy: config.devDomain,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
  watch([config.dirs.src + '/scss/**/*.scss'], function() {
    gulp.start(['scss', 'styleguide:generate', 'styleguide:applystyles']);
  });
  watch([config.dirs.src + '/config.json'], function() {
    gulp.start(['jsonconfig']);
  });
  watch([config.dirs.src + '/js/**/*.js'], function() {
    gulp.start(['webpack']);
  });
  watch([config.dirs.src + '/svgs/**/*.svg'], function() {
    gulp.start(['svgs']);
  });
});

gulp.task('build', function() {
  runSequence(
    'clean',
    'copyfiles',
    'jsonconfig',
    'scss',
    'svgs',
    'styleguide:generate',
    'styleguide:applystyles',
    'webpack'
  );
});

gulp.task('default', function() {
  gulp.start('build');
});
