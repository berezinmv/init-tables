var config = require("./webpack.config");
var webpack = require("webpack");

config.devtool = undefined;
config.plugins = config.plugins || [];
config.plugins = config.plugins.concat([
	new webpack.optimize.OccurenceOrderPlugin(),
  	new webpack.optimize.DedupePlugin(),
  	new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: false}),
  	new webpack.DefinePlugin({
    'process.env': {
      'BROWSER': JSON.stringify(true),
      'NODE_ENV': JSON.stringify('production')
    }
  })
]);

module.exports = config;