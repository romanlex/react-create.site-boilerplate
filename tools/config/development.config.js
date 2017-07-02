/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Config from 'webpack-config';
import path from 'path';
import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';

import pkg from '../../package.json';
import { SOURCE_PATH, BUILD_DEV_PATH, BUILD_PROD_PATH } from "../webpack.config";

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

const isDebug = !process.argv.includes('--production');
const useHMR    = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)

let plugins = [
	new WebpackMd5Hash(),
];

let babelConfig = {
	...pkg.babel,
	babelrc: false,
	cacheDirectory: useHMR,
	presets: pkg.babel.presets.map(x => x === 'latest' ? ['latest', { es2015: { "modules": false } }] : x),
};

let entries = [
	'index.js'
];

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
	babelConfig.plugins.unshift('react-hot-loader/babel');
	plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
	plugins.push(new webpack.HotModuleReplacementPlugin()); //Enable HMR
	plugins.push(new webpack.NamedModulesPlugin());
	plugins.push(new webpack.NoEmitOnErrorsPlugin());
	entries = [
		'react-hot-loader/patch',
		// Раскоментировать при использовании WebpackDevServer
		// `webpack-dev-server/client?http://${host}:${port}&reload=true`,
		// 'webpack/hot/only-dev-server',
		'webpack-hot-middleware/client?http://${host}:${port}&reload=true&path=/__webpack_hmr',
		...entries
	];
}

export default new Config().extend('./tools/config/base.config.js').merge({
    devtool: 'cheap-module-source-map',
	entry: entries,
	output: {
		path: BUILD_DEV_PATH,
		filename: 'js/[name].js?[hash]',
		chunkFilename: 'js/[id].js?[chunkhash]',
        pathinfo: true
    },
	plugins: plugins,
	module: {
    	rules: [
    		{
				test: /\.jsx?$/,
				exclude: /(node_modules|.git)/,
				options: babelConfig,
				loader: 'babel-loader',
			},
		]
	}
});


