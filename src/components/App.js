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
	render() {
		console.log(history);
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
