### wechat Usage

```jsx
    ...
    import wechat, { share } from 'yourpath/utils/wechat';
    ...
    export class example extends React.Component {
        ...
		componentDidMount() {
			wechat({
				// 微信config
				debug: false,
				appId:'wx2f99533...',
				timestamp:'1489029986',
				nonceStr:'a360855d-eb0e-44ee-9ea6-456d672badb8',
				signature:'ce8715c4d5980383d3628f59f5222be8b0b3b369',
				jsApiList:['showMenuItems', 'hideMenuItems', 'onMenuShareTimeline'...]
			}).then(() => {
				share(
					data, //分享信息 data = {title, link, imgUrl, desc}; type object       
					success, // type function
					cancel // type function
				);

			});
		}
        ...
    }
    export default example;
```
### wechat Method
- wechat(config)    
微信设置，config: 微信config信息，
- share(data, success, cancel);

