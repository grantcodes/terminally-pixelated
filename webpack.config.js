const glob = require('glob')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const config = require('./src/config.json')

const devMode = process.env.NODE_ENV !== 'production'
const appName = process.env.LANDO_APP_NAME

const dirs = {
  src: __dirname + '/src',
  app: __dirname + '/app',
  theme: __dirname + '/wp-content/themes/' + appName,
}

const sassMap = data => {
  let map = '('
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key]
      if (typeof value === 'object') {
        value = sassMap(value)
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
      devMode ? `${dirs.src}/js/hot.js` : `${dirs.src}/js/main.js`,
      `${dirs.src}/scss/main.scss`,
      ...glob.sync(`${dirs.src}/svgs/*.svg`),
    ],
    gutenberg: [
      `${dirs.src}/js/blocks/index.js`,
      `${dirs.src}/scss/gutenberg.scss`,
    ],
  },
  output: {
    publicPath: `/wp-content/themes/${appName}/assets/`,
    path: `${dirs.theme}/assets`,
    filename: '[name].[hash].js',
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
          { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
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
          // TODO: Hashing svg name seems to break stuf
          // spriteFilename: devMode
          //   ? null
          //   : svgPath => `sprite.[hash]${svgPath.substr(-4)}`,
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
        { from: `${__dirname}/src/config.json`, to: dirs.theme },
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
    // new webpack.LoaderOptionsPlugin({
    //   minimize: !devMode,
    //   debug: devMode,
    //   stats: { colors: true },
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   test: /\.s?css$/,
    //   options: {
    //     output: { path: dirs.theme },
    //     context: dirs.theme,
    //   },
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   test: /\.js$/,
    //   options: {
    //     eslint: { failOnWarning: false, failOnError: true },
    //   },
    // }),
  ],
  devServer: {
    index: '',
    port: 3333,
    host: '0.0.0.0',
    disableHostCheck: true,
    hot: true,
    contentBase: dirs.app,
    watchContentBase: true,
    public: `hot.${process.env.LANDO_DOMAIN}`,
    watchOptions: {
      poll: true,
    },
    proxy: {
      '/': {
        target: 'https://nginx',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}

if (devMode) {
  webpackConfig.mode = 'development'
  webpackConfig.devtool = 'cheap-source-map'
  webpack.optimization = false
  webpackConfig.output.filename = '[name].js'
  // This forces php files to be moved to the theme so it still works with the dev server.
  webpackConfig.plugins.unshift(new WriteFilePlugin())
  // Enable hot loading.
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

module.exports = webpackConfig
