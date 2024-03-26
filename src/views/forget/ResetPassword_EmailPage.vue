<script setup>

import {
  submitForm, status, hideErrorAndShowTIps, checkAndShowError, emailValidation,
  userInfo, emailCodeValidation, coolDown, SendEmailAbility, SendEmailFactor,
  errorValidation, submitAbility
} from "@/special_assets/js/resetPassword_email.js";
import {askSuccessData} from "@/special_assets/js/resetPassword_askAccount.js";
</script>
<template>
  <div class="main resetPassword_Email_main">
    <div class="form">
      <div>
        <div class="welcome">找回密码</div>
        <div class="identify-desc">
          请输入邮箱
          <span class="identify-email-text">{{askSuccessData.maskedEmail}}</span>
          以验证身份
        </div>
      </div>
      <form id="identify-email" class="input-wrap" @submit.prevent="submitForm">
        <div class="input-wrap__item input-area email-wrap">
          <div class="input-flags">
            <div class="input-ok" v-show="status.email === 'ok'"></div>
          </div>
          <div class="email-wrap__inner">
            <div class="email-wrap_hd">
              <label for="email"></label>
              <input id="email" type="text" class="email-wrap__text-input awesomplete" tabindex="5" placeholder="电子邮箱"
                     v-model="userInfo.email"  maxlength="25" autocomplete="off" name="email"
                     @focus="hideErrorAndShowTIps('email')"
                     @blur="checkAndShowError('email',emailValidation)">
            </div>
          </div>
          <div class="error-tips-wrap" :class="{slideup: status.email !== 'error'}">
            <div class="error-tips" style="margin: 0" v-if="status.email === 'error'">{{emailValidation}}</div>
          </div>
        </div>
        <div id="emailCode" class="input-wrap__item emailCode-wrap" >
          <div class="emailCode-wrap__inner">
            <div class="emailCode-wrap__bd">
              <label for="code"></label>
              <input id="code" placeholder="邮箱验证码" type="text" class="emailCode-wrap__text-code" tabindex="2" maxlength="6"
                     autocomplete="off" v-model="userInfo.emailCode"
                     @focus="hideErrorAndShowTIps('emailCode')"
                     @blur="checkAndShowError('emailCode',emailCodeValidation)">
            </div>
            <div class="emailCode-wrap__ft">
              <button class="emailCode-wrap__btn" :class="{disabled: !SendEmailAbility}"
                       value="sendEmail" @click="SendEmailFactor">发送验证码<span v-show="coolDown>0">({{ coolDown + 'S' }})</span></button>
            </div>
          </div>
          <div  class="error-tips-wrap"  :class="{slideup: status.emailCode !== 'error' }">
            <div class="error-tips" v-show="status.emailCode === 'error'">{{ emailCodeValidation}}</div>
          </div>
        </div>
        <div class="submit_button">
          <button id="get_acc" type="submit" class="btn-submit" tabindex="3" value="verify"
          :class="{disabled:!submitAbility}" :disabled="!submitAbility" >下一步</button>
          <div class="error-tips-wrap" :class="{slideup: status.error!=='error'}">
            <div class="error-tips" v-show="status.error==='error'">{{errorValidation}}</div>
          </div>
        </div>
      </form>
    </div>
  </div>

</template>

<style src="@/special_assets/css/resetPassword_emailPageStyles.css" scoped>

</style>
