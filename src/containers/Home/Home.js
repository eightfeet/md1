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

	render() {
		const { item } = this.state;

		return (
			<div className="pdt2 al-c center w6">
				<div onClick={() => (history.push('./view'))}>测试</div>
				<ScrollLoading
					scrollToTop={<div style={{position: 'absolute', right: 0}}>'返回顶部'</div>}
					loadingHtml={<div className="al-c red">...</div>}
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
