const { resolve } = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const rootDir = resolve(__dirname);

const doNothing = () => {};

module.exports = {
  context: rootDir,

  entry: [
    'babel-polyfill',
    './src/index.js',
  ],

  output: {
    path: rootDir + '/dist',
    filename: 'rested.js',
  },

  performance: { hints: false },

  // Compiler plugins. See https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: !isProd,
      options: {
        eslint: {
          failOnWarning: isProd,
          failOnError: isProd,
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
    }),
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: resolve(rootDir, 'src'),
        options: {
          cache: false,
        }
      },
      {
        test: /\.js/,
        include: resolve(rootDir, 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isProd,
        }
      }
    ]
  },

  resolve: {
    modules: [
      resolve(rootDir, 'src'),
      'node_modules',
    ],
  }
}

