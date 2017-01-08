const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  entry: './src/main',
  output: {
    path: __dirname,
    filename: 'main.bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production'
    ? [
      new webpack.optimize.UglifyJsPlugin()
    ]
    : []
}
