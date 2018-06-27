const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const API_URLS = {
  BANIS: '//api.banidb.com/v2/banis',
  PRODUCTION: '//api.banidb.com/',
  DEVELOPMENT: '//devapi.khajana.org/',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//api.sikhitothemax.org/',
  },
};

const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = PRODUCTION
  ? [
      new webpack.efinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
        PRODUCTION: JSON.stringify(true),
        API_URL: JSON.stringify(API_URLS.PRODUCTION),
        SYNC_API_URL: JSON.stringify(API_URLS.SYNC.PRODUCTION),
        BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      }),
      new UglifyJsPlugin(),
    ]
  : [
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(false),
        API_URL: JSON.stringify(API_URLS.DEVELOPMENT),
        SYNC_API_URL: JSON.stringify(API_URLS.SYNC.LOCAL),
        BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      }),
    ];

const app = path.resolve(__dirname, 'src', 'js', 'index.js');

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    app,
  },
  output: {
    path: path.resolve(__dirname, 'public/assets', 'js'),
    chunkFilename: 'chunks/[name].js',
    filename: '[name].js',
    publicPath: '/assets/js/',
  },
  devtool: PRODUCTION ? undefined : 'inline-source-map',
  plugins,
  optimization: {
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, //ModuleConcatenationPlugin
    splitChunks: {
      cacheGroups: {
        // All dependencies in `node_modules` become part of vendor chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};
