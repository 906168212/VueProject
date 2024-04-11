import {simpleAxios} from "@/utils/commonAxiosCreate.js";
import {
    handleArticleDisplaySuccessResponse, handleRightRegionSuccessResponse
} from "@/api/responseHandler/allSuccessResponseHandle.js";



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
