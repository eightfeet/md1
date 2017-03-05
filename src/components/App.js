import { h, Component } from 'preact';
import { Router } from 'preact-router';
import './../styles/global.common';
import { createHashHistory } from 'history';
const history = createHashHistory();

import HeaderBar from './HeaderBar';
import Home from './Home';
import Profile from './Profile';
import About from './About';

export default class App extends Component {
	render() {
		return (
			<div id="app"  >
				<HeaderBar />
				<Router history={history}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
					<About path="/about" />
				</Router>
			</div>
		);
	}
}
