import { h, Component } from 'preact';
import classNames from 'classnames';
import queryString from 'query-string';
import history from '~/core/history';
import Modal from '~/components/Modal';
import HeaderBar from '~/components/HeaderBar';
import Loading from '~/components/Loading';
// models
import modelslist from '~/assets/models.json';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';

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
			currentpage: 0,
			pagesize: 15,
			list: []
		};
		this.selected = [];
		this.historySelected = [];
	}


	componentWillMount() {
		let operationSelected;
		try {
			this.historySelected = JSON.parse(window.localStorage.getItem('selected')) || [];
		} catch (error) {
			this.historySelected = [];
		}

		const currentdata = JSON.parse(JSON.stringify([...this.state.list, ...this.getpagedata()]));
		this.selectedHistory2New(currentdata);
	}


	componentWillUnmount() {
		if (Array.isArray(this.selected) && this.selected.length > 0) {
			window.localStorage.setItem('selected', JSON.stringify(this.selected));
		} else {
			window.localStorage.setItem('selected', JSON.stringify(this.historySelected));
		}
	}

	getpagedata = () => {
		const {currentpage, pagesize} = this.state;
		const pagedata = modelslist.slice(currentpage*pagesize, currentpage*pagesize + pagesize);
		this.setState({
			currentpage: this.state.currentpage+1
		});
		return pagedata;
	}

	handlePage = () => new Promise((resolve, reject) => {
		window.clearTimeout(this.timerDelay);
		this.timerDelay = window.setTimeout(() => {
			this.setState({
				list: JSON.parse(JSON.stringify([...this.state.list, ...this.getpagedata()]))
			}, () => {this.selectedHistory2New(this.state.list);});
			resolve();
		}, 1000);
	});

	handleSelect = (e) => {
		const index = parseInt(e.target.id, 0);
		this.state.list[index].selected = !this.state.list[index].selected;
		console.log(1);
		this.setState({
			list: this.state.list
		}, () => {
			this.selected = this.selectedNew2History();
			console.log('this.selected', this.selected);
			if (this.selected.length === 0) {
				window.localStorage.setItem('selected', JSON.stringify(this.selected));
			}
		});
	}

	selectedNew2History = () => {
		const { list } = this.state;
		const selected = [];
		list.forEach((item, index) => { // 遍历当前选择列表
			// 修改老值
			this.historySelected.forEach((el, i) => { // 同时遍历旧数据
				if (el.index === index) { // 如果新老值是同一个项
					el.selected = item.selected; // 以新值选择结果为标准
				}
			});

			// 重新定义新值
			if (item.selected) { // 如果有选中
				const newItem = item;
				newItem.index = index;
				selected.push(newItem); // 赋予索引值后推送到已选择
			}
		});

		console.log();
		return JSON.parse(JSON.stringify(selected));
	}

	selectedHistory2New = (current) => {
		const operationList = JSON.parse(JSON.stringify(current));
		console.log(current);
		operationList.forEach((item, index) => { // 遍历当前选择列表
			// 修改新值
			this.historySelected.forEach((el, i) => { // 同时遍历旧数据
				if (el.index === index) { // 如果新老值是同一个项
					item.selected = el.selected; // 以旧值选择结果为标准
				}
			});
		});
		this.setState({
			list: operationList
		});
	}

	onClickRight = (e) => {
		console.log(e);
	}

	render() {
		const { item } = this.state;
		let p1 = 0, p2 = 0, p3 = 0;
		return (
			<div className={s.root}>
				<HeaderBar
					title={'选择模特'}
					onClickLeft
					onClickRight={this.onClickRight}
					rightIcon="icon_grid"
					leftIcon="icon_check"
					leftIconClass={s.checked}
				/>
				<div className={s.list}>
					<ScrollLoading
						handlePage={this.handlePage}
						scrollToTop
						loadingHtml={<div />}
					>
						<div className="clearfix" style={{height: listHeight}}>
							{
								this.state.list.map((item, i) => {
									const img = window.document.createElement('img');
									img.src = `./assets/models/${item.imgUrl}`;
									const rate = img.width / (window.innerWidth/3);
									if (isNaN(rate)|| rate === 0) {
										return;
									}
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
										<div
											style={{ width, height, left, top}}
											className={s.imgbox}
										>
											<img src={img.src} alt="" />
											{
												<div onClick={this.handleSelect} id={i} className={item.selected ? s.selectedbutton : s.selectbutton} />
											}
										</div>
									);
								})
							}
						</div>
						<div className={s.loading} style={{top:listHeight}}>
							<img src={require('./loading.svg')} />
						</div>
					</ScrollLoading>
				</div>
			</div>
		);
	}
}

export default MotionPage(List);
