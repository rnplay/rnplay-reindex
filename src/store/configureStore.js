import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const logger = createLogger();
const router = routerMiddleware(browserHistory);
const createStoreWithMiddleware = applyMiddleware(thunk, router, logger)(createStore);


export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState);
}