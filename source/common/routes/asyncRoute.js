import React, { Component } from 'react';

const asyncRoute = (getComponent) => {
	return class AsyncRoute extends Component {
		static Component = null;
		state = { Component: AsyncRoute.Component };
		
		constructor(props) {
			super(props);
			this.state = {
				Component: AsyncRoute.Component
			};
		}
		componentWillMount() {
			if (!this.state.Component) {
				getComponent()
					.then(m => m.default)
					.then(Component => {
						AsyncRoute.Component = Component;
						this.setState({ Component });
					})
			}
		}
		render() {
			const { Component } = this.state;
			return Component ? <Component {...this.props} /> : null;
		}
	}
}

export default asyncRoute;