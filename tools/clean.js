/**
 * React CREAT.SITE Boilerplate
 *
 * Copyright © 2017
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { cleanDir } from './lib/fs';
const isDebug = !process.argv.includes('--production');

/**
 * Очистка директорий
 */
function clean() {
  let dir = 'public/*';
  if(!isDebug)
    dir = 'production/*';

  return Promise.all([
    cleanDir(dir, {
      nosort: true,
      dot: true,
    }),
  ]);
}

export default clean;
