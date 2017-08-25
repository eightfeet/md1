import { h, Component } from 'preact';
import { Router } from 'preact-router';

import './../styles/global.common';
import history from '~/core/history';

import HeaderBar from './HeaderBar';
import Home from '~/containers/Home';
import List from '~/containers/List';
import SView from '~/containers/View';

import {wechatInfo} from '~/config';
import wechat, {share} from '~/utils/wechat';
import Request from '~/core/request';
import {connect} from 'preact-redux';
const url = window.location.href.split('#');

class App extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div id="app"  >
				<Router history={history}>
					<Home path="/" />
					<List path="/list" />
					<SView path="/view" />
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
