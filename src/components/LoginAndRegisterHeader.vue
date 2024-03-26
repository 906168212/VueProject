<script setup>
  import router from "@/router/index.js";

  function PushToRegister(){
    router.push('/register')
  }
</script>

<template>
  <div class="header-wrap">
    <div class="header-wrap_inner">
      <div class="header-wrap_hd">
        <a class="header-wrap_logo" href="/" title="希望园" ></a>
      </div>
      <div class="header-wrap-bd">
        <div class="nav-wrap">
          <div class="nav-wrap__inner">
            <div class="nav-wrap__item">
              <span class="nav-wrap__text" @click="PushToRegister">注册账号</span>
            </div>
            <div class="nav-wrap__item">
              <span class="nav-wrap__text">意见反馈</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
