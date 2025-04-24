<script setup>

import {
  checkContent, checkContentAndHideTips, coolDown, emailCodeValidation, emailValidation,
  getAgreement, hideError, hideErrorAndShowEmailCode, hideErrorAndShowTips,
  isCanSendEmail, isShowAgreementError, passwordValidation, registerForm, resetData,
  responseValidation, show, show_error, submitForm, tips, toggleToFalse, toggleToTrue, usernameValidation
} from "@/special_assets/js/register/register_form";
import {onUnmounted, watch} from "vue";
import {HasBlank,ValidLength,HasMultipleTypes,HasRepeatingChars,HasLetterAndNumberButSymbolChinese} from "@/utils/regular.js"
import * as Constants from "@/utils/constants.js";
import SvgIcon from "@/components/svgIcon/index.vue";


onUnmounted(()=>{
  resetData()
})
watch(getAgreement,(agreement)=>{isShowAgreementError(agreement)})

</script>

<template>
  <div class="form_wrap register">
    <div class="form_wrap_container">
      <div class="form_wrap_inner">
        <div class="large_logo_entry">
          <svg-icon class-name="register_halihapi_svg" icon-name="halihapi"></svg-icon>
        </div>
        <form class="form_entry" @submit.prevent="submitForm">

          <!-----------账号------------->
          <div class="input_popover username_popover">
            <div class="input_flag_wrap">
              <div class="input_ok" v-show="usernameValidation===''"></div>
            </div>
            <label for="username"></label>
            <input  type="text" id="username" maxlength="20" tabindex="3" placeholder="用户名"
                    @focus="hideErrorAndShowTips('username')" @blur="checkContentAndHideTips('username',usernameValidation)"  autocomplete="off" v-model="registerForm.username"
                    :class="{error: show_error.username}">
            <div class="input_tips username" :class="{slideup:!tips.username}">
              <div class="input_tips_item" :class="{'ok': !HasBlank(registerForm.username) }">不能包括空格</div>
              <div class="input_tips_item" :class="{'ok': ValidLength(registerForm.username,Constants.MIN_USERNAME_LENGTH,Constants.MAX_USERNAME_LENGTH) }">长度为10-20个字符</div>
              <div class="input_tips_item" :class="{'ok': HasLetterAndNumberButSymbolChinese(registerForm.username) }">必须包含字母、数字，不包含特殊字符，中文</div>
            </div>
            <div class="error-tips-wrap" :class="{slideup:!show_error.username}">
              <div class="error-tips" v-show="show_error.username">{{usernameValidation}}</div>
            </div>
          </div>
          <!-----------密码------------->
          <div class="input_popover password_popover">
            <div class="input_flag_wrap">
              <div class="input_ok" v-show="passwordValidation===''"></div>
              <div class="eye" :class="{close: !show.password}" title="长按显示密码" @mousedown="toggleToTrue" @mouseup="toggleToFalse"></div>
            </div>
            <label for="password"></label>
            <input id="password" maxlength="16" tabindex="4" placeholder="密码" :type="show.password ? 'text':'password'"
                   @focus="hideErrorAndShowTips('password')" @blur="checkContentAndHideTips('password',passwordValidation)"
                   :class="{error:show_error.password}" v-model="registerForm.password">
            <div class="input_tips password" :class="{slideup:!tips.password}">
              <div class="input_tips_item" :class="{'ok': !HasBlank(registerForm.password) }">不能包括空格</div>
              <div class="input_tips_item" :class="{'ok': ValidLength(registerForm.password,Constants.MIN_PASSWORD_LENGTH,Constants.MAX_PASSWORD_LENGTH) }">长度为8-16个字符</div>
              <div class="input_tips_item" :class="{'ok': HasMultipleTypes(registerForm.password) }">必须包含字母、数字、符号中至少2种</div>
              <div class="input_tips_item" :class="{'ok': !HasRepeatingChars(registerForm.password) }">请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456</div>
            </div>
            <div class="error-tips-wrap" :class="{slideup:!show_error.password}">
              <div class="error-tips" v-show="show_error.password">{{passwordValidation}}</div>
            </div>
          </div>
          <!-----------邮箱------------->
          <div class="input_popover email_popover">
            <div class="input_flag_wrap">
              <div class="input_ok" v-show="emailValidation===''"></div>
            </div>
            <label for="email"></label>
            <input id="email" maxlength="25" tabindex="5" placeholder="电子邮箱" autocomplete="off" v-model="registerForm.email"
            @focus="hideErrorAndShowEmailCode" @blur="checkContent('email',emailValidation)"
            :class="{error:show_error.email}">
            <div class="error-tips-wrap" :class="{slideup:!show_error.email}">
              <div class="error-tips" v-show="show_error.email">{{emailValidation}}</div>
            </div>
          </div>
          <!-----------验证------------->
          <div class="input_popover email_code_popover" v-show="show.emailCode">
            <div class="email_code_popover_container">
              <div class="email_code_popover_bd">
                <label for="emailCode"></label>
                <input id="emailCode" placeholder="邮箱验证码" tabindex="6" maxlength="6" autocomplete="off" v-model="registerForm.email_code"
                @focus="hideError('emailCode')" @blur="checkContent('emailCode',emailCodeValidation)">
              </div>
              <div class="email_code_popover_hd">
                <button class="email_send_btn" :class="{forbid:!isCanSendEmail}" value="send_email">发送验证码<span v-show="coolDown>0">({{ coolDown + 'S' }})</span></button>
              </div>
            </div>
            <div class="error-tips-wrap" :class="{slideup:!show_error.emailCode}">
              <div class="error-tips" v-show="show_error.emailCode">{{emailCodeValidation}}</div>
            </div>
          </div>
          <!-----------协议------------->
          <div class="input_popover agreement_popover" style="margin-top: 4px">
            <input class="diy_checkbox" type="checkbox" id="remember_check_box" v-model="registerForm.agreement">
            <label for="remember_check_box" class="diy_check_box_style">
              <img class="check_icon" src="@/assets/svg/check.svg" alt="">
            </label>
            <span>我已阅读并同意
            <a href="" class="agreement_text">服务协议</a>和
            <a href="" class="agreement_text">隐私保护指引</a>
          </span>
          </div>
          <!-----------提交------------->
          <!--
            有两个条件会触发总错误的提示：
              1、 协议未同意
              2、 响应有错误
            显现错误的几种情况：
              1、 点击了协议同意，但又取消了
              2、 发送邮件点击，但没有同意协议
              3、 响应有错误

          -->
          <div class="submit_popover">
            <button class="form_btn" value="register">注册</button>
            <div class="error-tips-wrap" :class="{slideup: !show_error.response && !show_error.agreement}">
              <div class="error-tips" v-show="show_error.response || show_error.agreement">{{responseValidation}}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/register_form_styles.css" scoped>

</style>
