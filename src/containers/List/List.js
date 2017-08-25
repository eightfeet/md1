import { h, Component } from 'preact';
import classNames from 'classnames';
import queryString from 'query-string';
import history from '~/core/history';
import Modal from '~/components/Modal';
import HeaderBar from '~/components/HeaderBar';
import Loading from '~/components/Loading';
// models
import sourcedata from '~/assets/models.json';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';

let listHeight = 0;
let modelslist;

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
			list: [],
			showMenu: false,
			error: null,
			errorTitle: '对不起',
			showFilterModel: false,
			isX: true,
			isY: true,
			isBody: true,
			isClothes: true
		};
		this.selected = [];
		this.historySelected = [];
	}


	componentWillMount() {
		this.sourceDataOperation();
		listHeight = 0;
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
		this.initPageData();
	}

	sourceDataOperation = () => {
		const {isX, isY, isBody, isClothes} = this.state;
		const getdata = [];
		for (let i = 0; i < sourcedata.length; i += 1) {
			if ( isX && sourcedata[i].xy === 'x' ) {
				getdata.push(sourcedata[i]);
				continue;
			}
			if ( isY && sourcedata[i].xy === 'y' ) {
				getdata.push(sourcedata[i]);
				continue;
			}
		}
		modelslist = getdata;
	}

	toggle = (element) => () => {
		const data = {};
		data[element] = !this.state[element];
		this.setState(data);
	}

	initPageData = () => {
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
			if (this.state.list.length < modelslist.length) {
				this.setState({
					list: JSON.parse(JSON.stringify([...this.state.list, ...this.getpagedata()]))
				}, () => {this.selectedHistory2New(this.state.list);});
				resolve();
			} else {
				reject();
			}

		}, 500);
	});

	handleSelect = (i) => (e) => {
		this.state.list[i].selected = !this.state.list[i].selected;
		this.setState({
			list: this.state.list
		}, () => {
			this.selected = this.selectedNew2History();
			this.initPageData();
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

		return JSON.parse(JSON.stringify(selected));
	}

	selectedHistory2New = (current) => {
		const operationList = JSON.parse(JSON.stringify(current));
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
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

	Filter = () => {
		this.setState({
			showFilterModel: true,
			showMenu: !this.state.showMenu
		});
	}

	closeFilterModel = () => {
		this.setState({
			showFilterModel: false,
			list: []
		}, () => {
			this.doFilter();
		});
	}

	doFilter = () => {
		this.sourceDataOperation();
		listHeight = 0;
		let operationSelected;
		try {
			this.historySelected = JSON.parse(window.localStorage.getItem('selected')) || [];
		} catch (error) {
			this.historySelected = [];
		}
		const currentdata = JSON.parse(JSON.stringify([...this.state.list, ...this.getpagedata()]));
		this.selectedHistory2New(currentdata);
	}

	reSelect = () => {
		const resetSelect = JSON.parse(JSON.stringify(this.state.list));
		for (let i = 0; i < resetSelect.length; i += 1) {
			resetSelect[i].selected = false;
		}
		this.setState({
			showMenu: !this.state.showMenu,
			list: resetSelect
		}, () => {this.initPageData();});
	}

	closeError = () => {
		this.setState({
			error: null
		});
	}

	filterToggle = (selected) => {
		return classNames({
			'fw-b': true,
			'pdr1': true,
			'icon_toggle_left': !selected,
			'gray': !selected,
			'icon_toggle_right': selected,
			'greenspec': selected
		});
	}

	render() {
		const {
			item,
			isX,
			isY,
			isBody,
			isClothes
		} = this.state;
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
				<div className={classNames({
					hide: !this.state.showMenu
				}, s.menu, 'shadow-bottom')}>
					<ul className="nls">
						<li className="pdl1" onClick={this.Filter}><i className="icon_filter pdl1"/>&nbsp;&nbsp;筛选</li>
						<li className="pdl1" onClick={this.reSelect}><i className="icon_check_circle pdl1"/>&nbsp;&nbsp;重新选择</li>
					</ul>
				</div>
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
									img.src = `./assets/models/small/${item.imgUrl}`;
									const imginfo = item.imgUrl.split('&');
									const rate = parseInt(imginfo[1], 0) / (window.innerWidth/3);

									if (isNaN(rate)|| rate === 0) {
										return;
									}
									const width = window.innerWidth/3;
									const height = parseInt(imginfo[2], 0) / rate;
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
											style={{
												width, height, left, top,
												boxSizing: 'border-box',
												border: '3px solid #fff'
											}}
											className={s.imgbox}
										>
											<img src={img.src} alt="" />
											{
												<div
													onClick={this.handleSelect(i)}
													style={{
														border: !item.selected? '0.3rem solid #ccc':'0.3rem solid #00b67b',
														borderRadius: '3rem',
														position: 'absolute',
														right: '0.5rem',
														top: '0.5rem',
														width: '1rem',
														height: '1rem',
														zIndex: '1'
													}}
													/>
											}
										</div>
									);
								})
							}
						</div>
						{this.state.list.length !== modelslist.length ? (<div className={s.loading} style={{top:listHeight}}>
							<img src={require('./loading.svg')} />
						</div>) : null}
					</ScrollLoading>
				</div>
				<Modal
					contentLabel="time"
					isOpen={!!this.state.error}
					onRequestClose={this.closeError}
				>
					<h3 className="al-c font-bigger pdt2 pdb1">
						{this.state.errorTitle}
					</h3>
					<div className="al-c pdb2">{this.state.error}</div>
				</Modal>
				<Modal
					contentLabel="time2"
					isOpen={this.state.showFilterModel}
					onRequestClose={this.closeFilterModel}
				>
					<h3 className="al-c font-bigger pdt2 pdb1">
						筛选
					</h3>
					<div className="pdl2 pdr2 nls al-c">
						<ul className={classNames(s.filter, 'clearfix')}>
							<li className="fl w4-5" onClick={this.toggle('isX')}>
								<i className={this.filterToggle(isX)} />横向
							</li>
							<li className="fl w1"/>
							<li className="fl w4-5" onClick={this.toggle('isY')}>
								<i className={this.filterToggle(isY)} />纵向
							</li>
							<li className="fl w4-5" onClick={this.toggle('isClothes')}>
								<i className={this.filterToggle(isClothes)} />着衣
							</li>
							<li className="fl w1"/>
							<li className="fl w4-5" onClick={this.toggle('isBody')}>
								<i className={this.filterToggle(isBody)} />人体
							</li>
						</ul>
						&nbsp;
					</div>
					<div className="w9 center pdb1">
						<button className="btngreen font" onClick={this.closeFilterModel}>
							确&nbsp;&nbsp;认
						</button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default List;
