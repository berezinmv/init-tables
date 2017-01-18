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
				test: /\.jsx?/, loader: "babel"
			}
		]
	}
}