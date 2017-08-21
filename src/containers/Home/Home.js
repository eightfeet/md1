import { h, Component } from 'preact';
import classNames from 'classnames';
import history from '~/core/history';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';
import sl from './styleb';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			item: {
				left: 10,
				color: 'red',
				rotate: 45
			},
			timeModal: false,
			times: 10
		};
	}

	handlePage = () => new Promise((resolve, reject) => {
		window.clearTimeout(this.timerDelay);
		this.timerDelay = window.setTimeout(() => {
			console.log(1);
			reject();
		}, 2000);
	});

	handleList = (e) => {
		e.preventDefault();
		history.push('list');
	}

	handleTime = (e) => {
		e.preventDefault();
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
		const { item } = this.state;

		return (
<<<<<<< HEAD
			<div className="pdt2 al-c center ww">
				<div onClick={() => (history.push('./view'))}>测试</div>
				<MyScroll>	{
						data.map((item) => (<p onClick={() => {window.alert(item);}} key={item} style={{height:'3rem'}}>list{item}</p>))
					}
				</MyScroll>
=======
			<div className={s.root}>
				<div className={s.view}>
					<img src={require('./show.jpg')} alt="" />
				</div>
				<div className={classNames(s.iconlayout, 'clearfix')}>
					<div className="fl w4 al-r">
						<a href="" onClick={this.handleList}>
							<i className={`icon_layers ${s.icon}`} />
						</a>
					</div>
					<div className="fr w4 al-l">
						<a href="" onClick={this.showTimeModal}>
							<i className={`icon_clock ${s.icon}`} />
						</a>
					</div>
				</div>
				<div className={classNames(s.bottombtn, 'mgt4')}>
					<div className="w8 center">
						<button className="btn">
							开&nbsp;&nbsp;始
						</button>
					</div>
				</div>
				<Modal
					contentLabel="time"
					isOpen={this.state.timeModal}
					onRequestClose={this.hideTimeModal}
				>
					<h3 className="al-c font-bigger pdt2 pdb2">
						设置速写时间
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
						<button className="btn font">
							确&nbsp;&nbsp;认
						</button>
					</div>
				</Modal>
>>>>>>> bffee7705f9e5bee82d9d18333aa58ed48558d5d
			</div>
		);
	}
}

export default MotionPage(Home);
