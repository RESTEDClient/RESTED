module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    filename: "rested.js"
  },
  /* Note: Inline source maps are super slow in Firefox */
  devtool: 'source-map',
  eslint: {
    failOnWarning: false,
    failOnError: false
  },
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
        test: /\.js/,
        loader: 'babel-loader'
      }
    ]
  }
};

