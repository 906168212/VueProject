import {useRouter} from "vue-router";

export const useSafeNavigation = () =>{
    const router = useRouter()

    const redirectAfterLogin = async () =>{
        const redirectPath = router.currentRoute.value.query.redirect?.toString() || '/index'
        try {
            await router.push(redirectPath)
        }catch (error){
            console.log('路由导航失败:',error)
            await router.push('/error')
        }
    }

    return {
        redirectAfterLogin
    }
}
