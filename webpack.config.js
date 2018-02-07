const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'shabados'],
    app: path.resolve(__dirname, 'src', 'js', 'index.js'),
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