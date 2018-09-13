const glob = require('glob')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const config = require('./config')

const devMode = process.env.NODE_ENV !== 'production'

const dirs = {
  src: __dirname + '/src',
  app: __dirname + '/app',
  theme: __dirname + '/themes/theme',
}

const sassMap = data => {
  let map = '('
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key]
      if (typeof value === 'object') {
        value = sassMap(value)
      } else if (typeof value === 'string') {
        value = value
          .replace('.', '')
          .replace('http://', '')
          .replace('https://', '')
      }
      map += `${key}: ${value},`
    }
  }
  map += ')'
  return map
}

let webpackConfig = {
  mode: 'production',
  entry: {
    main: [
      // `${dirs.src}/js/hot.js`,
      `${dirs.src}/js/main.js`,
      `${dirs.src}/scss/main.scss`,
      ...glob.sync(`${dirs.src}/svgs/*.svg`),
    ],
  },
  context: dirs.src,
  output: {
    publicPath: '/wp-content/themes/theme/assets/',
    path: `${dirs.theme}/assets`,
    filename: '[name]_[hash].js',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'cache-loader' }, { loader: 'babel-loader' }],
      },
      {
        test: /\.twig$/,
        loader: 'twig-loader',
        options: {
          // Twig options
        },
      },
      {
        test: /\.scss$/,
        include: dirs.src,

        use: [
          // { loader: 'cache-loader' }, // Breaks css extraction for some reason
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: devMode },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: devMode,
              plugins: loader =>
                devMode
                  ? [require('postcss-preset-env')()]
                  : [require('postcss-preset-env')(), require('cssnano')()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              data: `$config: ${sassMap(config)};`,
              sourceMap: devMode,
              sourceComments: devMode,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: devMode
            ? null
            : svgPath => `sprite_[hash]${svgPath.substr(-4)}`,
        },
      },
    ],
  },
  plugins: [
    new CleanPlugin([`${dirs.theme}`]),
    new webpack.DefinePlugin({
      'process.env.tpConfig': JSON.stringify(config),
    }),
    new SpriteLoaderPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new CopyWebpackPlugin(
      [
        { from: `${dirs.app}/**/*`, to: dirs.theme },
        { from: `${dirs.src}/img/**/*`, to: dirs.theme },
        { from: `${__dirname}/config.json`, to: dirs.theme },
      ],
      {
        context: dirs.app,
      }
    ),
    new ImageminPlugin({
      disable: devMode,
      pngquant: {
        quality: '95-100',
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: !devMode,
      debug: devMode,
      stats: { colors: true },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.s?css$/,
      options: {
        output: { path: dirs.theme },
        context: dirs.theme,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.js$/,
      options: {
        eslint: { failOnWarning: false, failOnError: true },
      },
    }),
  ],
  // TODO: Tried to use webpack dev server as a proxy instead of browsersync,
  // but ended up with issues as php is still looking for files inside the
  // theme folder, which doesn't get created when using the server
  // devServer: {
  //   index: '',
  //   port: 3333,
  //   contentBase: dirs.app,
  //   watchContentBase: true,
  //   proxy: {
  //     '/': {
  //       target: 'http://indieweb-wp.test',
  //       secure: false,
  //       changeOrigin: true,
  //     },
  //   },
  // },
}

if (devMode) {
  console.log('Running in dev mode')
  webpackConfig.mode = 'development'
  webpackConfig.devtool = 'cheap-source-map'
  webpackConfig.stats = false
  webpackConfig.output.filename = '[name].js'
  webpackConfig.plugins.push(
    new BrowserSyncPlugin(
      {
        port: 3333,
        proxy: config.devUrl,
      }
      // { reload: false, injectCss: true }
    )
  )
  // webpack.plugins.unshift(new webpack.HotModuleReplacementPlugin())
} else {
  console.log('Building in production mode')
}

module.exports = webpackConfig
