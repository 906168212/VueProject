import {computed, reactive, ref} from "vue";
import {emailType, InputNone} from "@/utils/regular.js";
import {sendEmailCode} from "@/api/sendEmailApi.js";
import {handleCommonFailedResponse} from "@/api/responseHandler/commonResponseHandle.js";
import router from "@/router/index.js";
import {resetIdentify, sendResetEmailCode} from "@/api/resetPasswordApi.js";
import {askSuccessData} from "@/special_assets/js/resetPassword_askAccount.js";

//--------------------------------------Ref板块-----------------------------------------//
export const userInfo = reactive({email:'', emailCode:''})
export const status = reactive({email:'', emailCode:'',error:''})
export const LimitTimestamp = ref(0)     // 限制时间戳
export const coolDown = ref(0) // 验证码发送冷却时间
export const responseError = ref('') //响应错误提示


//--------------------------------------计算板块-----------------------------------------//
export const emailValidation = computed(() => { //邮箱验证
    return emailValidationBody(userInfo.email)
})
export const emailCodeValidation = computed(() => { //验证码验证
    return emailCodeValidationBody(userInfo.emailCode)
})
// 总体错误
export const errorValidation = computed(()=>{
    return errorValidationBody(responseError.value)
})
export const SendEmailAbility= computed(()=>{
    return (emailValidation.value === '' && coolDown.value === 0);
})
export const submitAbility = computed(()=>{
    return emailValidation.value === '' && emailCodeValidation.value === '';
})

//--------------------------------------状态板块-----------------------------------------//
//focus——统一处理方法
export const hideErrorAndShowTIps=(fieldName)=>{status[fieldName] = 'tips'}
//blur——统一处理方法
export const checkAndShowError=(fieldName,validation)=>{status[fieldName] = validation === '' ? 'ok':'error'}


//----------------------------------提交验证板块-------------------------------------------//
export const SendEmailFactor = (event) =>{
    if(!SendEmailAbility.value) event.preventDefault()
}

//---------------------------------------提交板块-----------------------------------------//
export async function submitForm(event) {
    // 获取提交按钮的值
    const submittedButtonValue = event.submitter.value;
    if(submittedButtonValue === 'sendEmail'){
        try {
            // 目标
            await sendResetEmailCode(userInfo.email,LimitTimestamp,responseError,status,coolDown,askSuccessData.reset_uuid)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)
        }
    }else if(submittedButtonValue === 'verify'){
        try {
            await resetIdentify(userInfo,status,responseError,askSuccessData.reset_uuid)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)
        }
    }
}
//----------------------------------------路由--------------------------------------------//
export const changeToReset=()=>{
    router.push('/forget/reset')
}

//---------------------------------验证体板块----------------------------------------------//
const emailValidationBody=(email)=>{
    if(InputNone(email)) return '请填写邮箱';
    else if(!emailType(email)) return '邮箱格式错误'
    else return '';
}
const emailCodeValidationBody = (emailCode) =>{
    if(InputNone(emailCode)) return '请填写验证码'
    else if(emailCode.length !== 6) return '验证码必须为6位'
    else return '';
}
const errorValidationBody = (responseError) =>{
    if (responseError !== '') return responseError
    else return ''
}

