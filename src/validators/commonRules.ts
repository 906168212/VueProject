import {required} from "@vuelidate/validators";

export const requiredRules = (message:string) => ({
    required : {
        $validator : (value:string) => !!value?.trim(),
        $message : message
    }
})
