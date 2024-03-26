//无输入

import {computed, toRefs} from "vue";

export function InputNone(char){
    return  char.length === 0;
}

export function createIsBlank(charRefGetter){
    return computed(()=>{
        const charRef = charRefGetter();
        return charRef.length === 0;
    })
}


//空格
export function HasBlank(char){
    return /\s/.test(char);
}

//有效位数
export function ValidLength(char,min,max){
    return char.length >= min && char.length <= max;
}

//三者包含字符、数字、字母至少两个
export function HasMultipleTypes(char){
    let hasLetter = /[a-zA-Z]/.test(char);
    let hasNumber = /\d/.test(char);
    let hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(char);

    return (hasLetter + hasNumber + hasSymbol) >= 2;
}

export function HasChinese(char){
    return /[\u4e00-\u9fa5]/.test(char)
}

//三者，必须包含数字和字母，不包含字符，中文、空格
export function HasLetterAndNumberButSymbolChinese(char){
    let hasLetter = /[a-zA-Z]/.test(char);
    let hasNumber = /\d/.test(char);
    let NoSymbol = !(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(char));
    let NoChinese = !(/[\u4e00-\u9fa5]/.test(char))
    return (hasLetter + hasNumber + NoSymbol+ NoChinese) === 4;

}

//重复6位以上字母或数字，如abcdefg、1111111、0123456
export function HasRepeatingChars(char){
    return /(?=.*(?:1234567|2345678|3456789|4567890|abcdefg|ABCDEFGHIJKLMNOPQRSTUVWXYZ)|([a-zA-Z0-9])\1{6,})[0-9a-zA-Z]{7,}/.test(char);
}

//邮箱规则
export function emailType(char){
    return  /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,7}$/.test(char)
}
