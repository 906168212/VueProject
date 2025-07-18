import axios from "axios";

interface AxiosConfig {
    baseURL: string;
    headers: {}
}


const axiosFormConfig = (mapping:string) : AxiosConfig => {
    return {
        baseURL : 'http://localhost:8081/api'+mapping,
        headers:{'Content-Type':'application/x-www-form-urlencoded'}
    }
}

const axiosJsonConfig = (mapping:string) : AxiosConfig => {
    return {
        baseURL : 'http://localhost:8081/api'+mapping,
        headers:{'Content-Type':'application/json;charset=utf-8'}
    }
}

const tokenAxiosConfig = (mapping:string,token:string) : AxiosConfig =>{
    return {
        baseURL : 'http://localhost:8081/api'+mapping,
        headers:{'Authorization':'Bearer '+token}
    }
}

export const commonFormAxios = (mapping:string) => axios.create(axiosFormConfig(mapping))

export const commonJsonAxios = (mapping:string) => axios.create(axiosJsonConfig(mapping))
export const tokenAxios = (mapping:string,token:string) => axios.create(tokenAxiosConfig(mapping,token))
