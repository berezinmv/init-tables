var CleanCss = require('less-plugin-clean-css');
var Autoprefix = require('less-plugin-autoprefix');

module.exports = {
	devtool: "source-map",
	entry: "./source/main.js",
	output: {
		filename: "app.js",
		path: "./public/js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/, 
				loader: "babel-loader"
			},
			{
          		test: /\.less$/,
          		loader: 'style-loader!css-loader!less-loader'
        	},
        	{
          		test: /\.css$/,
          		loader: 'style-loader!css-loader'
        	},
        	{
          		test: /\.jpg$/,
          		loader: 'file-loader'
        	},
        	{
          		test: /\.png$/,
          		loader: 'url-loader?mimetype=image/png'
        	},
        	{
          		test: /\.(eot|woff|woff2|ttf|svg)$/,
          		loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
        	},
        	{
          		test: /\.(eot|woff|woff2|ttf|svg)$/,
          		loader: 'file-loader'
        	}
		]
	},
	"resolve": {
		"extensions": [".js", ".jsx", ""]
	},
  lessLoader: {
      lessPlugins: [
        new CleanCss({advanced: true}),
        new Autoprefix(['last 3 versions'])
      ]
    }
}