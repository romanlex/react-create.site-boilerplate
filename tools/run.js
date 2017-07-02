/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import colors from 'chalk';

export function format(time) {
	return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

function run(fn, options) {
	const task  = typeof fn.default === 'undefined' ? fn : fn.default;
	const start = new Date();
	const taskName = `${task.name}${options ? ` (${options})` : ''}`;
	console.log(
		`${colors.gray(`[${format(start)}]`)} ${colors.yellow('Starting')} ${colors.green.bold(taskName)}...`,
	);
	return task(options).then((resolution) => {
		const end  = new Date();
		const time = end.getTime() - start.getTime();
		const timeText = `${time} ms`;
		console.log(
			`${colors.gray(`[${format(end)}]`)} ${colors.yellow('Finished')} ${colors.magenta.bold(taskName)} after ${colors.cyan(timeText)}`
		);
		return resolution;
	});
}

if (require.main === module && process.argv.length > 2) {
	delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
	const module = require(`./${process.argv[2]}.js`).default; // eslint-disable-line import/no-dynamic-require
	run(module).catch((err) => {
		console.error(err.stack);
		process.exit(1);
	});
}

export default run;