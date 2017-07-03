import { h, Component } from 'preact';
import history from '~/core/history';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import MotionPage from '~/components/MotionPage';
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

	render() {
		const { item } = this.state;

		return (
			<div className="pdt2 al-c center w6" style={{height: '200rem'}}>
				<div onClick={() => (history.push('./view'))}>测试</div>
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
			</div>
		);
	}
}

export default MotionPage(Home);
