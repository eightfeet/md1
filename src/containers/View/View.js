import { h, Component } from 'preact';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { autoPlay } from 'react-swipeable-views-utils';
import Modal from '~/components/Modal';
import MotionPage from '~/components/MotionPage';
import history from '~/core/history';
import s from './style';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

let interval = 1000;

function arrivedTime(sec) {
	return new Date((new Date() / 1000 + 60 * sec) * 1000);
}

function ShowCountDown(arrivedTime) {
	let now = new Date();
	let endDate = arrivedTime;
	let leftTime = endDate.getTime() - now.getTime();
	let leftsecond = parseInt(leftTime / 1000, 0);
	let day1 = Math.floor(leftsecond / (60 * 60 * 24));
	let hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
	let minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
	let second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
	const result = ((hour >= 10 ? hour : '0' + hour) + ":" +
	(minute >= 10 ? minute : '0' + minute) +  ":" +
	(second >= 10 ? second : '0' + second));

	return result;
}

class View extends Component {
	constructor() {
		super();
		this.state = {
			list: [],
			infomation: null,
			num: null,
			timeModal: false,
			times: 0,
			error: null
		};
		this.timer = null;
	}

	componentWillMount() {
		console.log('做了什么！！！');
		let times = parseInt(window.localStorage.getItem('selectedtime'), 0) || 2;
		const strList = window.localStorage.getItem('selected') || [];
		try {
			this.setState({
				list: JSON.parse(strList),
				times
			}, () => {
				this.nextImg(0);
				this.setState({times});
				this.reSet(times);
			});
		} catch (error) {

		}
	}

	componentDidMount() {
		this.forceUpdate();
	}

	componentWillUnmount() {
		window.clearInterval(this.timer);
		window.localStorage.setItem('selectedtime', this.state.times);
	}

	showTimeModal = (e) => {
		e.preventDefault();
		this.setState({
			timeModal: true
		});
	}

	hideTimeModal = () => {
		this.setState({
			timeModal: false
		});
		window.localStorage.setItem('selectedtime', this.state.times);
	}

	nextImg = (index) => {
		const img = window.document.createElement('img');
		img.src = this.state.list[index].imgUrl;
		console.log('img.src', img.src);
	}

	reSet = (sec) => {
		console.log('重来了', sec);
		window.clearInterval(this.timer);
		const getTime = arrivedTime(sec);
		const _this = this;
		this.timer = window.setInterval(() => {
			_this.setState({
				infomation: ShowCountDown(getTime),
				num: parseInt(ShowCountDown(getTime).replace(/\:/g, ''), 0)
			});
		}, 1000);
	}

	handleChangeIndex = (e) => {
		if (e < (this.state.list.length - 1)) {
			this.nextImg(e + 1);
		} else {
			this.nextImg(0);
		}

		this.reSet(this.state.times);
	}

	handleList = (e) => {
		e.preventDefault();
		history.push('list/?backurl=view');
	}

	showTimeModal = (e) => {
		e.preventDefault();
		this.setState({
			timeModal: true
		});
	}

	hideTimeModal = () => {
		this.setState({
			timeModal: false
		});
		this.reSet(this.state.times);
	}

	onRequestClose = () => {
		console.log(0);
	}

	handleMinus = (e) => {
		e.preventDefault();
		this.setState({
			times: this.state.times > 1 ? this.state.times - 1 : 1
		});
	}

	handlePlus = (e) => {
		e.preventDefault();
		this.setState({
			times: this.state.times < 60 ? this.state.times + 1 : 60
		});
	}

	render() {
		const { times, list, infomation, num } = this.state;
		if (num === 0) {
			window.clearInterval(this.timer);
		}
		return (
			<div className={s.view}>
				<div
					className={classNames(s.timer, num < 20 ? s.timerred : null)}
					onClick={this.showTimeModal}
				><span className="icon_clock pdr-2" />{infomation}</div>
				<div onClick={this.handleList} className={s.pic}><i className="icon_layers" /></div>
				<AutoPlaySwipeableViews
					interval={ times * 60000 }
					onChangeIndex={this.handleChangeIndex}
					style={{width: '100%', height: '100%'}}
				>
					{
						list.map(item =>
							(<div>
								<img className="shadow-bottom" src={item.imgUrl} />
							</div>)
						)
					}
				</AutoPlaySwipeableViews>
				<Modal
					contentLabel="time"
					isOpen={this.state.timeModal}
					onRequestClose={this.hideTimeModal}
				>
					<h3 className="al-c font-bigger pdt2 pdb2">
						修改速写时间
					</h3>
					<div className={classNames(s.lh3, 'clearfix w9 center pdb3 formBox')}>
						<div className="fl w3 al-r">间隔时间：</div>
						<div className="w4-5 fl border">
							<div
								className="fl w3 al-c font-biggest"
								onClick={this.handleMinus}>
								<a href="">
									<i className="icon_minus" />
								</a>
							</div>
							<div className="fl w4">
								<input type="text" value={this.state.times} readOnly className="ww al-c" />
							</div>
							<div
								className="fl w3 al-c font-biggest"
								onClick={this.handlePlus}>
								<a href="">
									<i className="icon_plus" />
								</a>
							</div>
						</div>
						<div className="fl w2">
							&nbsp;&nbsp;分钟
						</div>
					</div>
					<div className="w9 center pdb1">
						<button className="btngreen font" onClick={this.hideTimeModal}>
							确&nbsp;&nbsp;认
						</button>
					</div>
				</Modal>
				<Modal
					contentLabel="time"
					isOpen={this.state.error}
					onRequestClose={this.closeError}
				>
					<h3 className="al-c font-bigger pdt2 pdb1">
						对不起
					</h3>
					<div className="al-c pdb2">{this.state.error}</div>
				</Modal>
			</div>
		);
	}
}

export default MotionPage(View);
