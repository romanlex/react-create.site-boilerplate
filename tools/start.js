/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import webpack from 'webpack';
import WriteFilePlugin from 'write-file-webpack-plugin';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyFallback from 'connect-history-api-fallback';
import browserSync from 'browser-sync';
import WebpackDevServer from 'webpack-dev-server';
import { prepareUrls, prepareProxy, createCompiler } from 'react-dev-utils/WebpackDevServerUtils';
const pkg = require('../package.json');
import colors from 'chalk';

import clean from './clean';
import copy from './copy';
import run, { format } from './run';

const createDevServerConfig = require('./config/devServer.config');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST         = process.env.HOST || 'localhost';

async function start() {
	await run(clean);
	await run(copy);

	await new Promise((resolve, reject) => {
		let count = 0;
		const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
		const bs     = browserSync.create(pkg.name);
		const config   = require('./webpack.config.js');
		const urls     = prepareUrls(protocol, HOST, DEFAULT_PORT);

		config.plugins.push(new WriteFilePlugin({ log: false }));

		// Create a webpack compiler that is configured with custom messages.
		//const compiler = createCompiler(webpack, config, pkg.name, urls); // webpack dev server
		const compiler = webpack(config); // browser sync

		// Load proxy config
		const proxySetting = pkg.proxy;
		const proxyConfig  = prepareProxy(proxySetting, path.resolve(__dirname, '../../public/'));

		const serverConfig = createDevServerConfig(config, proxyConfig);

		const devMiddleware = webpackDevMiddleware(compiler, {
			publicPath: config.output.publicPath,
			noInfo: false,
			quiet: false,
			lazy: false,
			stats: config.stats,
			historyApiFallback: true,
		});

		// Webpack Dev server
		//const devServer = new WebpackDevServer(compiler, serverConfig);

		// Browser Sync
		compiler.plugin('done', (stats) => {
			 count += 1;
			if (count === 1) {
				bs.init({
					port: serverConfig.port || DEFAULT_PORT,
					host: HOST,
					ui: { port: Number(serverConfig.port || DEFAULT_PORT) + 1 },
					notify: false,
					open: false,
					https: serverConfig.https,
					// proxy: {
					// 	target: "http://dev-webqual.lo",
					// 	ws: true,
					// },
					logLevel: 'info',
					server: {
						baseDir: './public/',
						index: "index.html",
						middleware: [
							devMiddleware,
							webpackHotMiddleware(compiler, {
								path: '/__webpack_hmr'
							}),
							historyFallback(),
						],
					},
				}, (error, bs) => (error ? reject(error) : resolve(bs)));
			}
		});


		// const server = new WebpackDevServer(compiler, serverConfig);

		// Important part. Send down index.html for all requests
		// devServer.use('/', function (req, res) {
		// 	res.sendFile(path.resolve(__dirname, '../public/'));
		// });
		//
		// devServer.listen(serverConfig.port, HOST, (err, result) => {
		// 	if (err) {
		// 		return console.log(err);
		// 	}
		// 	const date = new Date();
		// 	const link = `http://${HOST}:${serverConfig.port}`;
		// 	console.log(`${colors.gray(`[${format(date)}]`)} ${colors.blue('Listening at')} ${colors.black.bold.underline(link)}`);
		// });

		['SIGINT', 'SIGTERM'].forEach(function (sig) {
			process.on(sig, function () {
				devServer.close();
				process.exit();
			});
		});
	});
}


export default start;