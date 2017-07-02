import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { AsyncComponentProvider } from 'react-async-component';
import { ConnectedRouter } from 'react-router-redux';
import Routes from "common/routes/Routes";
import store from 'common/store';
import history from 'common/history';

class Root extends Component {
	render() {
		return <AsyncComponentProvider>
				<Provider store={store}>
				<ConnectedRouter history={history}>
					<Routes />
				</ConnectedRouter>
			</Provider>
		</AsyncComponentProvider>
	}
}

export default Root;