import {authFormAxios, authJsonAxios, qRCodeAxios, resetPasswordJsonAxios} from "@/utils/commonAxiosCreate.js";
import {
    handleAskAccountSuccessResponse, handleDataAssistedVerifySuccessResponse,
    handleResetIdentifySuccessResponse, handleResetSuccessResponse
} from "@/api/responseHandler/allSuccessResponseHandle.js";
import {qrCodeSrc} from "@/special_assets/js/resetPassword_dataAssist.js";
// 找回密码-用户查找API
export async function askAccount(username,responseError,status){
    try {
        const responseData = await authFormAxios.post('/askAccount',{
            username: username
        });
        return handleAskAccountSuccessResponse(responseData.data, responseError, status);
    }catch (error){
        throw error; // 抛出错误到最外层处理
    }
}
// 找回密码 - 发送邮箱验证码
export async function sendResetEmailCode(email,LimitTimestamp,responseError,status,coolDown,reset_uuid){ // 邮箱发送
    try {
        const response = await resetPasswordJsonAxios.post('/askResetPasswordEmailCode',{
            email:email,
            reset_uuid:reset_uuid
        });
        return handleAskCodeSuccessResponse(response.data,LimitTimestamp,responseError,status,coolDown);
    }catch (error){
        throw error; // 抛出错误到最外层处理
    }
}


// 找回密码-邮箱验证码验证
export async function resetIdentify(userInfo,status,responseError,reset_uuid){
    try {
        const responseData = await resetPasswordJsonAxios.post('/resetIdentify',{
            email:userInfo.email,
            emailCode:userInfo.emailCode,
            reset_uuid:reset_uuid
        })
        return handleResetIdentifySuccessResponse(responseData.data,responseError,status)
    }catch (error){
        throw error // 抛出错误到最外层处理
    }
}

// 找回密码-资料辅助验证
export async function dataAssistedVerify(qrCodeSrc,responseError,status){
    try {
        const responseData = await qRCodeAxios.get('/generateQRCode')
        return handleDataAssistedVerifySuccessResponse(responseData.data,responseError,status)
    }catch (error){
        throw error // 抛出错误到最外层处理
    }
}

// 找回密码-重置密码
export async function resetPassword(userInfo,status,responseError,identify_uuid,reset_uuid){
    try{
        const responseData = await resetPasswordJsonAxios.post('/resetPassword',{
            new_password: userInfo.password,
            reset_uuid:reset_uuid,
            identify_uuid: identify_uuid
        })
        return handleResetSuccessResponse(responseData.data,responseError,status)
    }catch (error){
        throw error // 抛出错误到最外层处理
    }
}




