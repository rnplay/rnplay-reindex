import {initContext} from './utils';
import superagent from 'superagent';

module.exports = function run(context, req, res) {
  initContext(context);
  let platform = req.headers['x-requested-with'] == 'com.android.browser' ? 'android' : 'ios';
  let baseUrl = `https://packagerexponent.rnplay.org/js/${context.data.urlToken}`;
  let urlToken = context.data.urlToken.split("?")[0];
  console.log(context.data.urlToken)
  let unsignedManifest = {
    id: `@rnplay/${urlToken}`,
    name: 'RNApp',
    appKey: 'main',
    version: "1.0.0",
    description: "An app on Playground",
    sdkVersion: "10.0.0",
    iconUrl: "https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png",
    packagerOpts: {
      dev: false,
      minify: false,
    },
    loading: {
      hideExponentText: false,
      iconUrl: "https://s3.amazonaws.com/exp-brand-assets/ExponentEmptyManifest_192.png"
    },
    xde: true,
    developer: {
      tool: 'rnplay'
    },
    bundleUrl: `${baseUrl}/index.${platform}.bundle?platform=${platform}&dev=false&strict=false&minify=false&hot=false&includeAssetFileHashes=true`
  };

  let signingPayload = {
    body: unsignedManifest
  };

  let signingOptions = {
    serverSecret: context.data.exponentSecret,
    appId: context.data.urlToken,
  };

  let uriEncodedOptions = encodeURIComponent(JSON.stringify(signingOptions));

  superagent
    .post(`https://exp.host/--/api/signPlaygroundManifest/${uriEncodedOptions}`)
    .send(signingPayload)
    .set('Accept', 'application/json')
    .end((err, response) => {
      res.writeHead(200, { 'Content-Type': 'application/json '});
      res.end(response.body.response);
    });
};
