import {takeAccessToken} from "@/utils/utils";
import {commonJsonAxios, tokenAxios} from "@/api/responseHandler/axiosHead";
import axios from "axios";

export const getLatestArticles = async (num:number)=>{
    try {
        // const token = takeAccessToken().token;
        // if (! token) throw new Error('请先登录')
        // const response = await tokenAxios('/article', token).post('/latest',{
        //     num : num
        // })
        const response = await commonJsonAxios('/article').post(`/latest?num=${num}`)
        switch (response.data.code){
            case 200:
                return { success : true , data : response.data}
            case 400:
                return { success : false , error : response.data.message}
            default :
                throw new Error(response.data.message || '未知错误')
        }
    }catch (error){
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
