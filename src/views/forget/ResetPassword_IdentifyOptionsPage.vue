<script setup>
  import '@/utils/forbidBack.js'
  import {dataAssistIdentify, emailIdentify} from "@/special_assets/js/resetPasswordword_identifyOptions.js";
  import {askSuccessData} from "@/special_assets/js/resetPassword_askAccount.js";



</script>

<template>
  <div class="main resetPassword_Identify_main">
    <div class="form">
      <div>
        <div class="welcome">身份验证</div>
        <div class="identify-desc">为了保护你的账号安全，需要验证你的身份，验证通过后即可找回你的密码。</div>
      </div>
      <div class="identify-list">
        <div class="identify-item-con">
          <div class="identify-item" @click="emailIdentify">
            <div class="identify-item_logo identify-item-logo-email"></div>
            <div class="identify-item_content">
              <div class="title">邮箱验证</div>
              <div class="desc">通过{{askSuccessData.maskedEmail}}接收验证码</div>
            </div>
          </div>
        </div>
        <div class="identify-item-con">
          <div class="identify-item" @click="dataAssistIdentify">
            <div class="identify-item_logo identify-item-logo-info"></div>
            <div class="identify-item_content">
              <div class="title">资料辅助验证</div>
              <div class="desc">填写账号信息以及个人资料进行验证</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/resetPassword_identifyOptionsPageStyles.css" scoped>

</style>
