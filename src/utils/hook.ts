// 此处用于存放数据懒加载逻辑的函数

import {useIntersectionObserver} from "@vueuse/core";
import {getArticle, getRankingRegionArticle, getRecommendArticle, getUpdateRegionArticle} from "../api/articleApi.js"
import {LazyBindingValue} from "@/interface/interface";

export const useLazyLoad = (target:any,callback:any,options?:any) => {
    const {stop} = useIntersectionObserver(
        target,
        ([{ isIntersecting }],observer)=>{
            if(isIntersecting){ // 进入视窗
                stop()
                callback()
            }
        },
        {threshold:0.3,...options}
    )
    return {stop}
}

