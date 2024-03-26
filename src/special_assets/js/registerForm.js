// 计算邮箱是否为空
import {
    emailType,
    HasBlank,
    HasLetterAndNumberButSymbolChinese, HasMultipleTypes, HasRepeatingChars,
    InputNone,
    ValidLength
} from "@/utils/regular.js";
import {computed, reactive, ref} from "vue";
import * as Constants from "@/utils/constants.js";
import {sendEmailCode} from "@/api/sendEmailApi.js";
import {submitRegisterForm} from "@/api/RegisterApi.js";
import {handleCommonFailedResponse} from "@/api/responseHandler/commonResponseHandle.js";


//--------------------------------------Ref板块-----------------------------------------//
export const userInfo = reactive({ //用户注册信息
    username: '',
    password: '',
    email: '',
    emailCode: ''
});
export const status = reactive({ // 状态信息
    username:'',
    password:'',
    email:'',
    emailCode:'',
    error:''
})
export const showEmailCode = ref(false) // 显示验证码框
export const showPassword = ref(false);    // 显示密码
export const agreeFlagButton = ref(false) // 开关量
export const LimitTimestamp = ref(0)     // 限制时间戳
export const coolDown = ref(0) // 验证码发送冷却时间
export const responseError = ref('') //响应错误提示

//--------------------------------------计算板块-----------------------------------------//
//账号
export const usernameValidation = computed(() => { //用户名验证
    return usernameValidationBody(userInfo.username)
})
//密码
export const passwordValidation = computed(() => { //密码验证
    return passwordValidationBody(userInfo.password)
})
// 邮箱
export const emailValidation = computed(() => { //邮箱验证
    return emailValidationBody(userInfo.email)
})

//验证码
export const emailCodeValidation = computed(() => { //验证码验证
    return emailCodeValidationBody(userInfo.emailCode)
})
//协议标志
export const agreeFlagButtonValidation = computed(() =>{
    return agreeFlagButtonValidationBody(agreeFlagButton.value)
})
// 总体错误
export const errorValidation = computed(()=>{
    return errorValidationBody(agreeFlagButtonValidation.value,responseError.value)
})
// 是否可以发送邮件
export const SendEmailAbility= computed(()=>{
    return (emailValidation.value === '' && agreeFlagButtonValidation.value === '' && coolDown.value === 0);
})

//--------------------------------------状态板块-----------------------------------------//

//邮箱
export const hideEErrorAndShowEmailCode=() =>{ // 隐藏邮箱错误，显示验证码框
    showEmailCode.value = true;
    status.email = 'tips'
}
// 协议同意
export const toggleAgreeFlagButton=()=>{
    agreeFlagButton.value = !agreeFlagButton.value;
    if(!agreeFlagButton.value) status.error = 'error'
    else status.error = ''
}
//focus——统一处理方法
export const hideErrorAndShowTIps=(fieldName)=>{status[fieldName] = 'tips'}
//blur——统一处理方法
export const checkAndShowError=(fieldName,validation)=>{status[fieldName] = validation === '' ? 'ok':'error'}

//----------------------------------提交验证板块-------------------------------------------//
export const SendEmailFactor = (event) =>{
    !agreeFlagButton.value ? status.error = 'error' : status.error = '';
    if(!SendEmailAbility.value) event.preventDefault()
}
export const checkAllError=(event)=>{
    checkAndShowError('username',usernameValidation.value)
    checkAndShowError('password',passwordValidation.value)
    checkAndShowError('email',emailValidation.value)
    checkAndShowError('emailCode',emailCodeValidation.value)
    checkAndShowError('error',errorValidation.value)
    if(status.username === 'error'|| status.password === 'error'||status.email=== 'error' || status.emailCode === 'error'|| status.error==='error' ){
        event.preventDefault();
        if(status.emailCode === 'error') showEmailCode.value = true;
    }
}

//---------------------------------------提交板块-----------------------------------------//
export async function submitForm(event) {
    // 获取提交按钮的值
    const submittedButtonValue = event.submitter.value;
    if(submittedButtonValue === 'sendEmail'){
        try {
            // 目标
            await sendEmailCode(userInfo.email,LimitTimestamp,responseError,status,coolDown)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)
        }
    }else if(submittedButtonValue === 'register'){
        try {
            await submitRegisterForm(userInfo,responseError,status)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)
        }
    }
}

//---------------------------------验证体板块----------------------------------------------//
const usernameValidationBody = (username) =>{
    if(InputNone(username)) return '用户名不能为空';
    else if(HasBlank(username)) return '不能包括空格';
    else if(!ValidLength(username,Constants.MIN_USERNAME_LENGTH,Constants.MAX_USERNAME_LENGTH)) return '长度为10-20个字符';
    else if(!HasLetterAndNumberButSymbolChinese(username)) return '必须包含字母、数字，不包含特殊字符，中文';
    else return '';
}

const passwordValidationBody = (password) =>{
    if(InputNone(password)) return  '密码不能为空';
    else if(HasBlank(password)) return '不能包括空格';
    else if(!ValidLength(password,Constants.MIN_PASSWORD_LENGTH,Constants.MAX_PASSWORD_LENGTH)) return '长度为8-16个字符';
    else if(!HasMultipleTypes(password)) return '必须包含字母、数字、符号中至少2种';
    else if(HasRepeatingChars(password)) return '请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456';
    else return '';
}
const emailValidationBody = (email) =>{
    if(InputNone(email)) return '请填写邮箱';
    else if(!emailType(email)) return '邮箱格式错误'
    else return '';
}
const emailCodeValidationBody = (emailCode) =>{
    if(InputNone(emailCode)) return '请填写验证码'
    else if(emailCode.length !== 6) return '验证码必须为6位'
    else return '';
}
const agreeFlagButtonValidationBody = (agreeFlagButton) =>{
    if(!agreeFlagButton) return "请先同意服务条款和隐私政策"
    else return ""
}
const errorValidationBody = (agreeFlagButtonValidation,responseError) =>{
    if(agreeFlagButtonValidation !== '') return agreeFlagButtonValidation
    else if (responseError !== '') return responseError
    else return ''
}

