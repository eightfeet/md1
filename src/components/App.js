import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';

import './../styles/global.common';
import history from '~/core/history';
import { setRuntimeVariable } from '~/actions/user';

import HeaderBar from './HeaderBar';
import Home from '~/containers/Home';
import List from '~/containers/List';
import SView from '~/containers/View';

import {wechatInfo} from '~/config';
import wechat, {share} from '~/utils/wechat';
import Request from '~/core/request';
const url = window.location.href.split('#');

class App extends Component {
	constructor() {
		super();
	}

	componentWillMount() {
		this.initLocHistoryData();
	}

	initLocHistoryData = () => {
		const {
			setStore,
			time,
			selected
		} = this.props;
		let operationSelected;
		let operationTime;
		try {
			operationSelected = JSON.parse(window.localStorage.getItem('selected')) || [];
			operationTime = parseInt(window.localStorage.getItem('time'), 0) || 2;
		} catch (error) {
			console.log('页面没有历史选择');
		}
		console.log(operationSelected);
		setStore({
			name: 'time',
			value: operationTime
		});
		setStore({
			name: 'selected',
			value: operationSelected
		});
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


function mapDispatchToProps(dispatch){
	return bindActionCreators({ setStore: setRuntimeVariable}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
