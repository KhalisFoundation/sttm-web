const webpack = require('webpack');
require('dotenv').config();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const path = require('path');
const API_URLS = require('./common/api-urls-constants.js');

const PRODUCTION = process.env.NODE_ENV === 'production';
const commonPlugins = [new ManifestPlugin()];

const plugins = PRODUCTION
  ? commonPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        npm_package_version: JSON.stringify(process.env.npm_package_version),
        AUDIO_API_PASS: JSON.stringify(process.env.REACT_APP_AUDIO_API_PASS),
        SP_API: JSON.stringify(process.env.SP_API)
      },
      PRODUCTION: JSON.stringify(true),
      API_URL: JSON.stringify(API_URLS.PRODUCTION),
      AMRIT_KEERTAN_API_URL: JSON.stringify(API_URLS.AMRIT_KEERTAN),
      AMRIT_KEERTAN_SHABADS_API_URL: JSON.stringify(API_URLS.AMRIT_KEERTAN_SHABADS),
      SYNC_API_URL: JSON.stringify(API_URLS.SYNC.PRODUCTION),
      BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      BANNERS_URL: JSON.stringify(API_URLS.BANNERS),
      CEREMONIES_URL: JSON.stringify(API_URLS.CEREMONIES),
      DOODLE_URL: JSON.stringify(API_URLS.DOODLE),
      WRITERS_API_URL: JSON.stringify(API_URLS.WRITERS),
      GURBANIBOT_URL: JSON.stringify(API_URLS.GURBANIBOT)
    })
  ])
  : commonPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        npm_package_version: JSON.stringify(process.env.npm_package_version),
        AUDIO_API_PASS: JSON.stringify(process.env.REACT_APP_AUDIO_API_PASS)
      },
      PRODUCTION: JSON.stringify(false),
      API_URL: JSON.stringify(API_URLS.DEVELOPMENT),
      SYNC_API_URL: JSON.stringify(API_URLS.SYNC.LOCAL),
      AMRIT_KEERTAN_API_URL: JSON.stringify(API_URLS.AMRIT_KEERTAN),
      AMRIT_KEERTAN_SHABADS_API_URL: JSON.stringify(API_URLS.AMRIT_KEERTAN_SHABADS),
      BANIS_API_URL: JSON.stringify(API_URLS.BANIS),
      BANNERS_URL: JSON.stringify(API_URLS.BANNERS),
      CEREMONIES_URL: JSON.stringify(API_URLS.CEREMONIES),
      DOODLE_URL: JSON.stringify(API_URLS.DOODLE),
      WRITERS_API_URL: JSON.stringify(API_URLS.WRITERS),
      GURBANIBOT_URL: JSON.stringify(API_URLS.GURBANIBOT)
    }),
    new CleanWebpackPlugin(),
  ]);

const app = path.resolve(__dirname, 'src', 'js', 'index.js');

module.exports = {
  mode: PRODUCTION ? 'production' : 'development',
  entry: {
    app,
  },
  output: {
    path: path.resolve(__dirname, 'public/assets', 'js'),
    chunkFilename: PRODUCTION ? 'chunks/[name]-[hash].js' : 'chunks/[name].js',
    filename: PRODUCTION ? '[name]-[hash].js' : '[name].js',
    publicPath: '/assets/js/',
  },
  devtool: PRODUCTION ? undefined : 'inline-source-map',
  plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
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
      {
        test: /\.less$/,
        loader: 'less-loader', // compiles Less to CSS
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ],
  },
};
