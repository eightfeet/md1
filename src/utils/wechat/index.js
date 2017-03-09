window.wxConfig = false;

let wx = {};

function loaded() {
	return new Promise((resolve, reject) => {
		if (window.wx && typeof window.wx === 'object') {
			wx = window.wx;
			resolve();
			return;
		}
		const dom = document.createElement('script');
		dom.setAttribute('src', 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
		dom.onload = () => {
			wx = window.wx;
			resolve();
		};
		dom.onerror = () => reject('页面无法载入');
		document
			.getElementsByTagName('head')[0]
			.appendChild(dom);
	});
}

function arrConcat(arr1, arr2) {
	//不要直接使用var arr = arr1，这样arr只是arr1的一个引用，两者的修改会互相影响
	let arr = arr1.concat();
	//或者使用slice()复制，var arr = arr1.slice(0)
	for (let i = 0; i < arr2.length; i++){
		arr.indexOf(arr2[i]) === -1 ? arr.push(arr2[i]) : 0;
	}
	return arr;
}

function configs(config) {
	return new Promise((resolve, reject) => {
		if (window.wxConfig) {
			resolve();
			return;
		}
		if (!config) {
			reject('缺少微信config参数');
			return;
		}
		let getConfig = {};
		getConfig.debug = config.debug || false;
		getConfig.appId = config.appId || '';
		getConfig.timestamp = config.timestamp || '';
		getConfig.nonceStr = config.nonceStr || '';
		getConfig.signature = config.signature || '';
		getConfig.jsApiList = config.jsApiList || [];

		const shareArr = [
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone'];

		getConfig.jsApiList = arrConcat(shareArr, getConfig.jsApiList);


		console.log('getConfig.jsApiList');
		console.log(getConfig.jsApiList);

		const {
			debug,
			appId,
			timestamp,
			nonceStr,
			signature,
			jsApiList
		} = getConfig;

		wx.config({
			debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId, // 必填，公众号的唯一标识
			timestamp, // 必填，生成签名的时间戳
			nonceStr, // 必填，生成签名的随机串
			signature, // 必填，签名，见附录1
			jsApiList
		});
		resolve();
	});
}

function ready(){
	return new Promise((resolve, reject) => {
		wx.error((error) => {
			window.wxConfig = false;
			return;
		});

		wx.ready(() => {
			window.wxConfig = true;
			resolve();
		});
	});
}

export function share(title, link, imgUrl, desc){
	return new Promise((resolve, reject) => {
		wx.ready(() => {
			wx.onMenuShareTimeline({
				title, // 分享标题
				link, // 分享链接
				imgUrl, // 分享图标
				success () {
					resolve();
				},
				cancel () {
					reject('取消分享到朋友圈');
				}
			});
			wx.onMenuShareAppMessage({
				title, // 分享标题
				desc, // 分享描述
				link, // 分享链接
				imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success () {
					resolve();
				},
				cancel () {
					reject('取消分享给朋友');
				}
			});
			wx.onMenuShareQQ({
				title, // 分享标题
				desc, // 分享描述
				link, // 分享链接
				imgUrl, // 分享图标
				success () {
					resolve();
				},
				cancel () {
					reject('取消分享到QQ好友');
				}
			});
			wx.onMenuShareWeibo({
				title, // 分享标题
				desc, // 分享描述
				link, // 分享链接
				imgUrl, // 分享图标
				success () {
					resolve();
				},
				cancel () {
					reject('取消分享到腾讯微博');
				}
			});
			wx.onMenuShareQZone({
				title, // 分享标题
				desc, // 分享描述
				link, // 分享链接
				imgUrl, // 分享图标
				success () {
					resolve();
				},
				cancel () {
					reject('取消分享到QQ空间');
				}
			});
		});
	});
}

export default function wechat(config) {
	return loaded().then((res) => {
		configs(config);
	}).then((res) => {
		ready();
	});
}
