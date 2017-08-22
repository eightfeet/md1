import { h, Component } from 'preact';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { autoPlay } from 'react-swipeable-views-utils';
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
			time: 0,
			list: [],
			infomation: null,
			num: null
		};
		this.timer = null;
	}

	componentWillMount() {
		let time = parseInt(window.localStorage.getItem('selectedtime'), 0) || 2;
		const strList = window.localStorage.getItem('selected');
		try {
			this.setState({
				list: JSON.parse(strList)
			});
		} catch (error) {

		}
		this.setState({
			time
		});
		this.nextImg(0);
	}

	componentDidMount() {
		this.reSet(parseInt(window.localStorage.getItem('selectedtime'), 0) || 2);
	}

	componentWillUnmount() {
		window.clearInterval(this.timer);
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

		this.reSet(this.state.time);
	}

	render() {
		const { time, list, infomation, num } = this.state;
		if (num === 0) {
			window.clearInterval(this.timer);
		}
		return (
			<div className={s.view}>
				<div className={classNames(s.timer, num < 20 ? s.timerred : null)} ><span className="icon_clock pdr-2" />{infomation}</div>
				<AutoPlaySwipeableViews
					interval={ time * 60000 }
					onChangeIndex={this.handleChangeIndex}
				>
					{
						list.map(item =>
							(<div>
								<img className="shadow-bottom" src={item.imgUrl}
								style={{
									height:item.width > item.height ? 'auto':'100%',
									width:item.width > item.height ? '100%': 'auto'
								}} />
							</div>)
						)
					}
				</AutoPlaySwipeableViews>
			</div>
		);
	}
}

export default MotionPage(View);
