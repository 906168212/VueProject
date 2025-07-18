import {tokenAxios} from "@/utils/commonAxiosCreate.js";
import {takeAccessToken} from "@/utils/utils.ts";
import {handleUserNavSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

export const getNav = async (Nav)=>{
    try {
        const token = takeAccessToken().token; // 获取最新的 access_token
        const responseBody = await tokenAxios('user',token).get('/nav')
        return handleUserNavSuccessResponse(responseBody.data,Nav)
    }catch (error){
        log.error(error.message)
    }
}

export const Nav= async ()=>{
    await getNav()
}
