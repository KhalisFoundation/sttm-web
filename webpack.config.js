const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const path = require('path');

const API_URLS = {
  BANIS: '//api.banidb.com/v2/banis',
  PRODUCTION: '//api.banidb.com/v2/',
  DEVELOPMENT: '//api.banidb.com/v2/',
  SYNC: {
    PRODUCTION: '//api.sikhitothemax.org/',
    LOCAL: '//api.sikhitothemax.org/',
  },
};

const PRODUCTION = process.env.NODE_ENV === 'production';

const commonPlugins = [new ManifestPlugin()];

const plugins = PRODUCTION
  ? commonPlugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          npm_package_version: JSON.stringify(process.env.npm_package_version),
        },
        PRODUCTION: JSON.stringify(true),
        API_URL: JSON.stringify(API_URLS.PRODUCTION),
        SYNC_API_URL: JSON.stringify(API_URLS.SYNC.PRODUCTION),
        BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      }),
    ])
  : commonPlugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          npm_package_version: JSON.stringify(process.env.npm_package_version),
        },
        PRODUCTION: JSON.stringify(false),
        API_URL: JSON.stringify(API_URLS.PRODUCTION),
        SYNC_API_URL: JSON.stringify(API_URLS.SYNC.LOCAL),
        BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      }),
    ]);

const app = path.resolve(__dirname, 'src', 'js', 'index.js');

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    app,
  },
  output: {
    path: path.resolve(__dirname, 'public/assets', 'js'),
    chunkFilename: 'chunks/[name]-[hash].js',
    filename: '[name]-[hash].js',
    publicPath: '/assets/js/',
  },
  devtool: PRODUCTION ? undefined : 'inline-source-map',
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      // Client root
      '@': path.resolve(__dirname, 'src/js/'),
    },
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [new TerserPlugin()],
    concatenateModules: true,
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
        test: /\.(tsx?)|(js)$/,
        loader: 'babel-loader',
      },
    ],
  },
};
