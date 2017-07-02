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
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";
import { SOURCE_PATH, BASE_PATH, BUILD_DEV_PATH, BUILD_PROD_PATH } from "../webpack.config";

const isDebug = !process.argv.includes('--production');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR    = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
const bailOutput = process.argv.includes('--show-stacktrace');

/**
 * Paths
 */
const IMAGE_BUILD_PATH = `images`;
const FONTS_BUILD_PATH = `fonts`;
const CSS_BUILD_PATH = `css`;

// Webpack stats
export const stats = {
	assets: true,
	children: false,
	modules: false,
	publicPath: false,
	warnings: true,
	colors: true,
	reasons: isDebug,
	hash: isVerbose,
	version: isVerbose,
	timings: true,
	chunks: isVerbose,
	chunkModules: isVerbose,
	cached: isVerbose,
	cachedAssets: isVerbose,
};

export default new Config().merge({
	context: SOURCE_PATH,
	resolve: {
		modules: [SOURCE_PATH, `${BASE_PATH}/node_modules`, `${BASE_PATH}/bower_components`],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss', 'jpg', 'png', 'svg'],
		descriptionFiles: ["package.json", "bower.json"],
		mainFields: ["browser", "module", "main"],
		mainFiles: ["index"],
		//aliasFields: ["browser"],
		alias: {
			jquery: `${BASE_PATH}/bower_components/jquery/dist/jquery.js`,
			moment: `${BASE_PATH}/bower_components/moment/moment.js`,
			md: `${BASE_PATH}/bower_components/mobile-detect/mobile-detect.min.js`,
			Storages: `${BASE_PATH}/bower_components/js-storage/js.storage.js`,
			swal: `${BASE_PATH}/bower_components/sweetalert2/dist/sweetalert2.js`,
			sortable: `${BASE_PATH}/bower_components/Sortable/Sortable.js`,
		}
	},
	output: {
		publicPath: '/',
	},
	// Options affecting the normal modules
	module: {
		noParse: [ /socket.io-client/ ],
		rules: [
			{
				test: /\.ejs$/,
				use: [{
					loader: 'webpack2-ejs-render-loader',
					options: {
						url: '/',
					}
				},
					{
						loader: 'raw-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							sourceMap: isDebug,
							importLoaders: 2,
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: isDebug,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: isDebug,
							config: {
								path: `${BASE_PATH}/tools/postcss.config.js`
							}
						}
					}]
				}),
			},
			{
				test: /\.(scss|sass)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
						loader: "css-loader",
						options: {
							minimize: !isDebug,
							sourceMap: isDebug,
							//modules: true,
							//localIdentName: '[path]__[name]__[local]___[hash:base64:5]',
							importLoaders: 3,
						}
					}, {
						loader: 'postcss-loader',
						options: {
							sourceMap: isDebug,
							config: {
								path: `${BASE_PATH}/tools/postcss.config.js`
							}
						},
					}, {
						loader: 'resolve-url-loader',
						options: {
							sourceMap: isDebug,
						},
					}, {
						loader: "sass-loader",
						options: {
							sourceMap: isDebug,
							outputStyle: 'expanded',
						}
					}]
				})
			},
			{
				test: /\.(woff(2)?)(\?[a-z0-9]+)?$/,
				use: [{
					loader: 'url-loader',
					options: {
						mimetype: 'application/font-woff',
						name: `${FONTS_BUILD_PATH}/[name].[ext]`,
						limit: 65000
					}
				}]
			},
			{
				test: /\.(ttf|otf|eot|svg?)(\?[a-z0-9]+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: `${FONTS_BUILD_PATH}/[name].[ext]`,
						limit: 65000
					}
				}]
			},
			{
				test: /\.(png|jpg?g|gif)$/,
				//exclude: /(node_modules|.git)/,
				use: [{
					loader: 'file-loader',
					query: {
						name: `${IMAGE_BUILD_PATH}/[name].[ext]`
					}
				}]
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: 'env',
			__DEVELOPMENT__: isDebug
		}),
		new webpack.LoaderOptionsPlugin({
			debug: false,
			options: {
				context: '/',
			},
		}),
		new HtmlWebpackPlugin({
			template: `${SOURCE_PATH}/index.ejs`,
			baseUrl: '/',
			filename: 'index.html'
		}),
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer'
		}),
		new ExtractTextPlugin({
			filename: `${CSS_BUILD_PATH}/${isDebug ? '[name].css?[hash]' : '[name].[hash:8].css?'}`,
			allChunks: false,
			disable: false
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
		}),
	],
	
	bail: bailOutput,
	cache: isDebug,
	// What information should be printed to the console
	stats: stats,
});



