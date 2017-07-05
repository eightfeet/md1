import { h, Component } from 'preact';
import s from './ScrollLoading.scss';

class ScrollLoading extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showLoading: false,
			isPageOver: false,
			noMore: false,
			stopBack: false,
			showScrollToTop: false
		};
		this.timer = null;
		this.timerDelay = null;
		this.timerDelayB = null;
		this.scrollLocked = false;
	}

	componentWillUnmount() {
		window.clearTimeout(this.timer);
	}

	showLoadingBar = () => new Promise((resolve) => {
		this.setState({
			showLoading: true
		}, resolve(console.log('显示')));
	});

	hideLoadingBar = () => new Promise((resolve) => {
		this.setState({
			showLoading: false
		}, resolve(console.log('隐藏')));
	});

	lockedScroll = () => new Promise((resolve) => {
		this.setState({
			showLoading: false
		}, resolve(console.log('隐藏')));
	});

	action = (res) => new Promise((resolve, rej) => {
		window.clearTimeout(this.timerDelay);
		this.timerDelay = window.setTimeout(() => {
			console.log(1);
			resolve();
			return res;
		}, 2000);
	});

	onScroll = (e) => {
		const {
			handleAction, totalsize, currentpage, pagesize,
			scrollToTop
		} = this.props;

    // 滚动条当前的高度
		const scrollTop = e.currentTarget.scrollTop;
    // 外框高度
		const boxHeight = e.currentTarget.offsetHeight;
    // 内容高度
		const contentHeight = e.currentTarget.childNodes[0].offsetHeight;

		// 翻页是否结束
		if (!this.state.isPageOver) {
			// 页面是否触底
			if (scrollTop + boxHeight >= contentHeight) {

				if (!this.scrollLocked) {
					// 锁定滚动
					this.scrollLocked = true;
					// if (!handleAction) {
					// 	console.log('!!!!!!!!!!请务必传入Promise方法  handleAction = () => new Promise((resolve) => {doing...})');
					// 	return;
					// }

					// 页面请求
					Promise.resolve()
					.then(this.showLoadingBar)
					.then(this.action)
					.then(this.hideLoadingBar)
					.then(() => {
						this.timer = window.setTimeout(() => {
							this.scrollLocked = false;
						}, 100);
					}).catch(() => {
						this.setState({
							isPageOver: true,
							showLoading: false,
							noMore: true
						});
					});
				}

				if (totalsize <= (currentpage * pagesize)) {
					this.setState({
						isPageOver: true,
						showLoading: false,
						noMore: true
					});
				}

			}
		} else if (!this.state.stopBack) {
			this.setState({
				stopBack: true
			});
		}
		if (scrollToTop) {
			this.displayScrollToTop();
		}
	}

	onScrollToTop = () => {
		this.startrun();
	}

	startrun = () => {
		clearInterval(this.timer);
		this.timer = setInterval(() => {
			let speed = this.refWarp.scrollTop / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (this.refWarp.scrollTop === 0) {
				clearInterval(this.timer);
			} else {
				this.refWarp.scrollTop -= speed;
			}
		}, 30);
	}

	displayScrollToTop = () => {
		const windowHeight = window.innerHeight;
		const scrollTop = this.refWarp.scrollTop;
		if (scrollTop > windowHeight) {
			this.setState({
				showScrollToTop: true
			});
		} else {
			this.setState({
				showScrollToTop: false
			});
		}
	}

	renderScrollToTopFlag = () => {
		const { scrollToTop } = this.props;
		const defaultHtml = (
			<div className={s.backtotop}>
				<div className="al-c icon-uparrow orangered pdt1" style={{ fontSize: '1.8rem' }} />
				<p className="orangered al-c font-small">置顶</p>
			</div>
		);

		if (typeof this.props.scrollToTop === 'boolean' && scrollToTop) {
			return defaultHtml;
		}

		if (typeof this.props.scrollToTop === 'object' && scrollToTop) {
			return scrollToTop;
		}

		return null;
	}

	renderLoading = () => {
		const {loadingHtml} = this.props;
		if (loadingHtml) {
			return loadingHtml;
		}
		return (
			<div className={s.SLoading}>
				<div className={`${s.listloading} center al-c`} >
					<div><div /></div><div><div /></div>
					<div><div /></div><div><div /></div>
					<div><div /></div><div><div /></div>
					<div><div /></div><div><div /></div>
				</div>
				<div className="gray-light al-c pd1 font-smallest">加载中</div>
			</div>
		);
	}

	renderNoMore = () => {
		const {noMoreHtml} = this.props;
		if (noMoreHtml) {
			return noMoreHtml;
		}
		return (<div
			className={`gray-light al-c font-smallest ${s.nomoren}`}
		>
			没有了</div>);
	}

	render() {
		const { children, scrollToTop } = this.props;
		const { showScrollToTop, showLoading, noMore } = this.state;
		return (
      <div ref={this.props.inRef}>
        <div
					className={s.scrollLoading}
					onScroll={this.onScroll}
					ref={(ref) => { this.refWarp = ref; }}
				>
          <div>
            {children}
            {
              showLoading ?
                this.renderLoading() :
              null
            }
						{
							noMore ?
							this.renderNoMore() :
							null
						}
          </div>
        </div>
				<div onClick={this.onScrollToTop} >
					{showScrollToTop ? this.renderScrollToTopFlag() : null}
				</div>
      </div>
		);
	}
}

export default ScrollLoading;
