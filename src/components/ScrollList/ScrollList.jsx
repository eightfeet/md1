import { h, Component } from 'preact';
import Scrollload from 'scrollload';


let page = 1;

class ScrollList extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.creatScroll();
	}

	creatScroll () {
		let page = 1;
		new Scrollload({
			container: document.querySelector('.scrollload-container'),
			content: document.querySelector('.scrollload-content'),
			loadMore(sl) {
        // 没用数据的时候需要调用noMoreData
				if (page === 6) {
					sl.noMoreData();
					return;
				}

        // 我这里用jquery的不是因为需要jquery，只是jquery的语法看起来比较简单。大家都认识。
        // 如果你不是用jquery，可以看看原生的insertAdjacentHTML方法来替代append
				sl.unLock();
			},
			// 你也可以关闭下拉刷新
			enablePullRefresh: true,
			pullRefresh(sl) {
				sl.refreshComplete();
			}
		});
	}


	render () {
		const { children } = this.props;
		return (<div class="scrollload-container">
			<div class="scrollload-content">
				{children}
			</div>
		</div>);
	}
}

export default ScrollList;
