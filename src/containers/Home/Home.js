import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import history from '~/core/history';
import { setRuntimeVariable } from '~/actions/user';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';
import sl from './styleb';

Loading.show();
window.onload = function() {
	Loading.hide();
};

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
			times: 0,
			error: null
		};
	}


	componentWillMount() {
		this.props.setStore({name:'year', value: 1983});
		let times = parseInt(window.localStorage.getItem('selectedtime'), 0) || 1;
		this.setState({
			times
		});
	}

	componentDidMount() {
	}


	componentWillUnmount() {
		window.localStorage.setItem('selectedtime', this.state.times);
	}


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
		this.setState({
			timeModal: false
		});
	}

	handleMinus = (e) => {
		console.log(this.props.year);
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

	onStart = () => {
		let selected;
		try {
			selected = JSON.parse(window.localStorage.getItem('selected')) || [];
		} catch (error) {
			selected = [];
		}
		if (selected.length <= 0) {
			this.setState({
				error: '您还没选择图片！'
			});
			return;
		}
		if (this.state.times <= 0) {
			this.setState({
				error: '老杆子，稳！但建议还是大于1分钟吧！'
			});
			return;
		}
		window.localStorage.setItem('selectedtime', this.state.times);
		history.push('/view');
	}

	closeError = () => {
		this.setState({
			error: null
		});
	}

	render() {
		const { item } = this.state;
		return (
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
						<button className="btn" onClick={this.onStart}>
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

export default connect(mapStateToProps, mapDispatchToProps)(MotionPage(Home));
