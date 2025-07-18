<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/index.vue";
import {registerFormState} from "@/special_assets/js/register/registerFormState";
import {handleSendEmail} from "@/api/email/emailResponse";
import {handleRegister} from "@/api/register/registerResponse";
import {backLogin} from "@/utils/utils";
import * as Constants from "@/utils/constants";
import {onUnmounted, ref} from "vue";
import FormInput from "@/components/formInput.vue";
import Wrap_with_halihapiLOGO from "@/components/wrap_with_halihapiLOGO.vue";
import {MAX_PASSWORD_LENGTH, MAX_USERNAME_LENGTH} from "@/utils/constants";

const {
  formData, uiState, v$, canSendEmail, resetForm, validateForm
} = registerFormState()

const timer = ref<NodeJS.Timeout>()
const userFocus = (fieldName) => {
  const fieldValidator = v$.value[fieldName]
  if (fieldValidator) {
    uiState.activeFields[fieldName] = true
    v$.value[fieldName].$reset() // 可选：聚焦时重置验证状态
    if (fieldName === 'email'){
      uiState.showEmailCode = true
    }
  }
}
const userBlur = (fieldName) => {
  const fieldValidator = v$.value[fieldName]
  if (fieldValidator && typeof fieldValidator.$touch === 'function') {
    uiState.activeFields[fieldName] = false
    fieldValidator.$touch()
  }
}

const submitForm = async (event) => {
  const submitValue = event.submitter.value
  // 1. 触发验证
  // 2. 验证失败处理
  try {
    if (submitValue === 'send_email'){
      const isEmailValid = await v$.value.email.$validate()
      const isAgreementValid = await v$.value.agreement.$validate()
      if (!(isEmailValid && isAgreementValid)){
        return
      }
      const {success , error, data} = await handleSendEmail(formData.email)
      if (!success) {
        uiState.response = error || '邮件发送失败'
        log.error(error || '邮件发送失败')
        return
      }else {
        startCoolDown(data.data.LimitTimestamp)
        log.success('邮件发送成功，请注意查收')
      }
    }else if (submitValue === 'register'){
      const isAllValid = await v$.value.$validate()
      if (!isAllValid) {
        return
      }
      const {success , error, data} = await handleRegister(formData)
      if (!success) {
        uiState.response = error || '注册失败'
        log.error(error || '注册失败')
        return
      }else {
        backLogin(Constants.BACK_TIME,'/');
        log.success('注册成功，'+Constants.BACK_TIME+"S后返回登录页面")
      }
    }
  }catch (error){
    console.error('操作失败:', error)
    log.error('请求处理失败，请检查网络')
  }

}


const startCoolDown=(LimitTimestamp:number)=>{ //冷却
  // 获取当前时间戳
  const currentTimestamp = Date.now();

  uiState.coolDown = Math.max(0, Math.ceil((LimitTimestamp - currentTimestamp) / 1000));
  // 设置定时器，每秒更新一次冷却时间
  timer.value = setInterval(() => {
    if (uiState.coolDown > 0) {
      uiState.coolDown--;
    } else {
      clearInterval(timer.value);
    }
  }, 1000);
}

onUnmounted(()=>{
  if (timer.value) clearInterval(timer.value);
})

</script>

<template>
  <div class="form_wrap register">
    <wrap_with_halihapi-l-o-g-o>
      <template #form>
        <form class="form_entry" @submit.prevent="submitForm">

          <!-----------账号------------->
          <form-input class="username_popover" id="username" type="text" place-holder="用户名" :max-length="MAX_USERNAME_LENGTH.toString()"
                      @focus="userFocus('username')" @blur="userBlur('username')"
                      v-model="formData.username" :error="v$.username.$error">
            <template #ok-flag>
              <div class="input_flag_wrap">
                <div class="input_ok" v-show="!v$.username.$invalid"></div>
              </div>
            </template>
            <template #tips>
              <div class="input_tips username" :class="{slideup:!uiState.activeFields.username}">
                <div class="input_tips_item" :class="{'ok': !v$.username.noWhiteSpace.$invalid }">不能包括空格</div>
                <div class="input_tips_item" :class="{'ok': !v$.username.validLength.$invalid }">长度为10-20个字符</div>
                <div class="input_tips_item" :class="{'ok': !v$.username.validCharacters.$invalid }">必须包含字母、数字，不包含特殊字符，中文</div>
              </div>
            </template>
            <template #dis-error>
              <div class="error-tips-wrap" :class="{slideup: !v$.username.$error}">
                <div class="error-tips" v-show="v$.username.$error">{{v$.username.$errors[0]?.$message||''}}</div>
              </div>
            </template>
          </form-input>
          <!-----------密码------------->
          <form-input class="password_popover" id="password" :type="uiState.showPassword ? 'text':'password'" place-holder="密码"
                      @focus="userFocus('password')" @blur="userBlur('password')"
                      v-model="formData.password" :error="v$.password.$error" :max-length="MAX_PASSWORD_LENGTH.toString()">
            <template #ok-flag>
              <div class="input_flag_wrap">
                <div class="input_ok" v-show="!v$.password.$invalid"></div>
                <div class="eye" :class="{close: !uiState.showPassword}" title="长按显示密码" @mousedown="uiState.showPassword=true" @mouseup="uiState.showPassword=false"></div>
              </div>
            </template>
            <template #tips>
              <div class="input_tips password" :class="{slideup:!uiState.activeFields.password}">
                <div class="input_tips_item" :class="{'ok': !v$.password.noWhiteSpace.$invalid }">不能包括空格</div>
                <div class="input_tips_item" :class="{'ok': !v$.password.validLength.$invalid }">长度为8-16个字符</div>
                <div class="input_tips_item" :class="{'ok': !v$.password.validCharacters.$invalid }">必须包含字母、数字、符号中至少2种</div>
                <div class="input_tips_item" :class="{'ok': !v$.password.RepeatingCharsValid.$invalid }">请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456</div>
              </div>
            </template>
            <template #dis-error>
              <div class="error-tips-wrap" :class="{slideup:!v$.password.$error}">
                <div class="error-tips" v-show="v$.password.$error">{{v$.password.$errors[0]?.$message||''}}</div>
              </div>
            </template>
          </form-input>
          <!-----------邮箱------------->
          <form-input class="email_popover" id="email" type="text" place-holder="电子邮箱"
                      @focus="userFocus('email')" @blur="userBlur('email')"
                      v-model="formData.email" :error="v$.email.$error">
            <template #ok-flag>
              <div class="input_flag_wrap">
                <div class="input_ok" v-show="!v$.email.$invalid"></div>
              </div>
            </template>
            <template #dis-error>
              <div class="error-tips-wrap" :class="{slideup:!v$.email.$error}">
                <div class="error-tips" v-show="v$.email.$error">{{v$.email.$errors[0]?.$message||''}}</div>
              </div>
            </template>
          </form-input>
          <!-----------验证------------->
          <div class="input_popover email_code_popover" v-show="uiState.showEmailCode">
            <div class="email_code_popover_container">
              <div class="email_code_popover_bd">
                <label for="emailCode"></label>
                <input id="emailCode" placeholder="邮箱验证码" tabindex="6" maxlength="6" autocomplete="off" v-model="formData.emailCode"
                       @focus="userFocus('emailCode')" @blur="userBlur('emailCode')">
              </div>
              <div class="email_code_popover_hd">
                <button class="email_send_btn" :class="{forbid:!canSendEmail}" value="send_email">发送验证码<span v-show="uiState.coolDown>0">({{ uiState.coolDown + 'S' }})</span></button>
              </div>
            </div>
            <div class="error-tips-wrap" :class="{slideup:!v$.emailCode.$error}">
              <div class="error-tips" v-show="v$.emailCode.$error">{{v$.emailCode.$errors[0]?.$message||''}}</div>
            </div>
          </div>
          <!-----------协议------------->
          <div class="input_popover agreement_popover" style="margin-top: 4px">
            <input class="diy_checkbox" type="checkbox" id="remember_check_box" v-model="formData.agreement">
            <label for="remember_check_box" class="diy_check_box_style" @click="v$.agreement.$touch()">
              <img class="check_icon" src="@/assets/svg/check.svg" alt="">
            </label>
            <span>我已阅读并同意
            <a href="" class="agreement_text">服务协议</a>和
            <a href="" class="agreement_text">隐私保护指引</a>
          </span>
          </div>
          <!-----------提交------------->
          <!--
            有两个条件会触发总错误的提示：
              1、 协议未同意
              2、 响应有错误
            显现错误的几种情况：
              1、 点击了协议同意，但又取消了
              2、 发送邮件点击，但没有同意协议
              3、 响应有错误

          -->
          <div class="submit_popover">
            <button class="form_btn" value="register">注册</button>
            <div class="error-tips-wrap" :class="{slideup: !v$.agreement.$error}">
              <div class="error-tips" v-show="v$.agreement.$error">{{v$.agreement.$errors[0]?.$message||''}}</div>
            </div>
          </div>
        </form>
      </template>
    </wrap_with_halihapi-l-o-g-o>
  </div>
</template>

<style src="@/special_assets/css/register_form_styles.css" scoped>

</style>
