import React, { Component, PureComponent } from 'react';
import {
	Route,
	Switch
} from 'react-router-dom';

import NotFound from "pages/NotFound";
import HomePage from "pages/HomePage";
import Departments from "pages/Departments/Departments";
import Employees from "pages/Employees/Employees";

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" name="Home" component={HomePage} />
				<Route exact path="/departments" name="Departments" component={Departments}/>
				<Route exact path="/employees" name="Employees" component={Employees}/>
				<Route component={NotFound}/>
			</Switch>
		);
	}
}

export default Routes;