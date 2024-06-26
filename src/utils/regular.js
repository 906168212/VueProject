//无输入

export function InputNone(char){
    return  char.length === 0;
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

// 时间显示规则-简略
export const simpleTimeRegular=(time)=>{
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    if(typeof time === "number"){
        const articleDate = new Date(time)
        const articleYear = articleDate.getFullYear()
        const articleMouth = articleDate.getMonth()+1 //date月份从0开始
        const articleDay = articleDate.getDate()
        if(articleYear === currentYear) return `${articleMouth}-${articleDay}`
        else return `${articleYear}-${articleMouth}-${articleDay}`
    }
}

// 时间显示规则-详细
export const fullTimeRegular=(time)=>{
    const date = new Date(time);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

export const getCurrentTime=()=>{
    const date = new Date()
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

// 数量显示规则
export const numberRegular=(num)=>{
    if(num>=10000 && num < 10000000) return (num / 10000).toFixed(1) + '万';
    else if(num>= 10000000) return (num / 10000000).toFixed(1)+'千万';
    else return num.toString();
}

// level svg名称填充
export const levelSvgName=(level)=>{
    if(level>6) level = 6
    else if(level<1) level = 1
    return 'user_level_'+level
}
