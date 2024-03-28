// 全局前置守卫
import router from "@/router/index.js";
import {deleteAccessToken, takeAccessToken} from "@/utils/utils.js";
import {next} from "lodash/seq.js";
import store from "@/store/index.js";

// 如果刷新，from.name为undefined
// 开启或关闭token验证
const isTokenVerify = false
//code： 1-no_token 2-token_invalid

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth) && isTokenVerify){  // 需要验证的界面
        const ticket = takeAccessToken()
        if(!ticket){ // 无token 重定向到登录页面
            store.commit('redirect/setRedirectCode','1')
            next({path:'/',query:{redirect:to.fullPath}})
        }else {  // 有token
            const now = Date.now()
            if(now >= ticket.expire){  // token过期
                deleteAccessToken();  // 过期了就要删除
                store.commit('redirect/setRedirectCode','2')
                next({path:'/',query:{redirect:to.fullPath}})
            }else next()     // token 未过期
        }
    } else { // 不需要验证的界面
        const ticket = takeAccessToken()
        if(ticket){ // 有token，重定向到主页
            next('/index')
        }else next()
    }

});
// 全局后置守卫
router.afterEach((to, from) => {
    const code = store.state.redirect.redirectCode;
    if(code === '1') log.error('没有权限访问，请先登录')
    else if(code === '2') log.error('身份过期，请重新登录')
    store.commit('redirect/clearRedirectCode')
    if(to.path==='/game') store.commit("game/setGamePage",1)
});
