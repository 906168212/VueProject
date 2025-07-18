import {tokenAxios} from "@/api/responseHandler/axiosHead";
import {takeAccessToken} from "@/utils/utils";
import axios from "axios";

interface cloudLink {
    cloud : number | null ,
    link : string ,
    code :  string
}
interface formData  {
    title : string,
    desc : string,
    content : string,
    coverSrc : string,
    region : {
        rid : number,
        cid : number,
    },
    labels : string[],
    cloudLinks : cloudLink[],
}
export const uploadArticle = async (formData : formData) => {
    try {
        const token = takeAccessToken().token
        if (!token) throw new Error('请先登录')
        const response = await tokenAxios('/contribute',token).post('/article/upload',formData)
        switch (response.data.code){
            case 200 :
                return { success : true , data : response.data}
            case 400 :
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

export const getAllUpdatedArticles = async () =>{
    try {
        const token = takeAccessToken().token
        if (!token) throw new Error('请先登录')
        const response = await tokenAxios('/contribute',token).get('/article/getAll')
        switch (response.data.code){
            case 200 :
                return { success : true , data : response.data}
            case 400 :
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
