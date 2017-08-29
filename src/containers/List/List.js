import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import queryString from 'query-string';
import { setRuntimeVariable } from '~/actions/user';
import history from '~/core/history';
import Modal from '~/components/Modal';
import HeaderBar from '~/components/HeaderBar';
import Loading from '~/components/Loading';
import Toggle from '~/components/Toggle';
// models
import sourcedata from '~/data/models.json';
import sourcedataindex from '~/data/modelsIndex.json';
import Spin from '~/components/Loading/Spin';
import MotionPage from '~/components/MotionPage';
import ScrollLoading from '~/components/ScrollLoading';
import s from './style';

let listHeight = 0;
let modelslist = [];

class List extends Component {
	constructor() {
		super();
		this.state = {
			currentpage: 0,
			pagesize: 15,
			list: [],
			sourcedataindex,
			showMenu: false,
			error: null,
			errorTitle: '对不起',
			showFilterModel: false,
			showFilterByMd: false,
			loading: false,
			isX: false,
			isY: false,
			isClothes: true,
			isBody: false,
			isMale: false,
			isFemale: false,
			isHeader: false,
			isHandsFeet: false
		};
		this.selected = [];
		this.historySelected = [];
	}


	componentWillMount() {
		// 进入页面初始化
		this.props.setStore({
			name: 'currentdata',
			value: []
		});
		// 重制第一页
		setTimeout(() => {
			this.onPage();
		});
	}

	componentWillUnmount() {
		// 缓存已选择数据到浏览器
		window.localStorage.setItem('selected', JSON.stringify(this.props.selected));
	}

	// 按筛选条件重制数据源 (初始化sourceList) data 筛选条件 sourcedata 数据源
	sourceDataOperation = (data, sourcedata) => new Promise((resolve, reject) => {
		const {isX,
			isY,
			isClothes,
			isBody,
			isMale,
			isFemale,
			isHeader,
			isHandsFeet} = this.state;

		let getdata = [];

		if (!sourcedata) {
			reject();
		}

		const operationData = JSON.parse(JSON.stringify(sourcedata));

		// 按模特ID过滤
		getdata = this.filterSourceById(operationData);
		if (!isX &&
			!isY &&
			!isClothes &&
			!isBody &&
			!isMale &&
			!isFemale &&
			!isHeader &&
			!isHandsFeet) {
			console.log('无数据');
		} else {
			getdata = this.filterSource(getdata);
		}

		this.props.setStore({
			name: 'sourceList',
			value: getdata
		});

		setTimeout(() => {
			resolve();
		}, 500);
	});

	filterSource = (sourcedata) => {
		const {isX,
			isY,
			isClothes,
			isBody,
			isMale,
			isFemale,
			isHeader,
			isHandsFeet} = this.state;

		const getdata = [];
		for (let i = 0; i < sourcedata.length; i += 1) {
			if (
				(sourcedata[i].isX === isX || sourcedata[i].isY === isY) &&
				(sourcedata[i].isClothes === isClothes || sourcedata[i].isBody === isBody) &&
				(sourcedata[i].isMale === isMale || sourcedata[i].isFemale === isFemale) &&
				sourcedata[i].isHeader === isHeader &&
				sourcedata[i].isHandsFeet === isHandsFeet
			) {
				getdata.push(sourcedata[i]);
			}
		}
		return getdata;
	}

	filterSourceById = (sourcedata) => {
		const {sourcedataindex} = this.state;
		let getdata = [];

		for (let i = 0; i < sourcedataindex.length; i += 1) {
			if (sourcedataindex[i].selected === true) {
				for (let n = 0; n < sourcedata.length; n += 1) {
					if (
						sourcedata[n].mdId === sourcedataindex[i].mdId
					) {
						getdata.push(sourcedata[n]);
					}
				}
			}
		}

		if (getdata.length === 0) {
			getdata = sourcedata;
		}

		return getdata;
	}

	// 创建更新页面数据
	newPage = () => new Promise((resolve, reject) => {
		const currentdata = JSON.parse(JSON.stringify([
			...this.props.currentdata,
			...this.getpagedata(this.props.sourceList)
		]));
		this.props.setStore({
			name: 'currentdata',
			value: currentdata
		});
		setTimeout(() => {
			resolve();
		});
	})

	// 比较选择历史更新页面
	compareHistory = () => new Promise((resove, reject) => {
		const { currentdata, selected, setStore, sourceList } = this.props;
		const operationList = JSON.parse(JSON.stringify(currentdata));

		operationList.forEach((item, index) => { // 遍历当前选择列表
			// 修改新值
			selected.forEach((el, i) => { // 同时遍历旧数据
				if (el.imgUrl === item.imgUrl) { // 如果新老值是同一个项
					item.selected = el.selected; // 以旧值选择结果为标准
				}
			});
		});

		setStore({
			name: 'currentdata',
			value: operationList
		});
		setTimeout(() => {
			resove();
			this.setState({loading: false});
		});
	});

	// 更新页面
	onPage = () => {
		this.setState({loading: true});
		listHeight = 0;
		return Promise.resolve()
		.then(() =>
			this.sourceDataOperation({
				isX: this.state.isX,
				isY: this.state.isY
			}, sourcedata)
		).then(() =>
			this.newPage()
		).then(() =>
			this.compareHistory()
		);
	}

	// 筛选开关设置
	toggle = (element) => () => {
		const data = {};
		data[element] = !this.state[element];
		this.setState(data);
	}

	// delate
	initPageData = () => {
		if (Array.isArray(this.selected) && this.selected.length > 0) {
			window.localStorage.setItem('selected', JSON.stringify(this.selected));
		} else {
			window.localStorage.setItem('selected', JSON.stringify(this.historySelected));
		}
	}

	// 获取新增页面数据
	getpagedata = (souce) => {
		const {currentpage, pagesize} = this.state;
		const pagedata = souce.slice(currentpage*pagesize, currentpage*pagesize + pagesize);
		this.setState({
			currentpage: this.state.currentpage+1
		});
		return pagedata;
	}

	// 操作选择与取消选择图片
	handleSelect = (i) => (e) => {
		const { currentdata, selected, setStore, sourceList } = this.props;
		const operationData = JSON.parse(JSON.stringify(currentdata));
		let operationHistory = JSON.parse(JSON.stringify(selected));

		// toggle 更新显示数据
		operationData[i].selected = !operationData[i].selected;
		this.props.setStore({
			name: 'currentdata',
			value: operationData
		});

		// 选择的情况
		if (operationData[i].selected) {
			// 判断已选择列表是否保存这个数
			for (let index = 0; index < operationHistory.length; index += 1) {
				if (operationHistory[index].imgUrl === operationData[i].imgUrl) {
					// 有则不再操作
					return;
				}
			}
			// 无则推送一条进已选择的列表
			operationHistory.push(operationData[i]);
			this.props.setStore({
				name: 'selected',
				value: operationHistory
			});
		}

		// 取消选择的情况
		if (!operationData[i].selected) {
			// 移除已选择列表的当前项
			for (let index = 0; index < operationHistory.length; index += 1) {
				if (operationHistory[index].imgUrl === operationData[i].imgUrl) {
					const parta = operationHistory.slice(0, index);
					const partb = operationHistory.slice(index + 1, operationHistory.length);
					operationHistory = parta.concat(partb);
				}
			}
			// 更新已选择的列表
			this.props.setStore({
				name: 'selected',
				value: operationHistory
			});
		}
	}

	// 展示右菜单
	onToggleMenu = (e) => {
		e.preventDefault();
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

	// 选择过滤子菜单展示过滤操作
	Filter = (e) => {
		e.preventDefault();
		this.setState({
			showFilterModel: true,
			showMenu: !this.state.showMenu
		});
	}

	// 隐藏过滤操作
	closeFilterModel = () => {
		this.doFilter();
	}

	// 过滤处理
	doFilter = () => {
		// 初始化翻页数据
		this.setState({
			showFilterModel: false,
			currentpage: 0
		});
		// 初始化页面数据
		this.props.setStore({
			name: 'currentdata',
			value: []
		});
		// 处理页面
		setTimeout(() => {
			this.onPage();
		});
	}

	// 重新选择
	reSelect = () => {
		const {
			setStore,
			selected,
			currentdata
		} = this.props;

		const operatinData = JSON.parse(JSON.stringify(currentdata));

		operatinData.forEach((item) => {
			item.selected = false;
		});

		setStore({
			name: 'selected',
			value: []
		});

		setStore({
			name: 'currentdata',
			value: operatinData
		});

		this.setState({
			showMenu: false
		});

	}

	// 重新选择
	selectAll = () => {
		const {
			setStore,
			selected,
			currentdata
		} = this.props;

		const operatinData = JSON.parse(JSON.stringify(currentdata));

		operatinData.forEach((item) => {
			item.selected = true;
		});

		setStore({
			name: 'selected',
			value: operatinData
		});

		setStore({
			name: 'currentdata',
			value: operatinData
		});

		this.setState({
			showMenu: false
		});

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

	toggleSelectModels = (item, index) => () => {
		const operatinData = JSON.parse(JSON.stringify(this.state.sourcedataindex));
		operatinData[index].selected = !operatinData[index].selected;
		this.setState({
			sourcedataindex: operatinData
		});
	}

	selectModels = () => {
		this.setState({
			showFilterByMd: true,
			showMenu: !this.state.showMenu
		});
	}

	filterModel = (e) => {
		const {
			setStore
		} = this.props;
		e.preventDefault();
		this.setState({
			showFilterByMd: false,
			currentpage: 0 // 切记初始化翻页！！！！！
		});

		setStore({
			name: 'currentdata',
			value: []
		});

		// 处理页面
		setTimeout(() => {
			this.onPage();
		});
	}

	render() {
		const {
			setStore,
			time,
			selected,
			sourceList,
			currentdata
		} = this.props;
		const {
			item,
			loading,
			sourcedataindex,
			showFilterByMd,
			isX,
			isY,
			isClothes,
			isBody,
			isMale,
			isFemale,
			isHeader,
			isHandsFeet
		} = this.state;

		let p1 = 0, p2 = 0, p3 = 0;
		return (
			<div className={s.root}>
				<HeaderBar
					title={'选择模特'}
					onClickLeft
					onClickRight={this.onToggleMenu}
					rightIcon="icon_grid"
					leftIcon="icon_check"
					leftIconClass={s.checked}
				/>
				<div className={classNames({
					hide: !this.state.showMenu
				}, s.menu, 'shadow-bottom')}
					>
					<ul className="nls">
						<li className="pdl1" onClick={this.Filter}><i className="icon_filter pdl1"/>&nbsp;&nbsp;筛选</li>
						<li className="pdl1" onClick={this.selectModels}><i className="icon_check_circle pdl1"/>&nbsp;&nbsp;按模特选择</li>
						<li className="pdl1" onClick={this.selectAll}><i className="icon_check_circle pdl1"/>&nbsp;&nbsp;选择全部</li>
						<li className="pdl1" onClick={this.reSelect}><i className="icon_rotate_cw pdl1"/>&nbsp;&nbsp;重新选择</li>
					</ul>
					<div className={s.over} onClick={this.onToggleMenu}>
						&nbsp;
					</div>
				</div>
				{
					showFilterByMd ? (<div className={s.findbymodelidbox}>
						<div className={s.findbymodelid}>
							<div className={s.fbmbox}>
								<ul className="nls">
									{
										sourcedataindex.map((item, index) =>(<li onClick={this.toggleSelectModels(item, index)}>
											<img src={`./assets/models/small/${item.imgUrl}`} alt=""/>
											<div className={classNames(s.checkbox,  'icon_check_circle', item.selected?s.select:null)}></div>
										</li>))
									}
								</ul>
							</div>
						</div>
						<div className={classNames(s.dock, 'shadow-top')}>
							<div className="w8 center">
								<button className="btn font" onClick={this.filterModel}>
									确&nbsp;&nbsp;认
								</button>
							</div>
						</div>
					</div>) : null
				}
				<div className={s.list}>
					<ScrollLoading
						handlePage={this.onPage}
						scrollToTop
						loadingHtml={<div />}
					>
						<div className="clearfix" style={{height: listHeight}}>
							{
								// if(currentdata) {
									currentdata ? currentdata.map((item, i) => {
										const img = window.document.createElement('img');
										img.src = `./assets/models/small/${item.imgUrl}`;
										// img.src = '';
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

										listHeight = Math.max(p1, p2, p3);

										return (
											<div
												style={{
													width, height, left, top,
													boxSizing: 'border-box',
													border: '2px solid #fff'
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
									}) : null
								//}
							}
						</div>
						{ currentdata.length < sourceList.length ?
							(<div className={s.loading} style={{top:listHeight}}>
							<img src={require('./loading.svg')} />
						</div>) : (<div className={s.loading} style={{top:listHeight}}>
							{currentdata.length === 0 ? '找不到数据': '没有了！'}
						</div>)}
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
							<li className="fl w4-5" onClick={this.toggle('isMale')}>
								<i className={this.filterToggle(isMale)} />男性
							</li>
							<li className="fl w1"/>
							<li className="fl w4-5" onClick={this.toggle('isFemale')}>
								<i className={this.filterToggle(isFemale)} />女性
							</li>
							<li className="fl w4-5" onClick={this.toggle('isHeader')}>
								<i className={this.filterToggle(isHeader)} />头像
							</li>
							<li className="fl w1"/>
							<li className="fl w4-5" onClick={this.toggle('isHandsFeet')}>
								<i className={this.filterToggle(isHandsFeet)} />手足
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

function mapStateToProps(state) {
	return state;
}


function mapDispatchToProps(dispatch){
	return bindActionCreators({ setStore: setRuntimeVariable}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MotionPage(List));
