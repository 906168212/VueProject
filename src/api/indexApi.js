import {takeAccessToken} from "@/utils/utils.js";
import {tokenAxios} from "@/utils/commonAxiosCreate.js";
import {handleUserStatSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

export const getUserStat = async ()=>{
    try{
        const token = takeAccessToken().token; // 获取最新的 access_token
        const responseBody = await tokenAxios('user',token).get('/stat')
        return handleUserStatSuccessResponse(responseBody.data)
    }catch (error){
        log.error(error.message)
    }
}
