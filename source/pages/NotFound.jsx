import React, { Component, PureComponent } from 'react';

class NotFound extends PureComponent {

	render() {
		return (
			<div className="block-center fullscreen flex h-m v-m">
				<div className="text-center mb-xl">
					<div className="text-lg mb-lg">404</div>
					<p className="lead m0">We couldn't find this page.</p>
					<p>The page you are looking for does not exists.</p>
				</div>
			</div>
		);
	}

}

export default NotFound;