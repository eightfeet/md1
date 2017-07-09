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
				rotate: 45,
			},
			data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51]
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
		const { item, data } = this.state;

		return (
			<div className="pdt2 al-c center ww">
				<div onClick={() => (history.push('./view'))}>测试</div>
				<ScrollLoading
					handlePage={this.handlePage}
					scrollToTop
				>	{
						data.map((item) => (<p onClick={() => {window.alert(item)}} key={item} style={{height:'3rem'}}>list{item}</p>))
					}
				</ScrollLoading>
			</div>
		);
	}
}

export default MotionPage(Home);
