<script setup>
import {onMounted} from "vue";
import {errorValidation, generateQRCode, qrCodeSrc, status} from "@/special_assets/js/resetPassword_dataAssist.js";

  onMounted(()=>{
    // 在页面加载时获取二维码图像数据
    generateQRCode();
  })

</script>

<template>
  <div class="main resetPassword_dataAssist_main">
    <div class="form">
      <div>
        <div class="welcome">资料辅助验证</div>
        <div class="identify-desc">请使用任意一个已登录的希望园账号扫描二维码，进行资料辅助验证。</div>
      </div>
      <div class="QRCode" v-show="status.error!=='error'">
        <img :src="qrCodeSrc" alt="QR Code">
      </div>
      <div class="error-tips-wrap" :class="{slideup: status.error!=='error'}">
        <div class="error-tips" v-show="status.error==='error'">{{errorValidation}}</div>
      </div>
      <div>
        <div class="identify-desc " style="margin-top: 10px">tips: 无法扫码？你也可以前往手机希望园登录首页，点击右下角更多选项-->找回密码进行找回。</div>
      </div>
    </div>

  </div>
</template>

<style src="@/special_assets/css/resetPassword_dataAssistedPageStyles.css" scoped>

</style>
