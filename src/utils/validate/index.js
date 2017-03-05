/**
 * validate the phone
 *
 * @export
 * @data {String|Number} request
 * @strict {String}
 */
export function VPhone(data, strict) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }

    Str
        ? Str = Str.toString()
        : null;

    const fixStrict = strict || null;

    if (!Str || Str.length !== 11) {
        return ('请输入11位手机号码');
    }

    if (!(/^[0-9]*$/.test(Str))) {
        return ('手机号码格式不正确');
    }

    if (fixStrict !== 'strict' && !(/^1\d{10}$/.test(Str))) {
        return ('请输入以1开头的11位手机号码');
    }

    if (fixStrict === 'strict' && !(/^1[3|4|5|7|8]\d{9}$/.test(Str))) {
        return ('请输入正确手机号码');
    }

    return false;
}

/**
 * validate the name
 *
 * @export
 * @data {String} request
 * @Zh {String} = 'Zh' validate the chinese name
 */
export function VName(data, Zh) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;
    const fixZh = Zh || null;

    if (!Str || Str.length < 1) {
        return ('请输入您的姓名');
    }

    if (fixZh !== 'Zh' && !(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(Str))) {
        return (`姓名请使用非特殊字符`);
    }

    if (fixZh === 'Zh' && Str.length < 2) {
        return ('请输您的真实姓名');
    }

    if (fixZh === 'Zh' && !(/^[\u4e00-\u9fa5]+$/.test(Str))) {
        return ('请输您的真实姓名');
    }

    return false;
}

/**
 * validate the email address
 *
 * @export
 * @data {String} request
 */
export function VEmail(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!Str || Str.length < 1) {
        return ('请输入您的邮箱');
    }

    if (!(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(Str))) {
        return ('请输正确的邮箱地址');
    }

    return false;
}

/**
 * validate the security code
 *
 * @export
 * @data {String} request
 */
export function VSecurityCode(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!Str || Str.length !== 16) {
        return ('请输入16位防伪码');
    }

    if (!(/^[0-9]*$/.test(Str))) {
        return ('您输入的防伪码格式不正确，请重新输入');
    }

    return false;
}

/**
 * validate the bar code
 *
 * @export
 * @data {String} request
 */
export function VBarCode(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!Str || Str.length !== 13) {
        return ('请输入13位产品条形码');
    }

    if (!(/^[0-9]*$/.test(data))) {
        return ('您输入的产品条形码格式不正确，请重新输入');
    }

    return false;
}

/**
 * validate the verification code
 *
 * @export
 * @data {String} request
 * @length {Number} default 4
 */
export function VVerificationCode(data, length) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;
    const fixLength = length || 4;

    if (length && isNaN(fixLength)) {
        return '验证码验证时参数错误';
    }

    if (!Str || Str.length !== fixLength) {
        return (`请输入${fixLength}位验证码`);
    }

    if (!(/^[0-9]*$/.test(Str))) {
        return ('您输入的验证码格式不正确，请重新输入');
    }

    return false;
}

/**
 * validate the required data
 *
 * @export
 * @data {String} request
 * @length {Number} request
 */
export function VRequire(data, length) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;
    const fixLength = length || 1;

    if (isNaN(fixLength) || !Str) {
        return '必填项验证时参数错误';
    }

    if (Str.length < fixLength) {
        return true;
    }

    return false;
}

/**
 * Limit string length
 *
 * @export
 * @data {String} request
 * @length {Number} request
 */
export function VLimit(data, length) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;
    const fixLength = length || 20;

    if (isNaN(fixLength) || !Str) {
        return '限制字符串长度验证时参数错误';
    }

    if (Str.length > fixLength) {
        return true;
    }

    return false;
}

/**
 * input number
 *
 * @export
 * @data {String} request
 */
export function VNumber(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!(/^[0-9]*$/.test(Str))) {
        return true;
    }

    return false;
}

/**
 * input chinese
 *
 * @export
 * @data {String} request
 */
export function VChinese(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!(/^[\u4e00-\u9fa5]+$/.test(Str))) {
        return true;
    }

    return false;
}

/**
 * input English
 *
 * @export
 * @data {String} request
 */
export function VEnglish(data) {
    let Str;

    if (data !== 0) {
        Str = data;
    } else {
        Str = '0';
    }
    
    Str
        ? Str = Str.toString()
        : null;

    if (!(/^[a-zA-Z]*$/.test(Str))) {
        return true;
    }

    return false;
}

/**
 * validate
 *
 * @export
 * @arguments {String|Boolean} request
 */
export default function validate() {
    for (let i = 0; i < arguments.length; i++) {
        const arg = arguments[i];
        const argType = typeof arg;

        if (!arg) {
            continue;
        }

        if (argType === 'string' || argType === 'boolean') {
            return arg;
        } else {
            console.error(`Warning: Failed argument type expected "String|Boolean"  but type of" ${arg} is a ${typeof arg}`);
            continue;
        }
    }

    return false;
}
