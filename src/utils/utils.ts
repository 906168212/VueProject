import router from "@/router/index.js";
import store from "@/store/index.js";
import errorImage_webp from "@/assets/image/errorImage.webp"
import errorImage_avif from "@/assets/image/errorImage.avif"
import errorImage from "@/assets/image/errorImage.png"
import defaultUser_avif from "@/assets/image/default_user.avif"
import defaultUser_webp from "@/assets/image/default_user.webp"
import defaultUser from "@/assets/image/default_user.png"
import {cardInfo} from "@/api/dataInfo.js";
import {fullTimeRegular, numberRegular, simpleTimeRegular} from "@/utils/regular.js";
import {getUserStat} from "@/api/indexApi.js";
import {handleAvatarGetUserStat} from "@/api/avatar/avatarResponse";

export function backLogin(backTime,push){
    // 设置定时器，每秒更新一次冷却时间
    const timer = setInterval(() => {
        if (backTime > 0) {
            backTime --;
        } else {
            clearInterval(timer);
            router.push(push)
        }
    }, 1000);
}



export const storeAccessToken =(token,remember,expire)=>{
    const authObj = {token:token,expire:expire}
    const str = JSON.stringify(authObj)
    if(remember)
        localStorage.setItem("halihapi_ticket",str)
    else
        sessionStorage.setItem("halihapi_ticket",str)
}

export const deleteAccessToken=()=>{
    localStorage.removeItem("halihapi_ticket")
    sessionStorage.removeItem("halihapi_ticket")
}

export const takeAccessToken=()=>{
    const location = JSON.parse(localStorage.getItem("halihapi_ticket") ?? 'null');
    const session = JSON.parse(sessionStorage.getItem("halihapi_ticket") ?? 'null');
    if(location) return location
    else if(session) return session
    else return null
}

export const handleScroll=()=>{
    //获取导航到顶部的距离
    const scrollY = window.scrollY
    if(scrollY>35) store.dispatch('header/canScrolledBar')
    else store.dispatch('header/noScrolledBar')
    if(scrollY>310) store.dispatch('header/canScrolledChannel')
    else store.dispatch('header/noScrolledChannel')
}


export function onImageError(article){
    article.pic_avif = errorImage_avif
    article.pic_webp = errorImage_webp
    article.pic = errorImage

}

export function onAvatarError(event){
    event.target.src = defaultUser_avif
}

export const createCardInfo =(length)=>{
    return Array.from({ length: length }, () => new cardInfo())
}

export const toCardInfo =(data,article,type)=>{
    data.forEach((item,index)=>{
        const card = article[index]
        if(card){ // 确保存在对应的 cardInfo 对象
            card.aid = item.aid
            card.author = item.user.nickname
            card.category = item.category
            card.alt = item.title
            card.desc= item.desc
            card.pic_avif = item.picAvif
            card.pic_webp = item.picWebp
            card.pic = item.pic
            card.visitor = numberRegular(item.stat.visitor)
            card.review = numberRegular(item.stat.review)
            card.like = numberRegular(item.stat.like)
            card.collect = numberRegular(item.stat.collect)
            if(type === 'simple') card.pubDate = simpleTimeRegular(item.pubDate)
            if(type === 'full') card.pubDate = fullTimeRegular(item.pubDate)
        }
    })
    return article
}

export const toUserCardInfo =(data,article,type)=> {
    const author = data.user.nickname
    data.article.forEach((item,index)=>{
        const card = article[index]
        if(card){ // 确保存在对应的 cardInfo 对象
            card.aid = item.aid
            card.author = author
            card.category = item.category
            card.alt = item.title
            card.desc= item.desc
            card.pic_avif = item.picAvif
            card.pic_webp = item.picWebp
            card.pic = item.pic
            card.visitor = numberRegular(item.stat.visitor)
            card.review = numberRegular(item.stat.review)
            card.like = numberRegular(item.stat.like)
            card.collect = numberRegular(item.stat.collect)
            if(type === 'simple') card.pubDate = simpleTimeRegular(item.pubDate)
            if(type === 'full') card.pubDate = fullTimeRegular(item.pubDate)
        }
    })
    return article
}

export const mouseEnter_animation=(animation:any,action:string,timer:any,mouse:any)=>{
    // 清除可能存在的离开定时器
    clearTimeout(timer.value)
    timer.value = setTimeout(async () => {
        if (!animation[action]) mouse[action] = true
        if (action === 'avatar') {
            const {success, data, error} = await handleAvatarGetUserStat()
            if (!success) log.error(error)
            else {

            }
        }
    },150)
}

export const mouseLeave_animation=(animation:any,action:string,timer:any,mouse:any)=>{
    clearTimeout(timer.value)
    // 增加动画状态检查，防止冲突
    if(!animation[action] && mouse[action]) {
        // 如果动画没有在进行中，立即设置 mouse[action] 为 false
        mouse[action] = false
    }
}

// 动画自锁
export const animationStart=(animation:any,action:string)=>{
    animation[action] = true
}
export const animationEnd=(animation:any,action:string,mouse:any)=>{
    animation[action] = false
    // 动画结束后检查是否需要隐藏
    if (!mouse[action]) {
        mouse[action] = false
    }
}

export const on=(element,event,handler)=>{
    if (element && event && handler) {
        element.addEventListener(event, handler, false);
    }
}
export const off=(element,event,handler)=>{
    if (element && event && handler) {
        element.removeEventListener(event, handler, false);
    }
}

// 检查输入为空 /^\s*$/表示匹配空格、换行、空
export const checkBlank=(value)=>{
    return /^\s*$/.test(value)
}
