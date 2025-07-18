import {authFormAxios, tokenAxios} from "@/utils/commonAxiosCreate.js";
import {
    handleLoginSuccessResponse,
    handleLogoutSuccessResponse
} from "@/api/responseHandler/allSuccessResponseHandle.js";
import {takeAccessToken} from "@/utils/utils.ts";

export const doLogin = async (user,response,status)=>{
    try{
        const responseBody = await authFormAxios.post('/login',{
            username:user.username,
            password:user.password,
        });
        return handleLoginSuccessResponse(responseBody.data,user.remember,response,status);
    }catch (error){
        log.error(error.response.data.message)
        response.failure = error.response.data.message;
        status.response = true;
    }
}

export const doLogout = async ()=>{
    try {
        const token = takeAccessToken().token; // 获取最新的 access_token
        const responseBody = await tokenAxios('auth',token).get('/logout')
        return handleLogoutSuccessResponse(responseBody.data)
    }catch (error){
        log.error(error.message)
    }
}
