import { browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Route, Router, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Reindex from './Reindex';
import Main from './Main';
import NewApp from './NewApp';

import {REINDEX_TOKEN} from './config';

const AppQueries = {
  application: () => Relay.QL`query { applicationByUrlToken(urlToken: $applicationId) }`
};

Relay.injectNetworkLayer(Reindex.getRelayNetworkLayer());
Reindex.setToken(REINDEX_TOKEN);

ReactDOM.render((
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route path="/apps/new" component={NewApp} />
    <Route path="/apps/:applicationId" component={Main} queries={AppQueries} />
  </Router>
), document.getElementById('root'));
