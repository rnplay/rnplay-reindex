import {initContext} from './utils';

async function run(context, cb) {

  initContext(context);

  let application = context.data.data.hook.changedApplication;

  try {

    console.log(application);

  } catch(error) {
    console.log(error);
    cb(error);
  }
};

module.exports = run;
