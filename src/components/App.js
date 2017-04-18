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

import {wechatInfo} from '~/config';
import wechat, {share} from '~/utils/wechat';
import Request from '~/core/request';
import {connect} from 'preact-redux';
const url = window.location.href.split('#');

class App extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const {appId, title, link, imgUrl, desc} = wechatInfo;
		Request.post(
			'common/auth/JsSdkAuth.do',
			// 'http://wx-test.by-health.com/common/auth/JsSdkAuth.do',
			{
				appId: 'wxb425b33623e260d4',
				url: url[0]
			}).then((res) => {
				console.log(res);
				const {appId, timestamp, nonceStr, signature} = res;
				wechat({
					debug: false,
					appId,
					timestamp,
					nonceStr,
					signature,
					jsApiList:['startRecord', 'stopRecord', 'playVoice', 'translateVoice', 'scanQRCode', 'showAllNonBaseMenuItem']
				}).then(() => {
					console.log(window.wx);
					share(
						{
							title,
							link,
							imgUrl,
							desc
						},
						()=>{console.log('success');}
					);
				});
			}).catch((error) => {
				throw new Error(JSON.stringify(error));
			});
	}
	render() {
		console.log(this.props);
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

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);
