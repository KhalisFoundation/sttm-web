const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')

const PRODUCTION = process.env.NODE_ENV === 'production';


const plugins = PRODUCTION
  ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),
    new UglifyJsPlugin(),
  ]
  : [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),
  ]
  ;


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