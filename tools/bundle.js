/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import webpack from 'webpack';

/**
 * Creates application bundles from the source files.
 */
export const bundle = () => {
	return new Promise((resolve, reject) => {
		const config = require('./webpack.config');
		webpack(config).run((err, stats) => {
			if (err) {
				return reject(err);
			}

			console.info(stats.toString(config.stats));
			return resolve();
		});
	});
};
