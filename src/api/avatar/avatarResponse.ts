import {async} from "fast-glob";
import {takeAccessToken} from "@/utils/utils";
import {tokenAxios} from "@/api/responseHandler/axiosHead";
import axios from "axios";

export const handleAvatarGetUserStat = async ()=>{
    try {
        // 获取最新的 access_token
        const token = takeAccessToken().token;
        if (!token) throw new Error('未登录')
        const response = await tokenAxios('/user',token).get('/stat')
        switch (response.data.code) {
            case 200 :
                return { success : true , data : response.data}
            case 400 :
                return { success : false , error : response.data.message}
            default :
                throw new Error(response.data.message || '未知错误')
        }
    }catch (error) {
        // 统一错误处理
        if (axios.isAxiosError(error)){
            const serverMessage = error.response?.data?.message
            const status = error.response?.status
            return {
                success: false,
                error: serverMessage || `请求失败 (${status || '网络错误'})`
            }
        }
        return { success: false, error: '系统异常，'+error }
    }
}
