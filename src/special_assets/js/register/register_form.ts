import {computed, reactive, ref} from "vue";
import {
    emailType, HasBlank, HasLetterAndNumberButSymbolChinese, HasMultipleTypes, HasRepeatingChars,
    InputNone, ValidLength
} from "../../../utils/regular.js"
import * as Constants from "../../../utils/constants.js";
import {sendEmailCode} from "../../../api/sendEmailApi.js"
class Show{
    password = false
    emailCode = false
}
class Tips{
    password = false
    username = false
}
class Response {
    success = ''
    failure = ''
}
class Show_error{
    username = ref<null | boolean>(null)
    password = ref<null | boolean>(null)
    email = false
    emailCode = false
    agreement = false
    response = false
}
class RegisterForm{
    username = ''
    password = ''
    email = ''
    email_code = ''
    agreement = false
}
export const show = reactive(new Show())
export const tips = reactive(new Tips())
export const show_error = reactive(new Show_error())
export const response =  reactive(new Response())
export const registerForm = reactive(new RegisterForm())
export const coolDown = ref(0) // 验证码发送冷却时间
export const getAgreement = ()=> registerForm.agreement //getter

export const resetData =()=>{
    Object.assign(show,new Show())
    Object.assign(tips,new Tips())
    Object.assign(show_error,new Show_error())
    Object.assign(response,new Response())
    Object.assign(registerForm,new RegisterForm())
    coolDown.value = 0
}

export const hideError = (errorName)=>{
    show_error[errorName] = false;
}
export const hideErrorAndShowTips=(name)=>{
    show_error[name] = false;
    tips[name] = true;
}
export const hideErrorAndShowEmailCode=()=>{
    show_error.email = false;
    show.emailCode = true;
}

export const checkContent = (errorName,validation)=>{
    show_error[errorName] = validation !== ''
}
export const checkContentAndHideTips = (name,validation)=>{
    show_error[name] = validation !== ''
    tips[name] = false;
}

export const isShowAgreementError = (agreement)=>{
    show_error.agreement = !agreement;
}

export const toggleToTrue = ()=>{
    show.password = true;
}
export const toggleToFalse = ()=>{
    show.password = false;
}


//--------------------------------------提交板块-----------------------------------------//
const sendEmail_check = ()=>{
    if(!isCanSendEmail.value){
        if(!registerForm.agreement) show_error.agreement = true;
        throw new Error('缺少条件')
    }
}
const register_check = ()=>{
    checkContent('username',usernameValidation)
    checkContent('password',passwordValidation)
    checkContent('email',emailValidation)
    checkContent('emailCode',emailCodeValidation)
    if(show_error.username || show_error.password || show_error.email || show_error.emailCode || !registerForm.agreement){
        if(show_error.emailCode) show.emailCode = true
        if(!registerForm.agreement) show_error.agreement = true
        throw new Error('缺少条件')
    }
}

export const submitForm = async (event)=>{
    const submitValue = event.submitter.value
    if(submitValue === 'send_email'){
        try{
            await sendEmail_check()  // 异步执行，确保检查完毕
            await sendEmailCode(registerForm.email,response,show_error,coolDown)
        }catch (error){}
    }else if(submitValue === 'register'){
        try{
            await register_check()
            console.log(6666)
        }catch (error){}
    }
}

//--------------------------------------计算板块-----------------------------------------//
//账号
export const usernameValidation = computed(() => { //用户名验证
    return usernameValidationBody(registerForm.username)
})
//密码
export const passwordValidation = computed(() => { //密码验证
    return passwordValidationBody(registerForm.password)
})
// 邮箱
export const emailValidation = computed(() => { //邮箱验证
    return emailValidationBody(registerForm.email)
})
//验证码
export const emailCodeValidation = computed(() => { //验证码验证
    return emailCodeValidationBody(registerForm.email_code)
})
// 总体错误
export const responseValidation = computed(()=>{
    return responseValidationBody()
})
// 是否可以发送邮件
export const isCanSendEmail = computed(()=>{
    return emailValidation.value === '' && registerForm.agreement && coolDown.value === 0
})

//验证板块
const usernameValidationBody = (username)=>{
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

const responseValidationBody = ()=>{
    if(!registerForm.agreement) return '请先同意服务条款和隐私政策'
    else if (response.failure!='') return response.failure
    else return ''
}

