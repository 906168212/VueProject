import axios from "axios";
import {takeAccessToken} from "@/utils/utils.js";

export const authJsonAxios =  axios.create({
    baseURL: 'http://localhost:8081/api/auth',
    headers:{'Content-Type':'application/json;charset=utf-8'}
})

export const authFormAxios =  axios.create({
    baseURL: 'http://localhost:8081/api/auth',
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
})

export const resetPasswordJsonAxios = axios.create({
    baseURL: 'http://localhost:8081/api/resetPassword',
    headers:{'Content-Type':'application/json;charset=utf-8'}
})

export const qRCodeAxios = axios.create({
    baseURL: 'http://localhost:8081/api/QRCode',
    // responseType: 'arraybuffer'
})


export const tokenAxios = (mapping,token) =>{
    return axios.create({
        baseURL:'http://localhost:8081/api/'+mapping,
        headers:{'Authorization': 'Bearer ' + token}
    })
}

export const simpleAxios = (mapping)=>{
    return axios.create({
        baseURL:'http://localhost:8081/api/'+mapping
    })
}
