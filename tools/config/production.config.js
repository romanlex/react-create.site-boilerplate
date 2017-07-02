/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Config from 'webpack-config';
import webpack from 'webpack';
import ManifestPlugin from 'webpack-manifest-plugin';

import pkg from '../../package.json';
import { SOURCE_PATH, BUILD_PROD_PATH } from "../webpack.config";

export default new Config().extend({
	'./tools/config/development.config.js': config => {
		delete config.entry;
		delete config.devtool;
		delete config.output.pathinfo;

		return config;
	}
}).merge({
	entry: {
		vendor: 'vendor.js',
		app: 'index.js'
	},
	output: {
		path: BUILD_PROD_PATH,
		filename: 'js/[name].[chunkhash:8].js', // использовать *chunkhash* для корректной поддержки MD5 hash plugin
		chunkFilename: 'js/[id].[chunkhash:8].js',
    },
	plugins: [
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
		}),
		new webpack.optimize.OccurrenceOrderPlugin(true),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: ({ resource }) => /(node_modules|bower_components)/.test(resource),
		}),
		//new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			beautify: false,
			comments: false,
			compress: {
				sequences: true,
				booleans: true,
				loops: true,
				unused: true,
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		}),
	]
});


