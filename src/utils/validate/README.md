### Validate Usage

```jsx
    ...
    import validate from './../../utils/validate';
    ...
    export class example extends React.Component {
        ...
        handleSubmit = () => {
            const error = validate({
				VPhone: ['11845674324', '请输入正确手机号码', 'strict'], // return 请输入正确手机号码
				VName: 'asd@#', // return 姓名请使用非特殊字符
				VEnglish: ['jk123123', '请使用英文名'], // return 请使用英文名
				VSecurityCode: '1asd21as1' // return 请输入16位防伪码
			});

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
### Validate 键值属性（String or Array）       

- VPhone(data, Msg, strict)    
```jsx
	validate({VPhone: [data, Msg, strict]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证电话号码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| strict  | 开启严格模式 | string |  设为'strict'时开启严格验证，不填时只验证已1开头的11位手机号码 |

- VName(data, Msg, Zh)    
```jsx
	validate({VName: [data, Msg, Zh]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证名字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| Zh  | 开启严格模式 | string |  设为'Zh'时开启严格验证，只能填写2以上中文字符 |

- VEmail(data, Msg)   
```jsx
	validate({VEmail: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证email |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VSecurityCode(data, Msg)   
```jsx
	validate({VSecurityCode: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证防伪码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VBarCode(data, Msg)    
```jsx
	validate({VBarCode: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证条形码 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |

- VVerificationCode(data, Msg, length)    
```jsx
	validate({VVerificationCode: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证名字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  不填时显示默认提示信息 |
| length  | 开启严格模式 | number |  验证码的长度(number)不填时默认验证4位验证码 |

- VRequire(data, Msg, length)  
```jsx
	validate({VRequire: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证最少字符数 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |
| length  | 开启严格模式 | number |  最少要求多少位字符(number)不填时默认1个字符 |

- VLimit(data, Msg, length)   
```jsx
	validate({VLimit: [data, Msg, length]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证最大字符数 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |
| length  | 开启严格模式 | number |  length: 最多输入多少位字符(number)不填时默认20个字符 |

- VNumber(data, Msg)   
```jsx
	validate({VNumber: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证数字 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |

- VChinese(data, Msg)   
```jsx
	validate({VChinese: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
|  data | 验证中文 |  string | 必填  |
| Msg  |  错误返回信息 | string  |  必填 |

- VEnglish(data, Msg)   
```jsx
	validate({VEnglish: [data, Msg]})
```

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
data | 验证英文 |  string | 必填  
Msg  |  错误返回信息 | string  |  必填 
