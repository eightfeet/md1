
let timerScrollToTopRun;
let startY = 0; // 初始位置
let lastY = 0; // 上一次位置

/**
 * 用于缓动的变量
 */
let lastMoveTime = 0;
let lastMoveStart = 0;
let stopInertiaMove = false; // 是否停止缓动
let nowY = 0;

export const scroll = {
	touchStart: (e) => {

		lastMoveTime = 0;
		lastMoveStart = 0;
		stopInertiaMove = false; // 是否停止缓动
		nowY = 0;

		lastY = startY = e.touches[0].pageY;
		lastY = startY = e.touches[0].pageY;

		/**
		 * 缓动代码
		 */
		lastMoveStart = lastY;
		lastMoveTime = e.timeStamp || Date.now();
		stopInertiaMove = true;
	},
	touchMove: (e) => {
		const elem = e.currentTarget;
		nowY = e.touches[0].pageY;
		const moveY = nowY - lastY;
		const contentTop = elem.scrollTop;
		// 设置top值移动content
		elem.scrollTop = elem.scrollTop - moveY;
		lastY = nowY;

		/**
		 * 缓动代码
		 */
		const nowTime = e.timeStamp || Date.now();
		stopInertiaMove = true;
		if (nowTime - lastMoveTime > 300) {
			lastMoveTime = nowTime;
			lastMoveStart = nowY;
		}
	},
	touchEnd: (e) => {
		// do touchend
		/**
		 * 缓动代码
		 */
		const elem = e.currentTarget;
		const nowTime = e.timeStamp || Date.now();
		console.log(nowY, lastMoveStart, nowTime, lastMoveTime);
		let v = 0;
		v = (nowY - lastMoveStart) / (nowTime - lastMoveTime); //最后一段时间手指划动速度
		return v;
	}
};

let refreshTouchStartY = 0;
let refreshTouchEndY = 0;

export const pullRefresh = {
	touchStart: (e) => {
		const startY = event.touches[0].pageY;
		const elem = e.currentTarget;
		const scrollTop = elem.scrollTop;
		refreshTouchStartY = 0;
		if (scrollTop === 0) {
			refreshTouchStartY = e.touches[0].pageY;
		}
	},
	touchMove: (e) => {
		const elem = e.currentTarget;
		const scrollTop = elem.scrollTop;
		const threshold = 200;
		let angle = 0;
		let height = 0;
		let scale = 0;
		refreshTouchEndY = 0;
		if (scrollTop === 0) {
			refreshTouchEndY = e.touches[0].pageY;
			let distance = refreshTouchEndY - refreshTouchStartY;
			distance = distance > threshold ? distance = threshold : distance;
			angle = 180 / (threshold / distance);
			height = 48 / (threshold / distance);
			scale = threshold / distance;
		}
		return {
			angle,
			scale,
			height
		};
	},
	touchEnd: (e) => {
		const elem = e.currentTarget;
		const scrollTop = elem.scrollTop;
		refreshTouchStartY = 0;
	}
};
