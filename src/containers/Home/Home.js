import { h, Component } from 'preact';
import validate, { VPhone, VName, VSecurityCode, VEnglish } from '~/utils/validate';
import { FStringPrivacy, FTimeStamp } from '~/utils/fliter';
import wechat, {share} from '~/utils/wechat';
import history from '~/core/history';
import Request from '~/core/request';
import s from './style';
import sb from './styleb';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
		};
	}

	componentDidMount() {
		wechat({
			debug: false,
			appId:'wx2f995336548675b4',
			timestamp:'1489029986',
			nonceStr:'a360855d-eb0e-44ee-9ea6-456d672badb8',
			signature:'ce8715c4d5980383d3628f59f5222be8b0b3b369',
			jsApiList:[
				'uploadImage'
			]
		}).then(() => {
			console.log(window.wx);
			share('分享页面');
		});
	}

	test = () => {
		Request.post(
			'/firstactivity/activity/getProsperity.do',
			{
				actId: 1,
				page: 20
			}).then((res) => {
				console.log(res);
			});

		console.log(history);
		history.push('securitycode');
	}

	render() {
		return (
			<div className="pdt5 al-c center w6">
				<button
					className={`${s.root} ${sb.root} bg-red-dark w8 pd1 font mgb1`}
					onClick={this.test}>发贺卡</button><br />
				<button
					className={`${s.root} ${sb.root} bg-green w8 pd1 font`}
					onClick={this.test}>收贺卡</button><br />
			</div>
		);
	}
}
