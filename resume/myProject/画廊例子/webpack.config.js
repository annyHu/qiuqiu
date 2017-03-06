var path = require('path');

module.exports = {
	entry: './src/index.jsx',
	output: {
		path: './dist/',
		filename: 'app.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [{
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader']
		}, {
			test: /\.jsx$/,
			loaders: ['babel-loader?presets[]=es2015&presets[]=react']
		}, {
			test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.json$/,
			loaders: ['json-loader']
		}]
	},
	devServer: {
		//配置服务器的更目录
		contentBase: './src',
		port: 3000
	},
	resolve: {
		extentions: ['', '.js', '.jsx', '.css']
	}
}