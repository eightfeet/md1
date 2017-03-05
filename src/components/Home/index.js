import { h, Component } from 'preact';
import validate, { VPhone, VName, VSecurityCode, VEnglish } from './../../utils/validate';
import { FStringPrivacy, FTimeStamp } from './../../utils/fliter';
import s from './style';
import sb from './styleb';

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			phone: '',
			name: '',
			english: '',
			securityCode: '',
			timeStamp: ''
		};
	}


	componentDidMount() {
		this.setState({
			timeStamp: Date.parse(new Date())
		});
	}



	handleSubmit = () => {
		const error = validate(
			VPhone(this.state.phone), // return false
			VName(this.state.name), // return 姓名请使用非特殊字符
			VEnglish(this.state.english) ? '请使用英文字母' : false, // return 昵称请使用英文字母
			VSecurityCode(this.state.securityCode) // return 请输入16位防伪码
		);
		if (error) {
			window.alert(error); // 显示错误
			return;
		}
		window.alert('submit ok');
	}

	updatePhone = e => {
		this.setState({ phone: e.target.value });
	}
	updateName = e => {
		this.setState({ name: e.target.value });
	}
	updateEnglish = e => {
		this.setState({ english: e.target.value });
	}
	updateSecurityCode = e => {
		this.setState({ securityCode: e.target.value });
	}

	render(props, {phone, name, english, securityCode, timeStamp}) {
		return (
			<div className="pdt2 al-c">
				<h1  className={`${s.root} al-c`}>首页</h1>
				<p className={`${sb.root} al-c pd2`}>Home component.</p>
				<div className="w8 center clearfix">
					<input type="tel" value={phone} onInput={this.updatePhone} placeholder="phone" /> <br /><br />
					<input type="text" value={name} onInput={this.updateName} placeholder="name"  /><br /><br />
					<input type="text" value={english} onInput={this.updateEnglish} placeholder="english"  /><br /><br />
					<input type="text" value={securityCode} onInput={this.updateSecurityCode} placeholder="securityCode" />
				</div>
				<br />
				<button className="pd1" onclick={this.handleSubmit}>validate</button><br /><br />
				<div className="pdt1">
					{
                        FStringPrivacy(phone, 3, 4) // 136****8768
					}
				</div>
				<div className="pdt1">{
                        FStringPrivacy(name, 1, 1) // 谢*明
					}
				</div>
				<div className="pdt1">
					时间戳：{timeStamp}<br />
					转时间<br />
					{
                        FTimeStamp(timeStamp, 'yyyy-MM-dd')
					}
				</div>
				<div className="pdt1">
					转中文时间<br />
					{
                        FTimeStamp(timeStamp, 'yyyy-MM-dd', 'Zh')
                    }
				</div>
			</div>
		);
	}
}
