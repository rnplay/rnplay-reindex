import { browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Route } from 'react-router';
import { RelayRouter } from 'react-router-relay';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from './utils/redux/promiseMiddleware';
import createLogger from 'redux-logger';
import * as reducers from './reducers/';
import { editor } from './actions/';
import Reindex from './Reindex';

Relay.injectNetworkLayer(Reindex.getRelayNetworkLayer());

let reduxMiddlewares = [thunk, promise];

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger');
  const logger = createLogger();
  reduxMiddlewares.push(logger);
}

const reducer = combineReducers(reducers);
const store = applyMiddleware(...reduxMiddlewares)(createStore)(reducer);

ReactDOM.render((
  <Provider store={store}>
    <h1>RNPlay Reindex</h1>
  </Provider>
), document.getElementById('root'));
