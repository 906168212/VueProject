export async function validateRegisterForm(userData){

    return new Promise((resolve,reject) =>{
        if(!userData.username||!userData.password){
            reject(new Error('用户名和密码不得为空'));
        }else if(userData.password.length < 8){
            reject(new Error('密码长度不能少于8个字符'));
        }else {
            resolve();
        }
    })
}
