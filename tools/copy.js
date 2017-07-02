/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from './lib/fs';
import pkg from '../package.json';
import { format } from './run';
const isDebug = !process.argv.includes('--production');
import colors from 'chalk';

/**
 * Копирование статичных файлов
 */
async function copy() {
	let dir = 'public';
	if (!isDebug)
		dir = 'production';

	await makeDir(dir);

	await Promise.all([
		copyDir('source/static', `${dir}`),
	]);

	if (process.argv.includes('--watch')) {
		const watcher = chokidar.watch([
			`source/static/**/*`,
		], { ignoreInitial: true });

		watcher.on('all', async (event, filePath) => {
			const start = new Date();
			const src   = path.relative('./', filePath);
			const dist  = path.join(`${dir}/`, src.startsWith('source') ? path.relative('source', src) : src);
			switch (event) {
				case 'add':
				case 'change':
					await makeDir(path.dirname(dist));
					await copyFile(filePath, dist);
					break;
				case 'unlink':
				case 'unlinkDir':
					cleanDir(dist, { nosort: true, dot: true });
					break;
				default:
					return;
			}
			const end  = new Date();
			const time = end.getTime() - start.getTime();
			const timeText = `${time} ms`;
			const eventName =  event.charAt(0).toUpperCase() + event.slice(1);
			console.log(`${colors.gray(`[${format(end)}]`)} ${colors.yellow(eventName)} '${dist}' after ${colors.cyan(timeText)}`);
		});
	}
}

export default copy;
