import {computed, reactive, ref} from "vue";
import {HasBlank, HasMultipleTypes, HasRepeatingChars, InputNone, ValidLength} from "@/utils/regular.js";
import * as Constants from "@/utils/constants.ts";
import {handleCommonFailedResponse} from "@/api/responseHandler/commonResponseHandle.js";
import {resetPassword} from "@/api/resetPasswordApi.js";
import router from "@/router/index.js";
import {askSuccessData} from "@/special_assets/js/resetPassword_askAccount.js";

//--------------------------------------Ref板块-----------------------------------------//
export const userInfo = reactive({password:'',repeatPassword:''})
export const status = reactive({password:'',repeatPassword:'',error:''})
export const show = reactive({password:false,repeatPassword:false})
export const responseError = ref('') //响应错误提示

//--------------------------------------计算板块-----------------------------------------//
//密码
export const passwordValidation = computed(() => { //密码验证
    return passwordValidationBody(userInfo.password)
})
export const repeatPasswordValidation = computed(() => { //密码验证
    return repeatPasswordValidationBody(userInfo.repeatPassword)
})
export const errorValidation = computed(()=>{
    return errorValidationBody(responseError.value)
})
export const submitAbility =computed(()=>{
    return submitAbilityBody(passwordValidation,repeatPasswordValidation)
})

//--------------------------------------状态板块-----------------------------------------//
//focus——统一处理方法
export const hideErrorAndShowTIps=(fieldName)=>{status[fieldName] = 'tips'}
//blur——统一处理方法
export const checkAndShowError=(fieldName,validation)=>{status[fieldName] = validation === '' ? 'ok':'error'}

//----------------------------------提交验证板块-------------------------------------------//

//------------------------------------提交板块---------------------------------------------//
export async function submitForm(event) {
    // 获取提交按钮的值
    const submittedButtonValue = event.submitter.value;
    if(submittedButtonValue === 'reset'){
        try {
            await resetPassword(userInfo,status,responseError,askSuccessData.identify_uuid,askSuccessData.reset_uuid)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)}}}
//--------------------------------------路由-----------------------------------------------//
export const changeToLogin=()=>{
    router.push('/')
}

//------------------------------------验证体板块--------------------------------------------//
const passwordValidationBody = (password) =>{
    if(InputNone(password)) return  '密码不能为空';
    else if(HasBlank(password)) return '不能包括空格';
    else if(!ValidLength(password,Constants.MIN_PASSWORD_LENGTH,Constants.MAX_PASSWORD_LENGTH)) return '长度为8-16个字符';
    else if(!HasMultipleTypes(password)) return '必须包含字母、数字、符号中至少2种';
    else if(HasRepeatingChars(password)) return '请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456';
    else return '';
}
const repeatPasswordValidationBody=(repeatPassword)=>{
    if(repeatPassword !== userInfo.password) return '输入密码不一致';
    else return '';
}
const errorValidationBody = (responseError) =>{
    if (responseError !== '') return responseError
    else return ''
}
const submitAbilityBody=(passwordValidation,repeatPasswordValidation)=>{
    return passwordValidation.value === '' && repeatPasswordValidation.value === '';
}
