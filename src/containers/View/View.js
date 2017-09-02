import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';
import { autoPlay, bindKeyboard } from 'react-swipeable-views-utils';
import { setRuntimeVariable } from '~/actions/user';
import Modal from '~/components/Modal';
import MotionPage from '~/components/MotionPage';
import history from '~/core/history';
import s from './style';

const AutoPlaySwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

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
			error: null,
			showGuide: false,
			current: 1
		};
		this.timer = null;
		this.timerout = null;
	}

	componentWillMount() {
		const {
			sourceList,
			selected,
			currentdata,
			time
		} = this.props;

		this.nextImg(0);
		this.reSet(time);
	}

	componentDidMount() {
		if (this.props.selected.length === 0) {
			this.setState({
				error: '您还没请选择图片'
			});
		}

		if (this.isBrowser) {
			this.setState({
				showGuide: true
			}, () => {
				this.timerout = setTimeout(() => {
					this.setState({showGuide: false});
				}, 2000);
			});

		}



	}

	componentWillUnmount() {
		window.clearInterval(this.timer);
	}

	// isB

	isBrowser = () => {
		if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
			return false;
		}
		return true;
	}

	// 显示时间设置
	showTimeModal = (e) => {
		e.preventDefault();
		this.setState({
			timeModal: true
		});
	}

	// 隐藏时间
	hideTimeModal = () => {

	}

	// 存储时间到本地
	saveTime = () => {
		window.localStorage.setItem('selectedtime', this.props.time);
	}

	// 用来预先加载下一张图片
	nextImg = (index) => {
		try {
			const img = window.document.createElement('img');
			img.src = `./assets/models/${this.state.list[index].imgUrl}`;
		} catch (error) {
			console.log('img.src', error);
		}
	}

	// 重制倒计时
	reSet = (sec) => {
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

	// 图片切换操作
	handleChangeIndex = (e) => {
		const {
			time,
			selected
		} = this.props;
		if (e < (selected.length - 1)) {
			this.nextImg(e + 1);
		} else {
			this.nextImg(0);
		}
		this.setState({
			current: e + 1
		}, () => {
			// 重置时间数据
			this.reSet(time);
		});
	}

	// 去列表页选择图片
	handleList = (e) => {
		e.preventDefault();
		history.push('list');
	}

	showTimeModal = (e) => {
		e.preventDefault();
		this.setState({
			timeModal: true
		});
	}

	hideTimeModal = () => {
		const {time} = this.props;
		this.setState({
			timeModal: false
		});
		this.reSet(time);
		// 缓存时间数据到浏览器
		window.localStorage.setItem('time', time);
	}

	// 加时间
	handleMinus = (e) => {
		e.preventDefault();
		this.props.setStore({
			name: 'time',
			value: this.props.time > 1 ? this.props.time - 1 : 1
		});
	}

	// 减时间
	handlePlus = (e) => {
		e.preventDefault();
		this.props.setStore({
			name: 'time',
			value: this.props.time < 60 ? this.props.time + 1 : 60
		});
	}

	closeError = () => {
		history.push('list');
	}

	render() {
		const {
			setStore,
			time,
			selected,
			sourceList,
			currentdata
		} = this.props;
		const { times, list, infomation, num, showGuide } = this.state;
		if (num === 0) {
			window.clearInterval(this.timer);
		}
		return (
			<div className={s.view} style={{border: 'none'}}>
				<div
					className={classNames(s.timer, num < 20 ? s.timerred : null)}
					onClick={this.showTimeModal}
				>
					<span className="icon_clock pdr-2" />{infomation}
				</div>
				<div onClick={this.handleList} className={s.pic}>
					<i className="icon_layers" />
				</div>
				<div onClick={() => {history.push('/');}} className={s.backhome}>
					<i className="icon_home" />
				</div>
				<span
					className={s.index}
				>
					{`${this.state.current}/${selected.length}`}
				</span>
				{showGuide ? <div
					style={{
						border: '1px solid #fff',
						width: '160px',
						position: 'absolute',
						left: '50%',
						zIndex: '1000',
						marginLeft: '-80px',
						color: '#fff',
						backgroundColor: 'rgba(0, 1, 0, 0.5)',
						padding: '20px',
						borderRadius: '10px',
						top: '10px'
					}}
					className={s.keyboard}>
					键盘&nbsp;&nbsp;<span className="icon_arrow_left" />左&nbsp;&nbsp;<span className="icon_arrow_right" />右&nbsp;&nbsp;键<br/>切换图片
				</div> : null}
				<AutoPlaySwipeableViews
					interval={ time * 60000 }
					onChangeIndex={this.handleChangeIndex}
					style={{width: '100%', height: '100%'}}
					animateTransitions
				>
					{
						selected.map((item, index) => {
							const {isX, isY, imgUrl} = item;
							const W = parseInt(imgUrl.split('&')[1], 0);
							const H = parseInt(imgUrl.split('&')[2], 0);
							const rate = W/H;
							const WW = window.innerWidth;
							const WH = window.innerHeight;
							const ScaleW = W/H*WH;
							const ScaleH = H/W*WW;
							const viewportH = WH < WW;
							const conditionA = viewportH && isY; // 横屏且竖图
							const conditionB = !viewportH && H < WH; // 竖屏且图片高度大于屏幕高度

							let Width;
							let Height;
							if (ScaleW >= WW) {
								Width = 'auto';
								Height = ScaleH;
							}

							if (ScaleH >= WH) {
								Width = ScaleW;
								Height = 'auto';
							}

							return (<div>
								<img
									className="shadow-bottom"
									style={{
										width: Width,
										height: Height,
										background: 'url("./assets/loading.svg") center',
										backgroundSize: '2rem 2rem',
										backgroundRepeat: 'no-repeat'
									}}
									src={`./assets/models/${item.imgUrl}`} />
							</div>);
						})
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
								<input type="text" value={time} readOnly className="ww al-c" />
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
					isOpen={!!this.state.error}
					onRequestClose={this.closeError}
				>
					<h3 className="al-c font-bigger pdt2 pdb1">
						对不起
					</h3>
					<div className="al-c pdb2">{this.state.error}</div>
					<div className="w9 center pdb1">
						<button className="btngreen font" onClick={this.closeError}>
							去选择
						</button>
					</div>
				</Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MotionPage(View));
