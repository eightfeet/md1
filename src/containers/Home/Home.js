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
			}
		};
	}

	handlePage = () => new Promise((resolve, reject) => {
		window.clearTimeout(this.timerDelay);
		this.timerDelay = window.setTimeout(() => {
			console.log(1);
			reject();
		}, 2000);
	});

	render() {
		const { item } = this.state;

		return (
			<div className="pdt2 al-c center w1">
				<div onClick={() => (history.push('./view'))}>测试</div>
				<ScrollLoading
					handlePage={this.handlePage}
					scrollToTop
				>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
					<p>怎么动？</p>
				</ScrollLoading>
			</div>
		);
	}
}

export default MotionPage(Home);
