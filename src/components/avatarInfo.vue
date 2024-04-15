<script setup>

import {computed, onUnmounted, reactive, ref} from "vue";
import SvgIcon from "@/components/svgIcon/index.vue";
import {animationEnd, animationStart, mouseEnter_animation, mouseLeave_animation} from "@/utils/utils.js";
import {AvatarInfo, Nav} from "@/api/dataInfo.js";

const props = defineProps({
  user:{
    type:Object,
    required:true,
    default: reactive(new AvatarInfo())
  },
  animation:{
    type:Object,
    required:true
  },
  mouse:{
    type:Object,
    required:true
  }
})

class AvatarInfo{
  nickname = '用户000000'
  current_level_name = '新手上路'
  vip_status = 0
  current_level = 1
  current_vip = 0
  point_num = 0
  future_coin_num = 0
  motion_num = 0
  concerned_num = 0
  fan_num = 0
}

const avatarInfo = reactive(new AvatarInfo())

// export const avatarInfo =

const timer = ref(null)

const pointForOneFixed=computed(()=>{
  return avatarInfo.point_num.toFixed(1);
})
const futureCoinForOneFixed=computed(()=>{
  return avatarInfo.future_coin_num.toFixed(1);
})
const otherServiceEnterAnimation=()=>{
  mouseEnter_animation(props.animation,'otherService',timer,props.mouse)
}
const otherServiceLeaveAnimation=()=>{
  mouseLeave_animation(props.animation,'otherService',timer,props.mouse)
}

onUnmounted(()=>{
  timer.value = null
  Object.assign(avatarInfo,new AvatarInfo())
})

</script>

<template>
  <div class="header_userInfo_popover">
    <div class="header_userInfo_entry">
      <div class="avatar-panel-popover">
        <a class="large_avatar"></a>
        <a class="header_nickname" :class="{nickname_vip_color:avatarInfo.vip_status}">{{avatarInfo.nickName}}</a>
        <div class="vip_normal_item">
          <a class="user_level_name">{{avatarInfo.current_level_name}}</a>
          <a class="user_level_content">
            <svg-icon :icon-name="`user_level_${avatarInfo.current_level}`" class-name="user_level_svg"></svg-icon>
          </a>
          <a class="user_vip_content">
            <svg-icon :icon-name="`vip_${avatarInfo.current_vip}`" class-name="user_vip_svg"></svg-icon>
          </a>
        </div>
        <div class="coins-item">
          <div class="point_coins_box">
            <a class="user_point_content">
              <svg-icon icon-name="point" class-name="user_point_svg"></svg-icon>
              <span class="user_coins_test">积分:</span>
              <span class="user_coins_num">{{pointForOneFixed}}</span>
            </a>
          </div>
          <div class="future_coins_box">
            <a class="user_future_coins_content">
              <svg-icon icon-name="future_coin" class-name="user_future_coins_svg"></svg-icon>
              <span class="user_coins_test">F币:</span>
              <span class="user_coins_num">{{futureCoinForOneFixed}}</span>
            </a>
          </div>
        </div>
        <div class="counts-item">
          <a class="single-count-item">
            <span class="count-sum change_blue">{{avatarInfo.motion_num}}</span>
            <span class="count-test change_blue">动态</span>
          </a>
          <a class="single-count-item">
            <span class="count-sum change_blue">{{avatarInfo.concerned_num}}</span>
            <span class="count-test change_blue">关注</span>
          </a>
          <a class="single-count-item">
            <span class="count-sum">{{avatarInfo.fan_num}}</span>
            <span class="count-test">粉丝</span>
          </a>
        </div>
        <div class="vip-entry-container">
          <div class="vip-entry-desc">
            <p class="title">开通会员，尊享特权</p>
            <p class="subtitle">新人立享首次优惠</p>
          </div>
          <button class="vip-entry-btn">开通会员</button>
        </div>
        <div class="links-item">
          <a class="single-link-item">
            <div class="link-title">
              <svg-icon icon-name="personal_center" class-name="link-icon"></svg-icon>
              <span>个人中心</span>
            </div>
            <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
          </a>
          <a class="single-link-item">
            <div class="link-title">
              <svg-icon icon-name="send_article_manage" class-name="link-icon"/>
              <span>投稿管理</span>
            </div>
            <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
          </a>
          <div class="other_service_item" @mouseenter="otherServiceEnterAnimation" @mouseleave="otherServiceLeaveAnimation">
            <a class="single-link-item" >
              <div class="link-title">
                <svg-icon icon-name="other_service" class-name="link-icon"/>
                <span>其余服务</span>
              </div>
              <svg-icon icon-name="arrow" class-name="link-icon--right"></svg-icon>
            </a>
            <transition name="other_service_animation"  @before-leave="animationStart(animation,'otherService')" @after-leave="animationEnd(animation,'otherService')">
              <div class="other_service_item_is-right" v-if="mouse.otherService" >
                <div class="sub-links-item">
                  <a class="single-link-item sub-link-item">
                    <div class="link-title">
                      <svg-icon icon-name="order_center" class-name="link-icon"/>
                      <span>订单中心</span>
                    </div>
                  </a>
                  <a class="single-link-item sub-link-item">
                    <div class="link-title">
                      <svg-icon icon-name="rich_manage" class-name="link-icon"/>
                      <span>财富管理</span>
                    </div>
                  </a>
                  <a class="single-link-item sub-link-item">
                    <div class="link-title">
                      <svg-icon icon-name="task_center" class-name="link-icon"/>
                      <span>任务中心</span>
                    </div>
                  </a>
                  <a class="single-link-item sub-link-item">
                    <div class="link-title">
                      <svg-icon icon-name="send_article_manage" class-name="link-icon"/>
                      <span>投稿管理</span>
                    </div>
                  </a>
                </div>
              </div>
            </transition>
          </div>


        </div>
        <div class="split-line"></div>
        <div class="logout-item" @click="logout">
          <svg-icon icon-name="logout" class-name="link-icon"/>
          <span>退出登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/avatar_info.css" scoped>

</style>
