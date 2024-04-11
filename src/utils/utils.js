//返回时间
import router from "@/router/index.js";
import store from "@/store/index.js";
import errorImage_webp from "@/assets/image/errorImage.webp"
import errorImage_avif from "@/assets/image/errorImage.avif"
import errorImage from "@/assets/image/errorImage.png"
import {cardInfo} from "@/api/dataInfo.js";
import {numberRegular, timeRegular} from "@/utils/regular.js";

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


export const startCoolDown=(coolDown,LimitTimestamp)=>{ //冷却
    // 获取当前时间戳
    const currentTimestamp = Date.now();
    coolDown.value = Math.max(0, Math.ceil((LimitTimestamp - currentTimestamp) / 1000));
    // 设置定时器，每秒更新一次冷却时间
    const timer = setInterval(() => {
        if (coolDown.value > 0) {
            coolDown.value--;
        } else {
            clearInterval(timer);
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
    const location = JSON.parse(localStorage.getItem("halihapi_ticket"))
    const session = JSON.parse(sessionStorage.getItem("halihapi_ticket"))
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
    article.alt = '网络异常，加载出错咯'
    article.desc = '网络异常，加载出错咯'
}

export const createCardInfo =(length)=>{
    return Array.from({ length: length }, () => new cardInfo())
}

/*
*  对于每个分类的首页，大致分为两部分，一个是最上面的推荐，一个是每个分类的分类的内容，然后每一块都分为左右两侧
*  rid=哪一个区的某一个分类, origin=0 不是一开始的推荐区
* */
export const rid = {
    animation: {},
    comic: {},
    game: {pc: {value:0,name:'PC游戏'},simulator:{value:1,name:'模拟器游戏'},best:{value:2,name:'至高之神'},phone:{value:3,name:'手机游戏'},plugin:{value:4,name:'游戏插件'}},
    melon: {},
    hot: {},
    news: {},
    movie: {},
    food:{},
    travel:{},
    knowledge:{},
    dan:{},
    life:{},
    tool:{},
    asmr:{},
    website:{},
    goods:{}
}


export const pt = {
    animation: 0,
    comic: 1,
    game: 2,
    melon: 3,
    hot: 4,
    news: 5,
    movie: 6,
    food:7,
    travel:8,
    knowledge:9,
    dan:10,
    life:11,
    tool:12,
    asmr:13,
    website:14,
    goods:15
}


export const toCardInfo =(data,article)=>{
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
            card.pubDate = timeRegular(item.pubDate)
        }
    })
}

