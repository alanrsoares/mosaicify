/* global __dirname module require */
var path = require('path');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var config = require('./webpack.config.release');

var paths = {
  output: path.resolve(__dirname, '..', 'build')
};

config.devtool = '#inline-source-map';
config.output.path = paths.output;
config.module.preLoaders = [{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  loader: 'eslint-loader'
}];
config.eslint = {
  configFile: '.eslintrc',
  quiet: false
};
config.plugins = [
  new BowerWebpackPlugin()
];

module.exports = config;
