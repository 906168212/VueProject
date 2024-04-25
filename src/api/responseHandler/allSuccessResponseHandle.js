import {cleanError} from "@/api/responseHandler/commonResponseHandle.js";
import {
    backLogin,
    deleteAccessToken,
    startCoolDown,
    storeAccessToken,
    toCardInfo,
    toUserCardInfo
} from "@/utils/utils.js";
import * as Constants from "@/utils/constants.js";
import {askSuccessData, changeToOption} from "@/special_assets/js/resetPassword_askAccount.js";
import {changeToReset} from "@/special_assets/js/resetPassword_email.js";
import {qrCodeSrc} from "@/special_assets/js/resetPassword_dataAssist.js";
import router from "@/router/index.js";
import {mouse, user} from "@/special_assets/js/index/index_header.ts";
import {cardInfo} from "@/api/dataInfo.js";


// 登录-成功
export const handleLoginSuccessResponse = (responseData,remember,response,status)=>{
    if(responseData.code === 200){
        response.success = responseData.message
        status.response = false
        storeAccessToken(responseData.data.token,remember,responseData.data.expireTime)
        // 从 query 中获取 redirect 参数，如果没有则默认跳转到 '/index'
        const redirectPath = router.currentRoute.value.query.redirect || '/index';
        router.push(redirectPath)
    }else {
        throw new Error(responseData.message) // 抛到最外层处理
    }
}

//退出登录-成功
export const handleLogoutSuccessResponse = (responseData)=>{
    if(responseData.code === 200) {
        deleteAccessToken()
        router.replace('/login')
    }
    else {
        console.log(responseData)
        throw new Error(responseData.message) // 抛到最外层处理
    }
}

// 用户信息巡查
export const handleUserNavSuccessResponse = (responseBody,Nav)=>{
    if(responseBody.code === 200){
        Nav.nickName = responseBody.data.username
        Nav.point_num = responseBody.data.wallet.point_coin
        Nav.future_coin_num = responseBody.data.wallet.future_coin
        Nav.number = responseBody.data.user_number
        Nav.current_level = responseBody.data.user_level.currentLevel
        Nav.current_level_name = responseBody.data.user_level.currentLevelName
        Nav.current_vip = responseBody.data.vip.type
        Nav.vip_status = responseBody.data.vip.status
    }else {
        throw new Error(responseBody.message) // 抛到最外层处理
    }
}

// 用户信息统计 粉丝 关注 动态
export const handleUserStatSuccessResponse = (responseBody) =>{
    if(responseBody.code === 200){
        user.motion_num = responseBody.data.motion_num
        user.concerned_num = responseBody.data.concerned_num
        user.fan_num = responseBody.data.fan_num
    }else {
        throw new Error(responseBody.message) // 抛到最外层处理
    }
}

//文章信息 4-左侧区域
export const handleArticleDisplaySuccessResponse=(responseData,status,article)=>{
    if(responseData.code === 200){
        toCardInfo(responseData.data,article,'simple')
        status.left = true;
    }else {
        throw new Error(responseData.message) // 抛到最外层处理
    }
}
// 文章信息 右侧区域
export const handleRightRegionSuccessResponse=(responseData,status,article)=>{
    if(responseData.code === 200) {
        toCardInfo(responseData.data,article,'simple')
        status.right = true;
    }else {
        throw new Error(responseData.message)
    }
}

//文章信息 获取所有文章
export const handleGetAllArticleSuccessResponse=(responseData)=>{
    if(responseData.code === 200){
        const article = Array.from({length:responseData.data.article.length},()=> new cardInfo())
        const getArticle =  toUserCardInfo(responseData.data,article,'full')
        const getType = responseData.data.type
        return {getArticle,getType}
    }else {
        throw new Error(responseData.message)
    }
}

// 邮箱-成功
export const handleAskCodeSuccessResponse = (responseData,response,showError,coolDown) =>{
    if(responseData.code === 200){
        response.failure = ''
        showError.response = false
        startCoolDown(coolDown,responseData.data.LimitTimestamp);
        log.success("邮件已发送，请注意查收")
    }else {
        throw new Error(responseData.message) // 抛到最外层处理
    }
}

//注册-成功
export const handleRegisterSuccessResponse = (responseData,responseError,status)=>{
    if(responseData.code === 200){
        cleanError(responseError,status)
        backLogin(Constants.BACK_TIME,'/');
        log.success("注册成功！"+Constants.BACK_TIME+"S后返回登录页面")
    }else {
        throw new Error(responseData.message)
    }
}

//查询用户-成功
export const handleAskAccountSuccessResponse = (responseData,responseError,status) =>{
    if(responseData.code === 200){
        cleanError(responseError,status)
        askSuccessData.maskedEmail = responseData.data.maskedEmail
        askSuccessData.reset_uuid = responseData.data.reset_uuid
        changeToOption()
    }else throw new Error(responseData.message) // 处理失败逻辑
}

//邮箱验证-成功
export const handleResetIdentifySuccessResponse = (responseData,responseError,status)=>{
    if (responseData.code === 200){
        cleanError(responseError,status)
        changeToReset()
        askSuccessData.identify_uuid = responseData.data.identify_uuid
    }else throw new Error(responseData.message) // 处理失败逻辑
}

// 资料辅助验证-二维码生成
export const handleDataAssistedVerifySuccessResponse = (responseData,responseError,status)=>{
    if (responseData.code === 200){
        cleanError(responseError,status)
        qrCodeSrc.value = `data:image/png;base64,${responseData.data}`
    }else throw new Error(responseData.message)
}

// 重置密码-成功
export const handleResetSuccessResponse = (responseData,responseError,status)=>{
    if (responseData.code === 200){
        cleanError(responseError,status)
        backLogin(Constants.BACK_TIME,'/')
        log.success("密码重置成功，"+Constants.BACK_TIME+"后返回登陆页面");
    }else throw new Error(responseData.message) // 处理失败逻辑
}

//文章图片上传处理
export const handleArticleImageUploadSuccessResponse = (responseData,resolve,reject)=>{
    if (responseData.code === 200){
        resolve(responseData.data.url)
        console.log('data:'+responseData.data)
        console.log('url:'+responseData.data.url)
    }else throw new Error(responseData.message)
}

