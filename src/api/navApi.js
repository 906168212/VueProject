import {tokenAxios} from "@/utils/commonAxiosCreate.js";
import {takeAccessToken} from "@/utils/utils.js";
import {handleUserNavSuccessResponse} from "@/api/responseHandler/allSuccessResponseHandle.js";

const getNav = async ()=>{
    try {
        const token = takeAccessToken().token; // 获取最新的 access_token
        const responseBody = await tokenAxios('user',token).get('/nav')
        return handleUserNavSuccessResponse(responseBody.data)
    }catch (error){
        log.error(error.message)
    }
}

export const Nav= async ()=>{
    await getNav()
}
