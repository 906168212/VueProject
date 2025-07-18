import {computed, reactive, ref} from "vue";
import * as Constants from "@/utils/constants.ts";











// export const getAgreement = ()=> registerForm.agreement //getter
//
// export const resetData =()=>{
//     Object.assign(show,new Show())
//     Object.assign(tips,new Tips())
//     Object.assign(show_error,new Show_error())
//     Object.assign(response,new Response())
//     Object.assign(registerForm,new RegisterForm())
//     coolDown.value = 0
// }
//
// export const hideError = (errorName)=>{
//     show_error[errorName] = false;
// }
// export const hideErrorAndShowTips=(name)=>{
//     show_error[name] = false;
//     tips[name] = true;
// }
// export const hideErrorAndShowEmailCode=()=>{
//     show_error.email = false;
//     show.emailCode = true;
// }
//
// export const checkContent = (errorName,validation)=>{
//     show_error[errorName] = validation !== ''
// }
// export const checkContentAndHideTips = (name,validation)=>{
//     show_error[name] = validation !== ''
//     tips[name] = false;
// }
//
// export const isShowAgreementError = (agreement)=>{
//     show_error.agreement = !agreement;
// }
//
// export const toggleToTrue = ()=>{
//     show.password = true;
// }
// export const toggleToFalse = ()=>{
//     show.password = false;
// }


//--------------------------------------提交板块-----------------------------------------//
// const sendEmail_check = ()=>{
//     if(!isCanSendEmail.value){
//         if(!registerForm.agreement) show_error.agreement = true;
//         throw new Error('缺少条件')
//     }
// }
// const register_check = ()=>{
//     checkContent('username',usernameValidation)
//     checkContent('password',passwordValidation)
//     checkContent('email',emailValidation)
//     checkContent('emailCode',emailCodeValidation)
//     if(show_error.username || show_error.password || show_error.email || show_error.emailCode || !registerForm.agreement){
//         if(show_error.emailCode) show.emailCode = true
//         if(!registerForm.agreement) show_error.agreement = true
//         throw new Error('缺少条件')
//     }
// }
//
// export const submitForm = async (event)=>{
//     const submitValue = event.submitter.value
//     if(submitValue === 'send_email'){
//         try{
//             await sendEmail_check()  // 确保检查完毕
//             await sendEmailCode(registerForm.email,response,show_error,coolDown)
//         }catch (error){}
//     }else if(submitValue === 'register'){
//         try{
//             //await register_check()
//             await submitRegisterForm(registerForm,response,show_error)
//         }catch (error){}
//     }
// }

//--------------------------------------计算板块-----------------------------------------//

// //账号
// export const usernameValidation = computed(() => { //用户名验证
//     return usernameValidationBody(registerForm.username)
// })
// //密码
// export const passwordValidation = computed(() => { //密码验证
//     return passwordValidationBody(registerForm.password)
// })
// // 邮箱
// export const emailValidation = computed(() => { //邮箱验证
//     return emailValidationBody(registerForm.email)
// })
// //验证码
// export const emailCodeValidation = computed(() => { //验证码验证
//     return emailCodeValidationBody(registerForm.email_code)
// })
// // 总体错误
// export const responseValidation = computed(()=>{
//     return responseValidationBody()
// })
// // 是否可以发送邮件
// export const isCanSendEmail = computed(()=>{
//     return emailValidation.value === '' && registerForm.agreement && coolDown.value === 0
// })

//验证板块
