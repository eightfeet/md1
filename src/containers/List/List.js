import { h, Component } from 'preact';
import classNames from 'classnames';
import history from '~/core/history';
import Modal from '~/components/Modal';
import Loading from '~/components/Loading';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';

const listpage = [
	{
		imgUrl: 'http://img5.imgtn.bdimg.com/it/u=2243701330,2386498511&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img1.imgtn.bdimg.com/it/u=3628947011,505585406&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1205296975,4286953648&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img4.imgtn.bdimg.com/it/u=975038807,749581031&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1861043010,2397656605&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img4.imgtn.bdimg.com/it/u=3680595641,4143353235&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img1.imgtn.bdimg.com/it/u=2372562168,3526692767&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img2.imgtn.bdimg.com/it/u=1245768616,3995611220&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img0.imgtn.bdimg.com/it/u=681383717,363372355&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img1.imgtn.bdimg.com/it/u=506262978,941851135&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img5.imgtn.bdimg.com/it/u=1552435254,2290838453&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img3.imgtn.bdimg.com/it/u=258966460,797303537&fm=26&gp=0.jpg'
	},
	{
		imgUrl: 'http://img4.imgtn.bdimg.com/it/u=3686337225,1366131359&fm=26&gp=0.jpg'
	}
];

let listHeight = 0;

class List extends Component {
	constructor() {
		super();
		this.state = {
			item: {
				left: 10,
				color: 'red',
				rotate: 45
			},
			list: []
		};
	}


	componentWillMount() {
		this.setState({
			list: this.state.list.concat(listpage).concat(listpage)
		});
	}

	handlePage = () => new Promise((resolve, reject) => {
		window.clearTimeout(this.timerDelay);
		this.timerDelay = window.setTimeout(() => {
			this.setState({
				list: this.state.list.concat(listpage)
			});
			resolve();
		}, 1000);
	});

	render() {
		const { item } = this.state;
		let p1 = 0, p2 = 0, p3 = 0;
		return (
			<div className="pdt2 al-c center w1">
				<div onClick={() => (history.push('./view'))}>测试</div>
				<ScrollLoading
					handlePage={this.handlePage}
					scrollToTop
					loadingHtml={<div />}
				>
					<div className="clearfix" style={{height: listHeight}}>
						{
							this.state.list.map((item, i) => {
								const img = window.document.createElement('img');
								img.src = item.imgUrl;
								const rate = img.width / (window.innerWidth/3);
								if (isNaN(rate)|| rate === 0) {
									return;
								}
								console.log(rate);
								const width = window.innerWidth/3;
								const height = img.height / rate;
								const pageInd = i + 1;
								const hp1 = p1, hp2 = p2, hp3 = p3;
								let left = 0, top = 0;

								if (pageInd % 3 === 2) {
									p1 = p1 + height;
									left = 0;
									top = hp1 + 3;
								}
								if (pageInd % 3 === 1) {
									p2 = p2 + height;
									left = width;
									top = hp2 + 3;
								}
								if (pageInd % 3 === 0) {
									p3 = p3 + height;
									left = width * 2;
									top = hp3 + 3;
								}

								listHeight = Math.max(p1, p2, p3) + 3;

								return (
									<div style={{ width, height, left, top}} className={s.imgbox}>
										<img src={img.src} alt="" />
									</div>
								);
							})
						}
					</div>
					<div className={s.jia} style={{top:listHeight}}>加载中...</div>
				</ScrollLoading>
			</div>
		);
	}
}

export default MotionPage(List);
