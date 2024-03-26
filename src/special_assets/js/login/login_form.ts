import {computed, reactive, ref} from "vue";
import {InputNone} from "../../../utils/regular.js";
import {doLogin} from "../../../api/loginAndLogoutApi.js";

class Status {
    show_password = false
    username = ref<null | boolean>(null)
    password = ref<null | boolean>(null)
    response = ref<null | boolean>(null)
}
class Response {
    success = ''
    failure = ''
}
class User {
    username = ''
    password = ''
    remember = false
}

export const status = reactive(new Status())

export const response =  reactive(new Response())

export const user = reactive(new User())
export const resetData = ()=>{
    Object.assign(status,new Status())
    Object.assign(response,new Response())
    Object.assign(user,new User())
}

export const hideError = (errorName)=>{
    status[errorName] = false;
    status.response = false;
}

export const checkContent = (errorName,validation)=>{
    status[errorName] = validation !== ""
}



export const toggleToTrue = (statusName)=>{
    status[statusName] = true;
}
export const toggleToFalse = (statusName)=>{
    status[statusName] = false;
}

export const beforeSubmit_check = (event)=>{
    checkContent('username',usernameValidation.value);
    checkContent('password',passwordValidation.value);
    if(status.username || status.password) event.preventDefault()
}

export const login = async () =>{
    await doLogin(user,response,status);
}

export const usernameValidation = computed(()=>{
    return usernameValidationBody(user.username)
})
export const passwordValidation = computed(()=>{
    return passwordValidationBody(user.password)
})
export const responseValidation = computed(()=>{
    return responseValidationBody()
})


const usernameValidationBody = (username)=>{
    if(InputNone(username)) return  '用户名或邮箱不能为空';
    else return ''
}
const passwordValidationBody = (password)=>{
    if(InputNone(password)) return  '密码不能为空';
    else return ''
}

const responseValidationBody = ()=>{
    if(response.failure!='') return response.failure;
    else return '';
}
