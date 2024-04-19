import {simpleAxios, tokenAxios} from "@/utils/commonAxiosCreate.js";
import {
    handleArticleDisplaySuccessResponse,
    handleGetAllArticleSuccessResponse,
    handleRightRegionSuccessResponse
} from "@/api/responseHandler/allSuccessResponseHandle.js";
import {takeAccessToken} from "@/utils/utils.js";

export const getAllUserArticle = async ()=>{
    try {
        const token = takeAccessToken().token; // 获取最新的 access_token
        const responseBody = await tokenAxios('article',token).get('/all')
        return handleGetAllArticleSuccessResponse(responseBody.data)
    }catch (error){
        log.error(error.message)
    }
}

export const getArticle = async (status,article,rid)=>{
    try {
        // const
        const responseBody = await simpleAxios('article').get('/dynamic/region?'+`rid=${rid}`)
        return handleArticleDisplaySuccessResponse(responseBody.data,status,article)
    }catch (error){
        log.error(error.message)
    }
}

export const getRecommendArticle = async (status,article,pt)=>{
    try {
        const responseBody = await simpleAxios('article').get('/recommend?'+`pt=${pt}`)
        return handleArticleDisplaySuccessResponse(responseBody.data,status,article)
    }catch (error){
        log.error(error.message)
    }
}

export const getUpdateRegionArticle = async (status,article,pt)=>{
    try {
        const responseBody = await simpleAxios('article').get('/update/region?'+`pt=${pt}`)
        return handleRightRegionSuccessResponse(responseBody.data,status,article)
    }catch (error){
        log.error(error.message)
    }
}

export const getRankingRegionArticle = async (status,article,rid)=>{
    try {
        const responseBody = await simpleAxios('article').get('/ranking/region?'+`rid=${rid}`)
        return handleRightRegionSuccessResponse(responseBody.data,status,article)
    }catch (error){
        log.error(error.message)
    }
}
