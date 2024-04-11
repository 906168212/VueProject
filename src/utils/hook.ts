// 此处用于存放数据懒加载逻辑的函数

import {useIntersectionObserver} from "@vueuse/core";
import {getArticle, getRankingRegionArticle, getRecommendArticle, getUpdateRegionArticle} from "../api/articleApi.js"
export const lazyLoad = (target, binding)=>{
    // el 指令绑定得那个元素
    // binding: binding.value 指令等于号后面绑定得表达式得值 这里指图片url地址
    // 开始检查dom元素是否进入视窗
    // observer 被观察的dom
    const {stop} = useIntersectionObserver(target,([{ isIntersecting }],observer)=>{
        if(isIntersecting){ // 进入视窗
            stop()
            if(binding.value.rid === undefined){ // 标明是推荐栏目
                getRecommendArticle(binding.value.status,binding.value.article,binding.value.pt)
                getUpdateRegionArticle(binding.value.status,binding.value.update,binding.value.pt)
            }else {
                getArticle(binding.value.status,binding.value.article,binding.value.rid)
                getRankingRegionArticle(binding.value.status,binding.value.ranking,binding.value.rid)
            }
        }
    },
        {threshold:0.1} //根据需要调整加载阈值
)}

