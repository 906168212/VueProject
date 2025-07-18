import {commonFormAxios} from "@/api/responseHandler/axiosHead";
import axios from "axios";

interface FormData {
    usernameOrEmail: string,
    password: string
}

export const handleLogin = async (formData : FormData)=>{
    try {
        const response = await commonFormAxios('/auth').post('/login',{
            username : formData.usernameOrEmail,
            password : formData.password
        })
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
        return { success: false, error: '系统异常，请稍后再试' }
    }
}
