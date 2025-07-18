<script setup lang="ts">
import SvgIcon from "@/components/svgIcon/index.vue";
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()

// 使用计算属性根据当前路由动态计算按钮信息
const linkInfo = computed(()=>{

  return route.path === '/login' ?
      { text: '立即注册', link: '/register' } :
      { text: '立即登录', link: '/login' }
})

</script>

<template>
  <div class="header_wrap bottom_line single_header">
    <div class="header_wrap_hd">
      <a class="header_wrap_hd_logo" href="/">
        <svg-icon icon-name="halihapi" class-name="mini-header__logo" />
      </a>
    </div>
    <div class="header_wrap_bd">
      <router-link class="header_wrap_bd_item" :to="linkInfo.link" ><span>{{linkInfo.text}}</span></router-link>
      <a class="header_wrap_bd_item" @click="$emit('ToQuestionBack')"><span>问题反馈</span></a>
    </div>
  </div>
</template>

<style src="@/special_assets/css/header_styles.css" scoped>

</style>
