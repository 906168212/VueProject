<script setup lang="ts">
import {loginFormState} from "@/special_assets/js/login/loginFormState";
import SvgIcon from "@/components/svgIcon/index.vue";
import FormInput from "@/components/formInput.vue";
import {handleLogin} from "@/api/login/loginResponse";
import router from "@/router";
import {useSafeNavigation} from "@/utils/navigation";
import Wrap_with_halihapiLOGO from "@/components/wrap_with_halihapiLOGO.vue";
import {MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH} from "@/utils/constants";
const {
  formData, uiState, v$, resetForm, validateForm
} = loginFormState()
const {redirectAfterLogin} = useSafeNavigation()

const userFocus = (fieldName) => {
  const fieldValidator = v$.value[fieldName]
  if (fieldValidator){
    uiState.activeFields[fieldName] = true
    v$.value[fieldName].$reset() // 可选：聚焦时重置验证状态
  }
}
const userBlur = (fieldName) => {
  const fieldValidator = v$.value[fieldName]
  if (fieldValidator){
    uiState.activeFields[fieldName] = false
    fieldValidator.$touch()
  }
}

const submitForm = async (event) => {
  const submitValue = event.submitter.value
  try {
    if (submitValue === 'login'){
      const isAllValid = await v$.value.$validate()
      if (!isAllValid) {
        return
      }
      const {success , error, data} = await handleLogin(formData)
      if (!success) {
        uiState.response = error || '登录失败'
        log.error(error || '登录失败')
        return
      }else {
        log.success('登录成功')
        const authObj = {token:data.data.token,expire:data.data.expire}
        const str = JSON.stringify(authObj)
        if(formData.remember)
          localStorage.setItem("halihapi_ticket",str)
        else
          sessionStorage.setItem("halihapi_ticket",str)
        await redirectAfterLogin()
      }
    }
  }catch (error){
    console.error('操作失败:', error)
    log.error('请求处理失败，请检查网络')
  }
}




</script>

<template>
  <div class="form_wrap login">
    <wrap_with_halihapi-l-o-g-o>
      <template #form>
        <form class="form_entry" @submit.prevent="submitForm">
          <form-input class="usernameOrEmail_popover" id="usernameOrEmail" type="text" place-holder="用户名或邮箱" :max-length="MAX_USERNAME_LENGTH.toString()"
                      @focus="userFocus('usernameOrEmail')" @blur="userBlur('usernameOrEmail')"
                      v-model="formData.usernameOrEmail" :error="v$.usernameOrEmail.$error">
            <template #dis-error>
              <div class="error-tips-wrap" :class="{slideup: !v$.usernameOrEmail.$error}">
                <div class="error-tips" v-show="v$.usernameOrEmail.$error">{{v$.usernameOrEmail.$errors[0]?.$message||''}}</div>
              </div>
            </template>
          </form-input>
          <form-input class="password_popover" id="password" :type="uiState.showPassword ? 'text':'password'" place-holder="密码"
                      @focus="userFocus('password')" @blur="userBlur('password')"
                      v-model="formData.password" :error="v$.password.$error" :max-length="MAX_PASSWORD_LENGTH.toString()">
            <template #dis-error>
              <div class="error-tips-wrap" :class="{slideup: !v$.password.$error}">
                <div class="error-tips" v-show="v$.password.$error">{{v$.password.$errors[0]?.$message||''}}</div>
              </div>
            </template>
          </form-input>

          <div class="remember_and_forget_popover">
            <div class="popover_left">
              <input v-model="formData.remember" class="diy_checkbox" type="checkbox" id="remember_check_box">
              <label for="remember_check_box" class="diy_check_box_style">
                <img class="check_icon" src="@/assets/svg/check.svg" alt="">
              </label>
              <span>自动登录</span>
            </div>
            <div class="popover_right">
              <a @click="router.push('/forget')"><span>忘记密码</span></a>
            </div>
          </div>
          <div class="submit_popover">
            <button class="form_btn" value="login">登录</button>
          </div>
        </form>
      </template>
    </wrap_with_halihapi-l-o-g-o>
  </div>
</template>

<style src="@/special_assets/css/login_form_styles.css" scoped>

</style>
