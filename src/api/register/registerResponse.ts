import {commonJsonAxios} from "@/api/responseHandler/axiosHead";
import axios from "axios";
interface registerResponse {
    code : number,
    message : string
}

interface FormData {
    email : string,
    emailCode : string,
    username : string,
    password : string,
    agreement : boolean
}

export const handleRegister = async (formData : FormData)=>{
    try {
        const response = await commonJsonAxios('/auth').post('/register',{
            username : formData.username,
            password : formData.password,
            mail : formData.email,
            code : formData.emailCode,
        })
        switch (response.data.code){
            case 200 :
                return { success : true , data : response.data}
            case 400 :
                return { success : false , error : response.data.message}
            default :
                throw new Error(response.data.message || '未知错误')
        }
    }catch (error){
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
