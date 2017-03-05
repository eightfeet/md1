### Validate Usage

```jsx
    ...
    import validate, { VPhone, VName, VSecurityCode, VEnglish } from './../../utils/validate';
    ...
    export class example extends React.Component {
        constructor(props) {
            this.state = {
            errorMsg: null,
            }
        }
        ...
        handleSubmit = () => {
            const error = validate(
                VPhone('13845674324'), // return false
                VName('asd@#'), // return 姓名请使用非特殊字符
                VEnglish('jk123123') ? '昵称请使用英文字母' : false, // return 昵称请使用英文字母
                VSecurityCode('1asd21as1') // return 请输入16位防伪码
            );
            if (error) {
                this.showModal(error); // 显示错误
                return;
            }

            this.showLoading();
            
            fetch(Api).then( ...
        }
        ...
        render(){
            return <button onClick={this.handleSubmit}>提交</button>;
        }
    }
    export default example;
```
### Validate Method
- VPhone(data, strict)    
验证手机，data: 手机号码，strict: 当第二个参数设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码
- VName(data, Zh)    
验证姓名，data: 姓名，Zh: 当第二个参数设为'Zh'时开启严格验证，只能填写2以上中文字符
- VEmail(data)   
验证邮箱
- VSecurityCode(data)   
验证防伪码
- VBarCode(data)    
验证条形码
- VVerificationCode(data, length)    
验证数字验证码，data: 验证码，length: 验证码的长度(number)不填时默认验证四位验证码。
- VRequire(data, length)  
验证必填，data: 需要验证的内容，length: 最少要求多少位字符(number)不填时默认1个字符。
- VLimit(data, length)   
验证不超过，data: 需要验证的内容，length: 最多输入多少位字符(number)不填时默认20个字符。
- VNumber(data)   
验证数字，data: 需要验证的内容
- VChinese(data)   
验证中文，data: 需要验证的内容
- VEnglish(data)   
验证英文，data: 需要验证的内容