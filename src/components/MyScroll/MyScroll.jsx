import { h, Component } from 'preact';
import s from './MyScroll.scss';

class MyScroll extends Component {
	static defaultProps = {
		// 是否开启加载更多
        enableLoadMore: true,
        // 初始化的时候是否锁定，锁定的话则不会去加载更多
        isInitLock: false,
        // 阀值
        threshold: 10,
        // 视窗
        window: window,

        // 底部加载中的html
        loadingHtml: '',
        // 底部没有更多数据的html
        noMoreDataHtml: '',
        // 底部出现异常的html
        exceptionHtml: '',
        // 加载更多的回调
        loadMore: () => {},

        // 是否开启下拉刷新
        enablePullRefresh: false,
        // 顶部下拉刷新的html
        notEnoughRefreshPortHtml: '',
        // 顶部松开刷新的html
        overRefreshPortHtml: '',
        // 顶部正在刷新的html
        refreshingHtml: '',
        // 下拉刷新的回调
        pullRefresh: () => {},
        // 到达刷新点的回调(包括向上和向下，可以通过isMovingDown判断方向)
        arrivedRefreshPortHandler: () => {},
        // 开始滑动的回调
        touchStart: () => {},
        // 滑动时的回调
        touchMove: () => {},
        // 滑动中松开手指的回调
        touchEnd: () => {},
        // 超过可刷新位置后的监听函数
        overRefreshPortHandler: () => {},
        // 未超过可刷新位置前的监听函数
        notEnoughRefreshPortHandler: () => {},

        // 计算下拉的阻力函数
        calMovingDistance(distance) {
            return distance / 3
        },

        // 实例化完后的回调
        initedHandler: () => {},
	}

    constructor(props) {
		super(props);
		this.setState = {
			hasMoreData: false
		}
    }

    createBottomDom() {
        return (
			<div className="scrollload-bottom">${this.props.loadingHtml}</div>
		);
    }

    createTopDom = () => {
    }

    showNoMoreDataDom = () => {
    }

    showLoadingDom = () => {
    }

    showExceptionDom = () => {
    }

    showNotEnoughRefreshPortDom = () => {
    }

    showOverRefreshPortDom = () => {
    }

    showRefreshingDom = () => {
    }

    // 计算向下滑动距离的函数
    calMovingDistance = (distance) => {
        this.distance = this.props.calMovingDistance(distance)
    }

    setTopDomClipTop = (top) => {
    }

	// 是否滚动到顶部
    isTop = () => {
        return this.wrapRef.scrollTop <= 1
    }

	// 是否滚动到底部
    isBottom = () => {
        return this.wrapRef.scrollTop >= this.wrapRef.scrollHeight - this.wrapRef.offsetHeight - 1;
    }

	attachTouchListener() {
        this.wrapRef.addEventListener('touchstart', this.touchStart)
        this.wrapRef.addEventListener('touchmove', this.touchMove)
        this.wrapRef.addEventListener('touchend', this.touchEnd)
    }

	attachScrollListener() {
        this.win.addEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.addEventListener('resize', this.resizeListenerWrapThrottle)
    }

	detachScrollListener() {
        this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.removeEventListener('resize', this.resizeListenerWrapThrottle)
    }

	onScroll = () => {
		console.log(this.isTop());
		console.log(this.isBottom());
	}

    // 刷新完成后的处理
    refreshComplete = () => {
        setStyles([this.topDom, this.contentDom, this.bottomDom], {
            transition: 'all 300ms',
            transform: 'translate3d(0, 0, 0)',
        })
        setStyles([this.topContentDom], { transition: 'all 300ms' })
        this.setTopDomClipTop(this.topContentDomHeight)
        this.isRefreshing = false
    }

    // 内容在滑动中的处理
    movingHandler() {
        // 如果滑到了可以刷新的点，就做相应的处理。对向上滑动和向下滑动都需要做处理，显示不同的dom。
        if (this.isArrivedRefreshPort()) {
            this.arrivedRefreshPortHandler()
        }

        // 是否超过可以刷新的点，做不同的处理。
        if (this.isOverRefreshPort()) {
            this.overRefreshPortHandler()
        } else {
            this.notEnoughRefreshPortHandler()
        }

        const distance = Math.max(this.distance, 0)
        if (distance === 0) {
            this.isMoving = false
        }

        setStyles([this.topDom, this.contentDom, this.bottomDom], {
            transform: `translate3d(0, ${distance}px, 0)`,
        })
        // 最小值一定大于0其实是不想让repaint的区域变大，功能上没影响
        this.setTopDomClipTop(Math.max(this.topContentDomHeight - distance, 0))
    }

    // 是否超过可刷新的位置
    isOverRefreshPort() {
        return this.distance >= this.topContentDomHeight
    }

    // 触发下拉刷新
    triggerPullResfresh() {
        this.showRefreshingDom()
        this.isRefreshing = true
        setStyles([this.topDom, this.contentDom, this.bottomDom], {
            transition: 'all 300ms',
            transform: `translate3d(0, ${this.topContentDomHeight}px, 0)`,
        })
        this.props.pullRefresh.call(this, this)
    }

    // 超过可刷新位置后的监听函数
    overRefreshPortHandler() {
        this.props.overRefreshPortHandler.call(this, this)
    }

    // 未超过可刷新位置前的监听函数
    notEnoughRefreshPortHandler() {
        this.props.notEnoughRefreshPortHandler.call(this, this)
    }

    // 是否到达了可刷新的位置
    isArrivedRefreshPort() {
        const preDistance = this.props.calMovingDistance(this.prePageY - this.startPageY)
        return (
            (this.distance >= this.topContentDomHeight && preDistance < this.topContentDomHeight) ||
            (this.distance <= this.topContentDomHeight && preDistance > this.topContentDomHeight)
        )
    }

    // 对到达了刷新的位置时的处理
    arrivedRefreshPortHandler() {
        if (this.isMovingDown) {
            this.showOverRefreshPortDom()
        } else {
            this.showNotEnoughRefreshPortDom()
        }

        this.props.arrivedRefreshPortHandler.call(this, this)
    }

    attachTouchListener() {
        this.wrapRef.addEventListener('touchstart', this.touchStart)
        this.wrapRef.addEventListener('touchmove', this.touchMove)
        this.wrapRef.addEventListener('touchend', this.touchEnd)
    }

    touchStart(event) {
        // 初始化的时机：只要不是正在刷新都应该做初始化操作
        if (this.isRefreshing) {
            this.enterTouchStart = false
            return
        }
        // touchmove中通过判断这个值可以推断出touchstart中有没有做初始化
        this.enterTouchStart = true

        this.startPageY = this.prePageY = event.touches[0].pageY
        // 在滑动的时候是不需要过渡动画的
        setStyles([this.topDom, this.contentDom, this.bottomDom, this.topContentDom], {
            transition: 'none',
        })
        this.showNotEnoughRefreshPortDom()

        // 多tab切换的时候可能实例化可能为隐藏的情况
        if (this.topContentDomHeight === 0) {
            this.topContentDomHeight = this.topContentDom.clientHeight
            this.topContentDomWidth = this.topContentDom.clientWidth
            this.topDom.style.top = `-${this.topContentDomHeight}px`
        }

        this.props.touchStart.call(this, this)
    }

    touchMove(event) {
        // 如果touchstart中没有做初始化，那么这里不应该执行下去了。
        if (!this.enterTouchStart) {
            return
        }

        const pageY = event.touches[0].pageY
        this.isMovingDown = pageY >= this.prePageY

        if (this.isMoving) {
            // 如果是在滑动中，计算出滑动的距离
            this.calMovingDistance(pageY - this.startPageY)
            this.movingHandler()

            // 阻止滚动
            event.preventDefault()
        } else if (this.isTop() && this.isMovingDown) {
            // 如果滑动的时候此时在最高的位置并且是向下滑动的，那么那些dom就可以滑动了。
            this.isMoving = true

            // 阻止滚动
            event.preventDefault()
        }

        this.props.touchMove.call(this, this)

        this.prePageY = pageY
    }

    touchEnd(event) {
        // 如果此时不在滑动中，就不用做一些重置的操作
        if (!this.isMoving) {
            return
        }

        this.props.touchEnd.call(this, this)

        // 如果此时是可刷新的位置，那么触发刷新操作。否则直接触发刷新完成的操作
        if (this.isOverRefreshPort()) {
            this.triggerPullResfresh()
        } else {
            this.refreshComplete()
        }

        this.startPageY = this.prePageY = 0
        this.isMoving = false
    }

    scrollListener() {
        if (this.isLock) {
            return
        }

        if (this.isBottom()) {
            this.isLock = true
            this.props.loadMore.call(this, this)
        }
    }

    attachScrollListener() {
        this.win.addEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.addEventListener('resize', this.resizeListenerWrapThrottle)
        this.scrollListener()
    }

    detachScrollListener() {
        this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.removeEventListener('resize', this.resizeListenerWrapThrottle)
    }

    lock() {
        this.isLock = true
    }

    unLock() {
        this.isLock = false
        if (this.hasMoreData) {
            this.scrollListener()
        }
    }

    noMoreData = () => {
    }

    refreshData = () => {
    }

    throwException = () => {
    }

    solveException = () => {
    }

	render () {
		const { children } = this.props;
		return (
		<div
			className={s.s_wrap}
			ref = { ref => {this.wrapRef = ref;}}
			onScroll = {this.onScroll}
			>
			<div
				ref = { ref => {this.containerRef = ref;}}
				>
				{children}
			</div>
		</div>)
	}
}

export default MyScroll;
