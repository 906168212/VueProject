import {email, helpers, required} from "@vuelidate/validators";

export const forgetRules = {
    username : {
        required : helpers.withMessage('用户名不能为空',required),
    },
    emailCode : {
        required : helpers.withMessage('请填写验证码',required),
        validLength : helpers.withMessage('验证码必须为6位',(value:string) => value.length === 6),
        validCharacters : helpers.withMessage('验证码只能为数字',(value:string) => /^\d+$/.test(value))
    }
}
