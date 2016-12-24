const { resolve } = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const doNothing = () => {};

module.exports = {
  context: resolve(__dirname, '..', '..'),

  entry: "./src/index.js",

  output: {
    path: "./dist",
    filename: "rested.js"
  },

  /* Note: Inline source maps are super slow in Firefox */
  devtool: isProd ? 'source-map' : 'cheap-source-map',

  performance: { hints: false },

  // Compiler plugins. See https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        eslint: {
          failOnWarning: isProd,
          failOnError: isProd,
        }
      }
    }),
    isProd
      ? new webpack.optimize.UglifyJsPlugin({
        // Keep legible sources for the AMO reviewers
        mangle: false,
        beautify: true,
        compress: {
          warnings: false
        },
        output: {
          comments: false
        },
      })
      : doNothing,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${nodeEnv}"`,
    }),
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: resolve(__dirname, '..', '..', 'src'),
      },
      {
        test: /\.js/,
        include: resolve(__dirname, '..', '..', 'src'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isProd,
        }
      }
    ]
  }
}

