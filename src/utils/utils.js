//返回时间
import router from "@/router/index.js";
import store from "@/store/index.js";

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





