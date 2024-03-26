export const handleCommonSuccessResponse = (responseData,responseError,status,successMessage)=>{
    if(responseData.code === 200){
        cleanError(responseError,status)
        log.success(successMessage)
    }else {
        throw new Error(responseData.message)
    }
}

export const handleCommonFailedResponse = (error,status,responseError)=>{
    log.error(error.message)
    setError(responseError,status,error)
}

export const setError=(responseError,status,error)=>{ // 设定错误状态
    responseError.value= error.message
    status.error = 'error'
}
export const cleanError=(responseError,status)=>{ // 清除错误状态
    responseError.value= ''
    status.error = ''
}
