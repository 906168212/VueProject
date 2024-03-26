<script setup>

import LoginAndRegisterHeader from "@/components/LoginAndRegisterHeader.vue";
import Footer from "@/components/Footer.vue";
import VideoBg from "@/components/VideoBg.vue";
import '@/utils/forbidBack.js'
</script>

<template>
  <div id="resetPasswordPage">
    <VideoBg/>
    <LoginAndRegisterHeader/>
    <div id="main-wraper" class="main-wrap" style="margin: 0;">
      <router-view  v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style src="../special_assets/css/resetPassword_MainPageStyles.css" scoped>

</style>
