import {computed, reactive, ref} from "vue";
import {InputNone} from "@/utils/regular.js";
import {askAccount} from "@/api/resetPasswordApi.js";
import {handleCommonFailedResponse} from "@/api/responseHandler/commonResponseHandle.js";
import router from "@/router/index.js";

//--------------------------------------Ref板块-----------------------------------------//
export const status = reactive({username:'', error:''})
export const askSuccessData = reactive({maskedEmail:'',reset_uuid:'',identify_uuid:''})
export const username = ref('')
export const responseError = ref('') //响应错误提示
//--------------------------------------计算板块-----------------------------------------//
export const usernameValidation = computed(()=>{
    return usernameValidationBody(username.value)
})
export const errorValidation = computed(()=>{
    return errorValidationBody(responseError.value)
})
//--------------------------------------状态板块-----------------------------------------//
export const hideError=()=>{status.username = 'none';status.error = ''}
export const checkAndShowError=()=>{status.username = usernameValidation.value === '' ? 'ok':'error'}
//---------------------------------------提交板块-----------------------------------------//
export async function submitForm(event) {
    // 获取提交按钮的值
    const submittedButtonValue = event.submitter.value;
    if(submittedButtonValue === 'askAccount'){
        try {
            await askAccount(username.value,responseError,status)
        }catch (error){
            handleCommonFailedResponse(error,status,responseError)}}}
//--------------------------------------路由---------------------------------------------//
export const changeToOption=()=>{
    router.push('/forget/identify')
}
//---------------------------------验证体板块----------------------------------------------//
const usernameValidationBody=(username)=>{
    if(InputNone(username)) return '请输入账号'
    else return ''}
const errorValidationBody = (responseError) =>{
    if (responseError !== '') return responseError
    else return ''}
