import superagent from 'superagent-bluebird-promise';
import {WEBTASK_BASE_URL} from './config';

export default async function webtask(name, params = {}) {
  return superagent.post(`${WEBTASK_BASE_URL}/${name}-${process.env.NODE_ENV}`)
    .send(params);
}
