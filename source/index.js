import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/style.scss';
import { AppContainer } from 'react-hot-loader';
import FastClick from 'fastclick';
import injectTapEventPlugin from "react-tap-event-plugin";
import Root from "./containers/Root";
import store from 'common/store';

FastClick.attach(document.body);
// Fix mobile 300ms delay of tap
injectTapEventPlugin();

const domContainer = document.getElementById('app');
const renderApp = RootComponent => {
	ReactDOM.render(
		<AppContainer>
			<RootComponent />
		</AppContainer>,
		domContainer
	)
};

try {
	renderApp(Root);
} catch (error) {
	if (__DEVELOPMENT__) {
		throw error;
	}
	console.error(error);
}

// Hot Module Replacement (HMR)
if (__DEVELOPMENT__ && module.hot) {
	module.hot.accept([
		'./containers/Root',
	], () => {
		console.log('Accepting the updated module!');
		const newRoot = require('./containers/Root').default;
		renderApp(newRoot);
	});
	
	module.hot.accept('./reducers', () => {
		console.log('Accepting the updated reducer module!');
		store.replaceReducer(require('./reducers').default);
	});
}