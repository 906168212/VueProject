//-----------------------------------------API---------------------------------------//

import {authFormAxios} from "@/utils/commonAxiosCreate.js";
import {handleAskCodeSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

// 邮箱API
export async function sendEmailCode(email,response,showError,coolDown){ // 邮箱发送
    try {
        const response = await authFormAxios.post('/askRegisterCode',{
            email:email
        });
        return handleAskCodeSuccessResponse(response.data,response,showError,coolDown);
    }catch (error){
        log.error(error.message)
        console.log(error.message)
        response.failure = error.message
        showError.response = true
    }
}
