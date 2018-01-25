const fs = require('fs');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gutil = require('gulp-util');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const jsonSass = require('json-sass');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const Eyeglass = require('eyeglass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const runSequence = require('run-sequence');
const autoprefixer = require('autoprefixer');
const styleguide = require('sc5-styleguide');
const webpack = require('webpack');
const del = require('del');
const svgSprite = require('gulp-svg-sprite');
const config = require('./src/config');

const eyeglass = new Eyeglass({
  importer: (uri, prev, done) => {
    done(sass.compiler.types.NULL);
  },
});

config.dirs = {
  theme: __dirname + '/themes/' + config.theme,
  src: __dirname + '/src',
};
// Cheeky hack since dots break sass variables
config.devDomain = config.devDomain.replace(new RegExp('-dot-', 'g'), '.');

const webpackConf = {
  entry: config.dirs.src + '/js/app.js',
  output: {
    path: config.dirs.theme + '/js',
    filename: 'app.js',
  },
  devtool: 'source-maps',
  module: {
    loaders: [{ test: /\.js$/, loader: 'babel-loader' }],
  },
  plugins: [
    // new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  ],
};

gulp.task('clean', () =>
  del([
    config.dirs.theme + '/styleguide',
    config.dirs.theme + '/js/app.js',
    config.dirs.theme + '/config.json',
    config.dirs.theme + '/main.css',
    config.dirs.theme + '/main.css.map',
    config.dirs.theme + '/style.css',
    config.dirs.theme + '/style.css.map',
    config.dirs.theme + '/editors-style.css',
    config.dirs.theme + '/editors-style.css.map',
  ]),
);

const processors = [autoprefixer({ browsers: ['last 2 versions'] }), cssnano];
gulp.task('scss:dev', () =>
  gulp
    .src(config.dirs.src + '/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass.options).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(config.dirs.theme)),
);
gulp.task('scss:dist', () =>
  gulp
    .src(config.dirs.src + '/scss/**/*.scss')
    .pipe(sass(eyeglass.options).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(config.dirs.theme)),
);

gulp.task('styleguide:generate', () =>
  gulp
    .src([config.dirs.src + '/scss/**/_*.scss', '!src/scss/vendor/**/*'])
    .pipe(
      styleguide.generate({
        title: 'Style Guide',
        rootPath: config.dirs.theme + '/styleguide',
        overviewPath: 'README.md',
        appRoot:
          '/' +
          config.wpContentFolder +
          '/themes/' +
          config.theme +
          '/styleguide',
        disableEncapsulation: true,
        disableHtml5Mode: true,
      }),
    )
    .pipe(gulp.dest(config.dirs.theme + '/styleguide')),
);

gulp.task('styleguide:applystyles', () =>
  gulp
    .src(config.dirs.src + '/scss/style.scss')
    .pipe(sass(eyeglass.options).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(config.dirs.theme + '/styleguide')),
);

gulp.task('jsonconfig', () =>
  fs
    .createReadStream(config.dirs.src + '/config.json')
    .pipe(
      jsonSass({
        prefix: '$tp-config: ',
      }),
    )
    .pipe(source(config.dirs.src + '/config.json'))
    .pipe(rename('_config.scss'))
    .pipe(gulp.dest(config.dirs.src + '/scss/utils')),
);

gulp.task('webpack', () =>
  webpack(webpackConf, (err, stats) => {
    if (err) {
      gutil.beep();
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({}));
  }),
);

gulp.task('copyfiles', () =>
  gulp
    .src(config.dirs.src + '/config.json', { base: 'src' })
    .pipe(gulp.dest(config.dirs.theme)),
);

const svgConfig = {
  mode: {
    symbol: true,
  },
};
gulp.task('svgs', () =>
  gulp
    .src(config.dirs.src + '/svgs/**/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(config.dirs.theme + '/img')),
);

gulp.task('watch', () => {
  browserSync.init({
    files: [
      config.dirs.theme + '/**/*.css',
      config.dirs.theme + '/**/*.php',
      config.dirs.theme + '/views/**/*.twig',
      config.dirs.theme + '/js/app.js',
      config.dirs.theme + '/img/**/*',
    ],
    open: false,
    proxy: config.devDomain,
    snippetOptions: {
      whitelist: ['/wp-admin/admin-ajax.php'],
      blacklist: ['/wp-admin/**'],
    },
  });
  watch([config.dirs.src + '/scss/**/*.scss'], () =>
    gulp.start(['scss:dev', 'styleguide:generate', 'styleguide:applystyles']),
  );
  watch([config.dirs.src + '/config.json'], () => gulp.start(['jsonconfig']));
  watch([config.dirs.src + '/js/**/*.js'], () => gulp.start(['webpack']));
  watch([config.dirs.src + '/svgs/**/*.svg'], () => gulp.start(['svgs']));
});

gulp.task('build', () =>
  runSequence(
    'clean',
    'copyfiles',
    'jsonconfig',
    'scss:dist',
    'svgs',
    'styleguide:generate',
    'styleguide:applystyles',
    'webpack',
  ),
);

gulp.task('default', () => gulp.start('build'));
