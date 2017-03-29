const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src', 'js', 'index.js'),
    vendor: ['jquery', 'khajana', 'foundation'],
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'js'),
    filename: '[name].[hash].min.js'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}
