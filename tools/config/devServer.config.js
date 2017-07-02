/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
//const errorOverlayMiddleware = require('react-error-overlay/middleware');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

module.exports = function (config, proxy) {
	return {
		disableHostCheck: !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
		// Enable HTTPS if the HTTPS environment variable is set to 'true'
    	https: protocol === 'https',
		host: host,
		port: port,
		hot: true,
		inline: true,
		historyApiFallback: true,
		compress: true,
		clientLogLevel: 'none',
		// It's a required option.
		publicPath: config.output.publicPath,
		contentBase: path.resolve(__dirname, '../../public/'),
		watchContentBase: true,
		watchOptions: {
			ignored: /node_modules/,
		},
		stats: {
			colors: true
		},
		proxy,
		setup(app) {
			// This lets us open files from the runtime error overlay.
			app.use(errorOverlayMiddleware());
		},
	};
};
