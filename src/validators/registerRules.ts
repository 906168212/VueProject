// 注册用 验证规则

// ------------------自定义验证规则--------------------//
// 不能有空格
import {email, helpers, required, sameAs} from "@vuelidate/validators";
import * as Constants from "@/utils/constants";

const noWhiteSpace = (value: string) => !/\s/.test(value)
// 符合特征的样式 字母+数字，无特殊字符
const hasValidCharTypes = (value : string) =>
    /^(?=.*[a-zA-Z])(?=.*\d)[^\W_]+$/.test(value) // 字母+数字，无特殊字符
// 三者包含字符、数字、字母至少两个
const hasMultipleCharTypes = (value : string) =>
    [/[a-zA-Z]/,/\d/,/[\W_]/].filter(re=>re.test(value)).length >= 2
// 无连续、重复6位以上字母或数字，如abcdefg、1111111、0123456
const noRepeatingChars = (value : string) =>
    !/(?=.*(?:0123456|1234567|2345678|3456789|4567890|abcdefg|ABCDEFGHIJKLMNOPQRSTUVWXYZ)|([a-zA-Z0-9])\1{6,})[0-9a-zA-Z]{7,}/.test(value)


export const registerRules = {
    // 用户名
    username : {
        required : helpers.withMessage('用户名不能为空',required),
        noWhiteSpace : helpers.withMessage('不能包括空格',noWhiteSpace),
        validLength : helpers.withMessage(
            '长度为'+Constants.MIN_USERNAME_LENGTH+'-'+Constants.MAX_USERNAME_LENGTH+'个字符',
            (value:string) => value.length >= Constants.MIN_USERNAME_LENGTH &&
                value.length <= Constants.MAX_USERNAME_LENGTH
        ),
        validCharacters : helpers.withMessage(
            '必须包含字母、数字，不包含特殊字符，中文',
            hasValidCharTypes
        )
    },
    password : {
        required : helpers.withMessage('密码不能为空',required),
        noWhiteSpace : helpers.withMessage('不能包括空格',noWhiteSpace),
        validLength : helpers.withMessage(
            '长度为'+Constants.MIN_PASSWORD_LENGTH+'-'+Constants.MAX_PASSWORD_LENGTH+'个字符',
            (value:string) => value.length >= Constants.MIN_PASSWORD_LENGTH &&
                value.length <= Constants.MAX_PASSWORD_LENGTH
        ),
        validCharacters : helpers.withMessage(
            '必须包含字母、数字、符号中至少2种',
            hasMultipleCharTypes
        ),
        RepeatingCharsValid : helpers.withMessage(
            '请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456',
            noRepeatingChars
        )
    },
    email : {
        required : helpers.withMessage('邮箱不能为空',required),
        validEmail : helpers.withMessage('邮箱格式错误',email)
    },
    emailCode : {
        required : helpers.withMessage('请填写验证码',required),
        validLength : helpers.withMessage('验证码必须为6位',(value:string) => value.length === 6),
        validCharacters : helpers.withMessage('验证码只能为数字',(value:string) => /^\d+$/.test(value))
    },
    agreement :{
        required : helpers.withMessage('请先同意服务条款和隐私政策',required), // 必须勾选
        sameAs : helpers.withMessage('请先同意服务条款和隐私政策',sameAs(true)) // 必须等于 true（显式声明）
    }
}
