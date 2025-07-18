<script setup lang="ts">

import {onAvatarError, onImageError} from "@/utils/utils";
import {onUnmounted, ref,reactive} from "vue";
import AvatarInfo from "@/components/avatarInfo.vue";
import {mouseEnter_animation,mouseLeave_animation,animationStart,animationEnd} from "@/utils/utils";

const userCreateDays = ref(0)
const timer = ref(null)
class Mouse {
  avatar = ref<null | boolean>(null)
  otherService = false
  message = false
}
class Animation {
  avatar = false
  otherService = false
}

const mouse = reactive(new Mouse())
const animation = reactive(new Animation())

const resetData = ()=>{
  timer.value = null
  userCreateDays.value = 0
  Object.assign(mouse,new Mouse())
  Object.assign(animation,new Animation())
}

onUnmounted(()=>{
  resetData()
})

const AvatarEnterAnimation=()=>{
  mouseEnter_animation(animation,'avatar',timer,mouse)
}
const AvatarLeaveAnimation=()=>{
  mouseLeave_animation(animation,'avatar',timer,mouse)
}

</script>

<template>
  <div class="header_wrap">
    <div class="header_left_popover">
      <a class="header_left_logo_entry" href="">
        <svg-icon icon-name="halihapi" class-name="halihapi_logo"></svg-icon>
        <span class="header_left_logo_test">投稿中心</span>
      </a>
      <a class="header_left_index_entry" href="/index">
        <svg-icon icon-name="index_small_logo" class-name="header_left_index_logo"></svg-icon>
        <span>首页</span>
      </a>
    </div>
    <div class="header_right_popover">
      <div class="header_user_avatar_entry" @mouseenter="AvatarEnterAnimation" @mouseleave="AvatarLeaveAnimation"
           :class="{'mini-avatar__init':mouse.avatar===null,'mini-avatar__small':mouse.avatar===false,'mini-avatar__large':mouse.avatar===true}">
        <a class="mini_avatar_small_inner">
          <picture class="v-avatar-image">
            <source srcset="" type="image/avif">
            <source srcset="" type="image/webp">
            <img src="" alt="" @error="onAvatarError($event)">
          </picture>
        </a>
        <a class="header-entry-avatar">
          <div class="user_large_avatar">
            <picture class="v-avatar-image">
              <source srcset="" type="image/avif">
              <source srcset="" type="image/webp">
              <img class="avatar_large_face" src="" alt="" @error="onAvatarError($event)">
            </picture>
          </div>
        </a>
        <transition name="avatarInfo" @before-leave="animationStart(animation,'avatar')" @after-leave="animationEnd(animation,'avatar',mouse)">
          <avatar-info v-show="mouse.avatar" :animation="animation" :mouse="mouse"/>
        </transition>
      </div>
      <div class="header_user_create_time_entry">
        <span>成为halihapi创作者的第{{userCreateDays}}天</span>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/header_contribute.css" scoped>

</style>
