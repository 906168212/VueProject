import {reactive} from "vue";
import useVuelidate from "@vuelidate/core";
import {loginRules} from "@/validators/loginRules";
export const loginFormState = () =>{
    // 表单数据
    const formData = reactive({
        usernameOrEmail: '',
        password: '',
        remember : false
    })
    // UI状态
    const uiState = reactive({
        showPassword : false,
        activeFields : {
            usernameOrEmail : false,
            password : false,
        },
        response : ''
    })

    // 规则
    const v$ = useVuelidate(loginRules,formData)
    // 方法
    const resetForm = ()=>{
        formData.usernameOrEmail = ''
        formData.password = ''
        formData.remember = false
        uiState.showPassword = false
        uiState.activeFields = {
            usernameOrEmail : false,
            password : false,
        }
        uiState.response = ''
        v$.value.$reset()
    }
    // 验证方法
    const validateForm = async() =>{
        const isValid  = await v$.value.$validate()
        return {
            isValid,
            errors : {
                usernameOrEmail : v$.value.usernameOrEmail.$errors,
                password : v$.value.password.$errors
            }
        }
    }
    return {
        formData,
        uiState,
        v$,
        resetForm,
        validateForm
    }
}



