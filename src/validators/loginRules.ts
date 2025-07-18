// 登录用 验证规则
// 仅检测是否为空，其余交给后端
import {helpers, required} from "@vuelidate/validators";

export const loginRules = {
    usernameOrEmail : {
        required : helpers.withMessage('用户名或邮箱不能为空',required)
    },
    password : {
        required : helpers.withMessage('密码不能为空',required),
    }
}
