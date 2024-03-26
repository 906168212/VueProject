<script setup>
  import {InputNone} from "@/utils/regular.js";
  import {
    checkAndShowError,
    errorValidation,
    hideError,
    status,
    submitForm, username,
    usernameValidation
  } from "@/special_assets/js/resetPassword_askAccount.js";
</script>

<template>
  <div class="main resetPassword_main">
    <div class="form">
      <div>
        <div class="welcome">找回密码</div>
        <div>请输入账号</div>
      </div>
      <form id="resetPassword-username" class="input-wrap" @submit.prevent="submitForm">
        <div  class="input-wrap__item input-area resetPassword_username_inner">
          <div class="input-outer">
            <input type="text" id="username" maxlength="20" tabindex="1" placeholder="请输入账号"
                   v-model="username" autocomplete="off" :class="{error:status.error === 'error'|| status.username === 'error'}"
                  @click="hideError" @blur="checkAndShowError">
          </div>
          <div class="error-tips-wrap" :class="{slideup: status.username !== 'error'}">
            <div class="error-tips" v-show="status.username === 'error'">{{usernameValidation}}</div>
          </div>
        </div>
        <div class="submit_button">
          <button id="get_acc" type="submit" class="btn-submit" value="askAccount"
                  :class="{disabled:InputNone(username)}"  tabindex="2" :disabled="InputNone(username)">
            下一步</button>
          <div class="error-tips-wrap" :class="{slideup: status.error !== 'error'}">
            <div class="error-tips" v-show="status.error === 'error'">{{errorValidation}}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="@/special_assets/css/resetPassword_accountPageStyles.css" scoped>

</style>
