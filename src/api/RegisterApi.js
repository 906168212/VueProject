import {authJsonAxios} from "@/utils/commonAxiosCreate.js";
import {handleRegisterSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

export async function submitRegisterForm(userData,responseError,status){ // 注册
    try {
        const response = await authJsonAxios.post('/register',{
            username:userData.username,
            password:userData.password,
            mail:userData.email,
            code:userData.emailCode
        });
        return handleRegisterSuccessResponse(response.data,responseError,status);
    }catch (error){
        throw error; // 抛出错误以供处理
    }
}






