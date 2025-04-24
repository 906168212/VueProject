import {authJsonAxios} from "@/utils/commonAxiosCreate.js";
import {handleRegisterSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

export async function submitRegisterForm(userData,response,showError){ // 注册
    try {
        const response = await authJsonAxios.post('/register',{
            username:userData.username,
            password:userData.password,
            mail:userData.email,
            code:userData.email_code
        });
        return handleRegisterSuccessResponse(response.data,response,showError);
    }catch (error){
        log.error(error.message)
        console.log(error.message)
        response.failure = error.message
        showError.response = true
    }
}






