<script setup>
  import {
    HasBlank, HasLetterAndNumberButSymbolChinese, HasMultipleTypes, HasRepeatingChars, ValidLength
  } from "@/utils/regular.js";
  import * as Constants from "@/utils/constants.js";
  import {
    userInfo, emailValidation, usernameValidation, passwordValidation, emailCodeValidation,
    agreeFlagButton, errorValidation, SendEmailAbility,
    SendEmailFactor, hideEErrorAndShowEmailCode, toggleAgreeFlagButton, status,
    checkAndShowError, showEmailCode, hideErrorAndShowTIps, showPassword, submitForm, checkAllError, coolDown
  } from "@/special_assets/js/registerForm.js";
</script>

<template>
  <div class="main">
    <div class="form">
      <div>
        <div class="welcome">欢迎注册希望园</div>
        <div class="header">在这里，属于你的秘密。</div>
      </div>
      <form  id="input" class="input-wrap" @submit.prevent="submitForm">
        <div  class="input-wrap__item input-area">
          <div class="input-flags">
            <div class="input-ok" v-show="status.username === 'ok'"></div>
          </div>
          <label for="nickname"></label>
          <div class="input-outer">
            <input type="text" id="nickname" maxlength="20" tabindex="3" placeholder="用户名"
                   v-model="userInfo.username" @focus="hideErrorAndShowTIps('username')" @blur="checkAndShowError('username',usernameValidation)"
                   autocomplete="off" :class="{'error': status.username === 'error'}">
          </div>
          <div id="username-tips" class="username-tips-group" :class="{slideup: status.username !== 'tips'}">
            <div class="username-tips" :class="{'ok': !HasBlank(userInfo.username) }">不能包括空格</div>
            <div class="username-tips" :class="{'ok': ValidLength(userInfo.username,Constants.MIN_USERNAME_LENGTH,Constants.MAX_USERNAME_LENGTH) }">长度为10-20个字符</div>
            <div class="username-tips" :class="{'ok': HasLetterAndNumberButSymbolChinese(userInfo.username) }">必须包含字母、数字，不包含特殊字符，中文</div>
          </div>
          <div class="error-tips-wrap" :class="{slideup: status.username !== 'error'}">
            <div class="error-tips" v-show="status.username === 'error'">{{usernameValidation}}</div>
          </div>
        </div>
        <!--   密码   -->
        <div class="input-wrap__item input-area input-wrap__item-password">
          <div class="input-flags">
            <div class="input-ok" v-show="status.password === 'ok'"></div>
            <div href="javascript:void(0)" :class="{'eye': showPassword,'eye close': !showPassword }"
                 title="长按显示密码" @mousedown="showPassword = true" @mouseup="showPassword = false"
                 @mouseleave="showPassword = false" @touchstart="showPassword = true"
                 @touchend="showPassword = false" v-show="userInfo.password.length!==0"></div>
          </div>
          <label for="password"></label>
          <div class="input-outer">
            <input id="password" maxlength="16" tabindex="4" placeholder="密码" :type="showPassword ? 'text' : 'password'"
                   v-model="userInfo.password" @focus="hideErrorAndShowTIps('password')" @blur="checkAndShowError('password',passwordValidation)"
                   :class="{'error': status.password === 'error' }" autocomplete="off"></div>
            <div id="password-tips" class="password-tips-group" :class="{slideup: status.password !== 'tips'}">
              <div class="password-tips" :class="{'ok': !HasBlank(userInfo.password) }">不能包括空格</div>
              <div class="password-tips" :class="{'ok': ValidLength(userInfo.password,Constants.MIN_PASSWORD_LENGTH,Constants.MAX_PASSWORD_LENGTH) }">长度为8-16个字符</div>
              <div class="password-tips" :class="{'ok': HasMultipleTypes(userInfo.password) }">必须包含字母、数字、符号中至少2种</div>
              <div class="password-tips" :class="{'ok': !HasRepeatingChars(userInfo.password) }">请勿输入连续、重复6位以上字母或数字，如abcdefg、1111111、0123456</div>
            </div>
            <div  class="error-tips-wrap" :class="{slideup: status.password !== 'error'}">
              <div class="error-tips" v-show="status.password === 'error'">{{passwordValidation}}</div>
            </div>
          </div>
        <!--  邮箱  -->
        <div class="input-wrap__item input-area email-wrap">
          <div class="input-flags">
            <div class="input-ok" v-show="status.email === 'ok'"></div>
          </div>
          <div class="email-wrap__inner">
              <div class="email-wrap_hd">
                <label for="email"></label>
                <input id="email" type="text" class="email-wrap__text-input awesomplete" tabindex="5" placeholder="电子邮箱"
                       v-model="userInfo.email"  maxlength="25" @focus="hideEErrorAndShowEmailCode" @blur="checkAndShowError('email',emailValidation)"
                       autocomplete="off" name="email">
              </div>
          </div>
          <div class="error-tips-wrap" :class="{slideup: status.email !== 'error'}">
            <div class="error-tips" style="margin: 0" v-if="status.email === 'error'">{{emailValidation}}</div>
          </div>
        </div>
        <!--  验证码  -->
        <div id="emailCode" class="input-wrap__item emailCode-wrap" v-show="showEmailCode">
          <div class="emailCode-wrap__inner">
            <div class="emailCode-wrap__bd">
              <label for="code"></label>
              <input id="code" placeholder="邮箱验证码" type="text" class="emailCode-wrap__text-code" tabindex="7" maxlength="6"
                     autocomplete="off" v-model="userInfo.emailCode"
                     @focus="hideErrorAndShowTIps('emailCode')" @blur="checkAndShowError('emailCode',emailCodeValidation)">
            </div>
            <div class="emailCode-wrap__ft">
              <button class="emailCode-wrap__btn" :class="{'disabled': !SendEmailAbility}"
                      value="sendEmail"  @click="SendEmailFactor">发送验证码<span v-show="coolDown>0">({{ coolDown + 'S' }})</span></button>
            </div>
          </div>
          <div  class="error-tips-wrap"  :class="{slideup: status.emailCode !== 'error' }">
            <div class="error-tips" v-show="status.emailCode === 'error'">{{ emailCodeValidation}}</div>
          </div>
        </div>
        <div class="agreement-wrap">
          <div class="agreement-wrap__inner">
            <div class="agreement-wrap_hd">
              <label for="agree"></label>
              <input class="agreement-wrap__icon agreement-wrap__icon-input" type="checkbox" name="agree" id="agree"
                     @click="toggleAgreeFlagButton">
              <i class="agreement-wrap__icon" v-show="!agreeFlagButton"></i>
              <i class="agreement-wrap__icon agreement-wrap__icon-checked " v-show="agreeFlagButton"></i>
            </div>
            <div class="agreement-wrap_bd">
              <span class="agreement-wrap__text">
                我已阅读并同意
                <a href="" class="text-link">服务协议</a>
                和
                <a href="" class="text-link">希望园隐私保护指引</a>
              </span>
            </div>
          </div>
        </div>
        <div class="submit_button">
          <button id="get_acc" type="submit" class="btn-submit" value="register" tabindex="8"
                  @click="checkAllError">立即注册</button>
          <div class="error-tips-wrap" :class="{slideup:status.error!=='error'}" >
            <div class="error-tips" v-show="status.error==='error'">
              {{ errorValidation }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="@/special_assets/css/register_MAINPageStyles.css" scoped></style>
