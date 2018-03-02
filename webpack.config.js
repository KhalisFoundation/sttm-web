const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const API_URLS = {
  PRODUCTION: 'https://api.banidb.org',
  DEVELOPMENT: 'http://devapi.khajana.org/',
};

const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = PRODUCTION
  ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      PRODUCTION: JSON.stringify(true),
      API_URL: JSON.stringify(API_URLS.PRODUCTION),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin(),
  ]
  : [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false),
      API_URL: JSON.stringify(API_URLS.DEVELOPMENT),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),
  ];

const vendor = [
  'react',
  'react-dom',
  'shabados',
  'redux',
  'react-redux',
];

const app = path.resolve(__dirname, 'src', 'js', 'index.js');

module.exports = {
  entry: {
    vendor,
    app,
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    chunkFilename: 'chunks/[name].js',
    filename: '[name].js',
    publicPath: 'assets/js/',
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};