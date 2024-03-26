<script setup lang="ts">

import {
  beforeSubmit_check,
  checkContent, hideError,
  login,
  passwordValidation, resetData, responseValidation,
  status,
  toggleToFalse,
  toggleToTrue,
  user, usernameValidation
} from "@/special_assets/js/login/login_form.js";
import {onUnmounted} from "vue";

onUnmounted(()=>{
  resetData()
})

</script>

<template>
  <div class="form_wrap login">
    <div class="form_wrap_container">
      <div class="large_logo_entry">
        <svg viewBox="0 0 192 54" class="large_logo">
          <g transform="translate(-25,85) scale(0.100000,-0.100000)" fill="var(--color_pink)">
            <path d="M270 575 l0 -215 45 0 45 0 -6 115 -7 115 51 0 52 0 0 -115 0 -115 45 0 45 0 0 117 c0 113 -1 118 -27 145 -24 25 -33 28 -95 28 l-68 0 0 70 0 70 -40 0 -40 0 0 -215z"/>
            <path d="M900 698 c0 -51 -3 -150 -7 -220 l-6 -128 49 0 49 0 -2 157 c-2 87 -5 186 -9 221 l-6 62 -34 0 -34 0 0 -92z"/>
            <path d="M1170 575 l0 -215 45 0 45 0 -6 115 -7 115 51 0 52 0 0 -115 0 -115 45 0 45 0 0 117 c0 113 -1 118 -27 145 -24 25 -33 28 -95 28 l-68 0 0 70 0 70 -40 0 -40 0 0 -215z"/>
            <path d="M1040 725 l0 -45 39 0 39 0 4 45 3 45 -42 0 -43 0 0 -45z"/>
            <path d="M2100 725 l0 -45 39 0 39 0 4 45 3 45 -42 0 -43 0 0 -45z"/>
            <path d="M628 663 l-48 -4 0 -108 c0 -60 -3 -129 -6 -155 l-7 -46 55 0 c30 0 96 3 146 6 l92 7 0 28 c0 15 -6 29 -12 31 -9 3 -14 36 -16 106 -5 144 -14 150 -204 135z m122 -153 l0 -90 -40 0 -40 0 0 53 c0 28 -3 69 -6 90 l-7 37 47 0 46 0 0 -90z"/>
            <path d="M1528 663 l-48 -4 0 -108 c0 -60 -3 -129 -6 -155 l-7 -46 55 0 c30 0 96 3 146 6 l92 7 0 28 c0 15 -6 29 -12 31 -9 3 -14 36 -16 106 -5 144 -14 150 -204 135z m122 -153 l0 -90 -40 0 -40 0 0 53 c0 28 -3 69 -6 90 l-7 37 47 0 46 0 0 -90z"/>
            <path d="M1843 663 l-53 -4 0 -189 c0 -103 3 -195 6 -204 4 -11 19 -16 45 -16 l39 0 0 75 0 75 90 0 90 0 0 113 c0 163 -3 165 -217 150z m127 -133 l0 -70 -45 0 -45 0 0 70 0 70 45 0 45 0 0 -70z"/>
            <path d="M1045 628 c-2 -7 -6 -73 -8 -145 l-6 -133 49 0 49 0 -5 133 c-3 72 -7 138 -10 145 -2 6 -17 12 -34 12 -17 0 -32 -6 -35 -12z"/>
            <path d="M2105 628 c-2 -7 -6 -73 -8 -145 l-6 -133 49 0 49 0 -5 133 c-3 72 -7 138 -10 145 -2 6 -17 12 -34 12 -17 0 -32 -6 -35 -12z"/>
          </g>
        </svg>
      </div>
      <form class="form_entry" @submit.prevent="login">
        <div class="input_popover nickname_popover">
          <label for="username"></label>
          <input v-model="user.username" type="text" id="username" maxlength="20" tabindex="3" placeholder="用户名或邮箱"
                 @focus="hideError('username')" @blur="checkContent('username',usernameValidation)"
                :class="{error:status.username || status.response}" autocomplete="off">
          <div class="error-tips-wrap" :class="{slideup:!status.username}">
            <transition name="usernameError">
              <div class="error-tips" v-show="status.username">{{usernameValidation}}</div>
            </transition>
          </div>

        </div>
        <div class="input_popover password_popover">
          <div class="eye" :class="{'close':status.show_password}" title="长按显示密码" @mousedown="toggleToTrue('show_password')" @mouseup="toggleToFalse('show_password')"></div>
          <label for="password"></label>
          <input v-model="user.password" id="password" maxlength="16" tabindex="4" placeholder="密码" :type="status.show_password ? 'text':'password'"
          @focus="hideError('password')" @blur="checkContent('password',passwordValidation)"
          :class="{error:status.password || status.response}">
          <div class="error-tips-wrap" :class="{slideup:!status.password}">
            <transition name="passwordError">
              <div class="error-tips" v-show="status.password">{{passwordValidation}}</div>
            </transition>
          </div>
        </div>
        <div class="remember_and_forget_popover">
          <div class="popover_left">
            <input v-model="user.remember" class="diy_checkbox" type="checkbox" id="remember_check_box">
            <label for="remember_check_box" class="diy_check_box_style">
              <img class="check_icon" src="@/assets/svg/check.svg" alt="">
            </label>
            <span>自动登录</span>
          </div>
          <div class="popover_right">
            <a><span>忘记密码</span></a>
          </div>
        </div>
        <div class="submit_popover">
          <button class="form_btn" @click="beforeSubmit_check">登录</button>
          <div class="error-tips-wrap" :class="{slideup:!status.response}">
            <transition name="responseError">
              <div class="error-tips" v-show="status.response">{{responseValidation}}</div>
            </transition>
          </div>
        </div>
      </form>

    </div>
  </div>
</template>

<style src="@/special_assets/css/login_form_styles.css" scoped>

</style>
