import {computed, reactive, ref} from "vue";
import {dataAssistedVerify} from "@/api/resetPasswordApi.js";
import {handleCommonFailedResponse} from "@/api/responseHandler/commonResponseHandle.js";

//--------------------------------------Ref板块-----------------------------------------//
export const qrCodeSrc = ref("")
export const status = reactive({error: ''})
export const responseError = ref('') //响应错误提示

//--------------------------------------计算板块-----------------------------------------//
export const errorValidation = computed(()=>{
    return errorValidationBody(responseError.value)
})

//---------------------------------------提交板块-----------------------------------------//
export const generateQRCode=async () => {
    try {
        await dataAssistedVerify(qrCodeSrc,responseError,status)
    }catch (error){
        handleCommonFailedResponse(error,status,responseError)
    }
}

//---------------------------------验证体板块----------------------------------------------//
const errorValidationBody = (responseError) =>{
    if (responseError !== '') return responseError
    else return ''
}
