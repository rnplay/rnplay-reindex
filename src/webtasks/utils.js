import Reindex from 'reindex-js';
import Random from 'randomatic';

let reindex = null;
let context = null;

export function initContext(newContext) {
  context = newContext;
  reindex = new Reindex(context.data.reindexUrl);
  reindex.setToken(context.data.reindexAdminToken);
}

export async function query(query, options = {viewer: true}) {
  let builtQuery = options.viewer ? `{viewer{${query}}}` : `{${query}}`;
  try {
    let result = await reindex.query(builtQuery);
    if (result.errors) {
      console.log(result.errors);
    } else {
      return options.viewer ? result.data.viewer : result.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function mutation(name, input, options = {}) {

  let inputName = name.charAt(0).toUpperCase() + name.slice(1);

  if (options.inputName) {
    inputName = options.inputName;
  }

  try {
    let result = await reindex.query(`
      mutation ($input: _${inputName}Input!) {
        ${name}(input: $input) {
          clientMutationId,
          ${name.match(/(add|remove)/) ? "" : "id"}
        }
      }
    `, {input: input});

    if (result.errors) {
      console.log(result.errors);
    } else {
      return result.data[name];
    }
  } catch (error) {
    console.log(error);
  }
}

export function generateRandomHash(length) {
  return Random('Aa0', length);
}
