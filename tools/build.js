/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import run from './run';
import clean from './clean';
import copy from './copy';
import { bundle } from './bundle';

async function build() {
	await run(clean);
	await run(copy);
	await run(bundle);
}

export default build;
