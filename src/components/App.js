import { h, Component } from 'preact';
import { Router } from 'preact-router';
import './../styles/global.common';
import history from '~/core/history';

import HeaderBar from './HeaderBar';
import Home from '~/containers/Home';
import SecurityCode from '~/containers/SecurityCode';
import GetPhoto from '~/containers/GetPhoto';
import Voice from '~/containers/Voice';
import Infomation from '~/containers/Infomation';
import Preview from '~/containers/Preview';
import SView from '~/containers/View';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {name: 'xiehuiming'}
		};
	}
	getChildContext() {
		return {
			user: this.state.user
		};
	}
	render() {
		console.log(this.context);
		return (
			<div id="app"  >
				<HeaderBar />
				<Router history={history}>
					<Home path="/" />
					<SecurityCode path="/securitycode" />
					<GetPhoto path="/getphoto" />
					<Voice path="/voice" />
					<Infomation path="/infomation" />
					<Preview path="/preview" />
					<SView path="/view" />
				</Router>
			</div>
		);
	}
}
