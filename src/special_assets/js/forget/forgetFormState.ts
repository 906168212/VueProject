import {reactive, ref} from "vue";
import useVuelidate from "@vuelidate/core";
import {forgetRules} from "@/validators/forgetRules";

export const forgetFormState = () => {
    const formData = reactive({
        username: '',
        emailCode: '',
    })

    const uiState = reactive({
        coolDown : 0,
        activeFields : {
            username : false,
            emailCode : false,
        },
    })

    // Vuelidate 实例
    const v$ = useVuelidate(forgetRules,formData)

    return {
        formData,
        uiState,
        v$
    }
}
