import { browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Route, IndexRoute, Router, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Reindex from './Reindex';
import Main from './Components/Main';
import NewApp from './Components/NewApp';
import Home from './Components/Home';
import AuthService from './webtasks/authService';
import Config from './config';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import App from './Components/App';
import { syncHistoryWithStore } from 'react-router-redux';

const auth = new AuthService(Config.AUTH0_CLIENT_ID, Config.AUTH0_DOMAIN,{
	rememberLastLogin: false,
	callbackUrl: 'http://localhost:3000',autoclose:true,closable: true,
	auth:{
		redirectUrl:'http://localhost:3000',
		redirect:false,
	}
});


const AppQueries = {
  application: () => Relay.QL`query { applicationByUrlToken(urlToken: $applicationId) }`
};

export const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

Relay.injectNetworkLayer(Reindex.getRelayNetworkLayer());

ReactDOM.render((
  <Provider store = {store}>
  <Router history={browserHistory} render={applyRouterMiddleware(useRelay)} environment={Relay.Store}>
    <Route auth={auth} component={App}>
      <IndexRoute component = {Home} />
      <Route path="/" component={Home} />
      <Route path="/apps/new" component={NewApp} />
      <Route path="/apps/:applicationId" component={Main} queries={AppQueries} />
    </Route>
  </Router>
  </Provider>
), document.getElementById('root'));
