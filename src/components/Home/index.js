import { h, Component } from 'preact';
import validate, { VPhone, VName, VSecurityCode, VEnglish } from './../../utils/validate';
import { FStringPrivacy, FTimeStamp } from './../../utils/fliter';
import s from './style';
import sb from './styleb';

export default class Home extends Component {
	handleSubmit = () => {
		const error = validate(
			VPhone('13845674322'), // return false
			VName('asd@#'), // return 姓名请使用非特殊字符
			VEnglish('jk123123') ? '昵称请使用英文字母' : false, // return 昵称请使用英文字母
			VSecurityCode('1asd21as1') // return 请输入16位防伪码
		);
		if (error) {
			window.alert(error); // 显示错误
			return;
		}
		window.alert('submit ok');
	}

	render() {
		return (
			<div className="pdt2 al-c">
				<h1  className={`${s.root} al-c`}>首页</h1>
				<p className={`${sb.root} al-c pd2`}>Home component.</p>
				<button className="pd1" onclick={this.handleSubmit}>validate</button>
				<div className="pdt1">
					{
                        FStringPrivacy('13622708768', 3, 4) // 136****8768
					}
				</div>
				<div className="pdt1">{
                        FStringPrivacy('谢惠明', 1, 1) // 谢*明
					}
				</div>
				<div className="pdt1">{
                        FTimeStamp('1488454362', 'yyyy-MM-dd', 'Zh') // 2015年01月05日
					}
				</div>
				<div className="pdt1">{
                        FTimeStamp('1488454362', 'yyyy-MM-dd') // 2015-01-05
                    }
				</div>
			</div>
		);
	}
}
