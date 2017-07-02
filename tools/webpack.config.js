/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from "path";
import colors from 'chalk';
import Config, { environment } from 'webpack-config';

/**
 * Paths
 */
export const BASE_PATH = path.resolve(__dirname, '../');
export const SOURCE_PATH = path.resolve(__dirname, '../source/');
export const BUILD_DEV_PATH = path.resolve(__dirname, '../public/');
export const BUILD_PROD_PATH = path.resolve(__dirname, '../production/');

const buildEnv = process.argv.includes('--production') ? 'production' : 'development';

environment.setAll({
	env: () => buildEnv,
});

const config = new Config().extend('./tools/config/[env].config.js');
console.info(`\n${colors.blue.bold('[CONFIG]')} ${colors.underline(`Start webpack with ${buildEnv}.config.js`)}\n`);

module.exports = config;