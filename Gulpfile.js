// ## Globals
var browserSync  = require('browser-sync').create();
var gulp         = require('gulp');
var jsonSass     = require('gulp-json-sass');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var cssnano      = require('cssnano');
var runSequence  = require('run-sequence');
var autoprefixer = require('autoprefixer');
var styleguide   = require('sc5-styleguide');
var webpack      = require('webpack');
var del          = require('del');

var webpackConf = {
  entry: __dirname + "/src/js/app.js",
  output: {
    path: __dirname + "/themes/terminally-pixelated/js",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};

gulp.task('clean', function(){
  return del([
    'src/scss/vendor',
    'themes/terminally-pixelated/styleguide',
    'themes/terminally-pixelated/js/app.js',
    'themes/terminally-pixelated/config.json',
    'themes/terminally-pixelated/main.css',
    'themes/terminally-pixelated/main.css.map',
    'themes/terminally-pixelated/style.css',
    'themes/terminally-pixelated/style.css.map',
    'themes/terminally-pixelated/editors-style.css',
    'themes/terminally-pixelated/editors-style.css.map',
  ]);
});

gulp.task('scss', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano
  ];
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('themes/terminally-pixelated'));
});

gulp.task('styleguide:generate', function() {
  gulp.src(['src/scss/**/_*.scss', '!src/scss/vendor/**/*'])
    .pipe(styleguide.generate({
        title: 'Style Guide',
        rootPath: './themes/terminally-pixelated/styleguide',
        overviewPath: 'README.md',
        appRoot: '/content/themes/terminally-pixelated/styleguide',
        disableEncapsulation: true,
        disableHtml5Mode: true
      }))
    .pipe(gulp.dest('themes/terminally-pixelated/styleguide'));
});

gulp.task('styleguide:applystyles', function() {
  gulp.src('src/scss/style.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest('themes/terminally-pixelated/styleguide'));
});

gulp.task('jsonconfig', function() {
  return gulp.src('src/config.json')
    .pipe(jsonSass({sass: true}))
    .pipe(gulp.dest('src/scss/utils'));
});

gulp.task('webpack', function() {
  return webpack(webpackConf, function(err, stats) {
    if (err) {
      console.log(err);
    }
  });
});

gulp.task('copyfiles:config', function() {
  return gulp.src(
    'src/config.json',
    { base: 'src' })
  .pipe(gulp.dest('themes/terminally-pixelated'));
});
gulp.task('copyfiles:susy', function(){
  return gulp.src([
    'bower_components/susy/sass/susy/**/*',
    'bower_components/susy/sass/_susy.scss'
  ], { base: 'bower_components/susy/sass' })
  .pipe(gulp.dest('src/scss/vendor'));
});
gulp.task('copyfiles:scut', function(){
  return gulp.src([
    'bower_components/scut/dist/_scut.scss'
  ], { base: 'bower_components/scut/dist' })
  .pipe(gulp.dest('src/scss/vendor'));
});
gulp.task('copyfiles:typographic', function(){
  return gulp.src([
    'bower_components/typographic/scss/typographic.scss'
  ], { base: 'bower_components/typographic/scss' })
  .pipe(gulp.dest('src/scss/vendor'));
});
gulp.task('copyfiles:normalize', function(){
  return gulp.src([
    'bower_components/normalize.scss/_normalize.scss'
  ], { base: 'bower_components/normalize.scss' })
  .pipe(gulp.dest('src/scss/vendor'));
});
gulp.task('copyfiles:breakpoint', function(){
  return gulp.src([
    'bower_components/compass-breakpoint/stylesheets/breakpoint/**/*',
    'bower_components/compass-breakpoint/stylesheets/_breakpoint.scss'
  ], { base: 'bower_components/compass-breakpoint/stylesheets' })
  .pipe(gulp.dest('src/scss/vendor'));
});

gulp.task('copyfiles', function() {
  return runSequence(
    'copyfiles:config',
    'copyfiles:susy',
    'copyfiles:scut',
    'copyfiles:typographic',
    'copyfiles:normalize',
    'copyfiles:breakpoint'
  );
});

gulp.task('watch', function() {
  browserSync.init({
    files: [
      'themes/terminally-pixelated/**/*.css',
      'themes/terminally-pixelated/**/*.php',
      'themes/terminally-pixelated/views/**/*.php',
      'themes/terminally-pixelated/js/app.js'
    ],
    open: false,
    proxy: 'vagrant.local',
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**']
    }
  });
  gulp.watch(['src/scss/**/*.scss'], ['scss', 'styleguide:generate', 'styleguide:applystyles']);
  gulp.watch(['src/config.json'], ['jsonconfig']);
  gulp.watch(['src/js/**/*.js'], ['webpack']);
  gulp.watch(['bower.json'], ['build']);
});

gulp.task('build', function() {
  runSequence(
    'clean',
    'copyfiles:config',
    'copyfiles:susy',
    'copyfiles:scut',
    'copyfiles:typographic',
    'copyfiles:normalize',
    'copyfiles:breakpoint',
    'jsonconfig',
    'scss',
    'styleguide:generate',
    'styleguide:applystyles',
    'webpack'
  );
});

gulp.task('default', function() {
  gulp.start('build');
});
