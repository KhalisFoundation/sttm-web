const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    router: path.resolve(__dirname, 'src', 'js', 'router.js'),
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: '[name].js'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};