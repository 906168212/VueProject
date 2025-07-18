import {computed, reactive} from "vue";
import useVuelidate from "@vuelidate/core";
import {registerRules} from "@/validators/registerRules";

export const registerFormState = () => {
    // 表单状态容器
    const formData = reactive({
        username: '',
        password: '',
        email: '',
        emailCode: '',
        agreement: false
    })
    // UI状态
    const uiState = reactive({
        showPassword : false,
        showEmailCode : false,
        coolDown : 0,
        activeFields : {
            username : false,
            password : false,
            email : false,
            emailCode : false,
        },
        response : ''
    })

    // Vuelidate 实例
    const v$ = useVuelidate(registerRules,formData)

    // 计算属性--------------------------------
    // 邮箱验证
    const canSendEmail = computed(()=>(
        !v$.value.email.$invalid && formData.agreement && uiState.coolDown === 0
    ))
    // 方法-------------------------------------
    // 重置
    const resetForm = () =>{
        formData.username = ''
        formData.password = ''
        formData.email = ''
        formData.emailCode = ''
        formData.agreement = false
        uiState.showPassword = false
        uiState.showEmailCode = false
        uiState.coolDown = 0
        uiState.activeFields ={
            username : false,
            password : false,
            email : false,
            emailCode : false,
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
                username : v$.value.username.$errors,
                password : v$.value.password.$errors,
                email : v$.value.email.$errors,
                emailCode : v$.value.emailCode.$errors
            }
        }
    }

    return {
        formData,
        uiState,
        v$,
        resetForm,
        canSendEmail,
        validateForm
    }
}
