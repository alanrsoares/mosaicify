/* global __dirname module require */
var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');

var paths = {
  bower: path.resolve(__dirname, '..', 'bower_components'),
  nodeModules: path.resolve(__dirname, '..', 'node_modules'),
  context: path.resolve(__dirname, '..', 'src'),
  output: path.resolve(__dirname, '..', 'dist')
};

var babelExcludes = /(react).js/;

var config = {
  addVendor: function (name, p) {
    // this could use `name` to create aliases
    this.module.noParse.push(new RegExp(p));
  },
  context: paths.context,
  entry: './app.js',
  output: {
    path: paths.output,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new BowerWebpackPlugin()
  ],
  module: {
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: babelExcludes }
    ]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'bower_components',
      'src'
    ]
  }
};

config.addVendor('react', paths.bower + '/react/react.js');
config.addVendor('alt', paths.bower + '/alt/dist/alt.js');
config.addVendor('babel-core/polyfill', paths.nodeModules + '/babel-core/browser-polyfill.js');

module.exports = config;
