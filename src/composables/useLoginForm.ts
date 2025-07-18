import {loginFormState} from "@/special_assets/js/login/loginFormState";
import {useRouter} from "vue-router";

export const useLoginForm = () =>{
    const formState = loginFormState()
    const router = useRouter()

}
