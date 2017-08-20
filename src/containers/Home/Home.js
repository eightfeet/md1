import { h, Component } from 'preact';
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
			timeModal: false
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

	render() {
		const { item } = this.state;

		return (
			<div className={s.root}>
				<div className={s.view}>
					<img src={require('./show.jpg')} alt="" />
				</div>
				<div className="clearfix">
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
				<div className="w8 center mgt4">
					<div className="btn">
						开&nbsp;&nbsp;始
					</div>
				</div>
				<Modal
					contentLabel="time"
					isOpen={this.state.timeModal}
					onRequestClose={this.hideTimeModal}
				>
				</Modal>
			</div>
		);
	}
}

export default MotionPage(Home);
