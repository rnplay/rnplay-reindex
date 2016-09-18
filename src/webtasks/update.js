import db from '../Reindex';
import process from 'process';
import {spawn} from 'child_process';
import {compact} from 'lodash';
import {REINDEX_TOKEN, REINDEX_URL, WEBTASK_BASE_URL} from '../config';
import {reduce} from 'lodash';

db.setToken(REINDEX_TOKEN);

const TASKS = [
  {
    name: 'getNewApplicationToken',
    params: [],
  },
  {
    name: 'expManifest',
    params: [],
  },
  {
    name: 'updateApplication',
    params: [],
    reindexHook: {
      ids: {
        development: 'UmVpbmRleEhvb2s6NTdkZDZjMGE2YTdiN2YwMDAzMGQ1MjIw',
        production: null
      },
      types: {
        development: 'UmVpbmRleFR5cGU6NTcxZjg5Yjg3ODZhMGY2ZTQ4NDA5M2Qx',
        production: null
      },
      trigger: 'afterUpdate',
      fragment: '{ changedApplication { id, urlToken, body } }',
    }
  }
];

const env = process.env.RNPLAY_ENV;

TASKS.forEach((task) => {
  if (process.env.TASK && !task.name.includes(process.env.TASK)) {
    return;
  }

  let envTaskName = `${task.name}-${env}`;
  if (task.reindexHook) {
    if (task.reindexHook.ids[env]) {
      db.query(`
        mutation updateReindexHook {
          updateReindexHook(input: {
            id: "${task.reindexHook.ids[env]}",
            type: "${task.reindexHook.types[env]}",
            trigger: ${task.reindexHook.trigger},
            fragment: "${task.reindexHook.fragment}",
            url: "${WEBTASK_BASE_URL}/${envTaskName}",
            logLevel: error
          }) {
            id
          }
        }
      `).then((response) => {
        if (response.errors) {
          console.log(response.errors);
        } else {
          console.log(`Updated ${envTaskName} on Reindex`);
        }
      });
    } else {
      console.log(`Creating hook ${envTaskName}`);
      db.query(`
        mutation createReindexHook {
          createReindexHook(input: {
            type: "${task.reindexHook.types[env]}",
            trigger: ${task.reindexHook.trigger},
            fragment: "${task.reindexHook.fragment}",
            url: "${WEBTASK_BASE_URL}/${envTaskName}",
            logLevel: error
          }) {
            id
          }
        }
      `).then((response) => {
        console.log(response);
        console.log(`Created ${envTaskName}`);
      });
    }
  }

  let defaultParams = {
    reindexAdminToken: REINDEX_TOKEN,
    reindexUrl: REINDEX_URL,
    exponentSecret: process.env.EXPONENT_SECRET,
    env: env
  };

  let defaultParamArray = reduce(defaultParams, (result, value, key) => {
    result.push('-s');
    result.push(`${key}=${value}`);
    return result;
  }, []);

  let params = ['create', '--profile', 'rnplay-development', '--bundle', '--bundle-minify', (env == 'development' || process.env.WATCH) ? '--watch': null, '--name', `${envTaskName}`].concat(defaultParamArray).concat(task.params);
  let command = compact(params).concat(`src/webtasks/${task.name}.js`);
  console.log(command.join(" "));
  spawn('node_modules/.bin/wt', command, {stdio: 'inherit'});

});
