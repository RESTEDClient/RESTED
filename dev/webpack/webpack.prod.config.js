const webpack = require('webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    filename: "rested.js"
  },
  eslint: {
    failOnWarning: false,
    failOnError: false
  },
  /* Note: Inline source maps are super slow in Firefox */
  devtool: 'source-map',
  // Compiler plugins. See https://github.com/webpack/docs/wiki/list-of-plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // Preformance optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      // Keep legible sources for the AMO reviewers
      mangle: false,
      beautify: true,
    })
  ],
  module: {
     preLoaders: [{
       test: /\.js$/,
       loader: 'eslint',
       exclude: /node_modules/,
    }],
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css",
      },
      {
        exclude: /node_modules/,
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  }
};

