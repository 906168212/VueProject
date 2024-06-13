import {getStsToken} from "@/api/stsTokenApi.js";
import OSS from "ali-oss";
import {bucketName, endpoint, region} from "@/utils/constants.js";

const isCredentialsExpired =  (credentials) =>{
    if (typeof credentials != 'object') return true;
    const expireDate = new Date(credentials.expiration)
    const now = new Date()
    // 如果有效期不足一分钟，视为过期。
    return expireDate.getTime() - now.getTime() <= 60000;
}

const getCredentials = async () =>{
    const credentials = JSON.parse(sessionStorage.getItem('STSCredentials'));
    if(isCredentialsExpired(credentials)){
        const newCredentials = await getStsToken()
        sessionStorage.setItem("STSCredentials", JSON.stringify(newCredentials))
        return newCredentials;
    }
    return credentials;
}

export const submitFileToOss = async (picInput) =>{
    const STSCredentials = await getCredentials();
    const ObjectName = 'testDir/mac_'+new Date().getTime()+'.'+picInput.name.split('.').pop()
    const client = new OSS({
        bucket : bucketName,
        region : region,
        accessKeyId : STSCredentials.accessKeyId,
        accessKeySecret : STSCredentials.accessKeySecret,
        stsToken: STSCredentials.securityToken,
        endpoint : endpoint,
        secure : true
    })
    const result =  await client.put(ObjectName,picInput);
    if (result.res.status === 200) {
        log.success("图片上传成功！")
        return result.url;
    }
}