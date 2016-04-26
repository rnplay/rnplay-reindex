import {spawnSync} from 'child_process';
import process from 'process';

import {REINDEX_URL, REINDEX_TOKEN} from '../src/config.js';

let command = `node_modules/.bin/reindex -u ${REINDEX_URL} -t ${REINDEX_TOKEN} ${process.argv[2]} data/schema.json`;
console.log(command)
spawnSync('node', command.split(" "), {stdio: 'inherit'})
