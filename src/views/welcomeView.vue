<script setup lang="ts">
import VideoBg from "@/components/VideoBg.vue";
import Footer from "@/components/Footer.vue";
import Overlay from "@/components/Overlay.vue";
import Header_for_login_and_register from "@/components/header_for_login_and_register.vue";
</script>

<template>
  <div id="welcomePage">
    <header_for_login_and_register/>
    <!-- 路由视图容器 -->
    <router-view v-slot="{ Component }">
      <Transition name="fade-slide" mode="out-in">
        <!-- 动态组件 -->
          <component :is="Component"></component>
      </Transition>
    </router-view>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style scoped>
  #welcomePage{
    background: url("@/assets/bg/bg-welcome.jpg") 50% 50%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    min-height: 100vh;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    /*display: none;*/
    transform: translateY(-20px);
  }
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    will-change: transform;
    transition: all .3s cubic-bezier(.55,0,.1,1);
    backface-visibility: hidden; /* 隐藏背面 */

  }
</style>
