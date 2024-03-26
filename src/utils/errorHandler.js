
export function handleRequestError(error) {
    if (error.response) {
        return `服务器错误，请稍后重试：${error.response.status} - ${error.response.data}`
    } else if (error.request) {
        return "请求错误，请稍后重试"
    }else {
        return error.message
    }
}

export function handleAsyncError(error,errorStatus,errorInfo){
    //动态提示error
    log.error('发生错误：'+error.message)
    //更新错误提示
    errorStatus.value = true
    errorInfo.value = '发生错误：'+error.message
    // 可以选择是否继续抛出错误
    // throw error;
}
