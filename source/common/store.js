import {createStore, applyMiddleware } from 'redux';
import history from './history';
import reducer from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

const routingMiddleware = routerMiddleware(history);

const enhancerWithDevTools = composeWithDevTools(
	applyMiddleware(thunk, routingMiddleware)
);

const store = createStore(reducer, enhancerWithDevTools);
export default store;
