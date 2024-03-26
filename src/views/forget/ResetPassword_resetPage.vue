<script setup>

import {HasBlank, HasMultipleTypes, HasRepeatingChars, ValidLength} from "@/utils/regular.js";
import {
  hideErrorAndShowTIps, passwordValidation, userInfo, status, checkAndShowError,
  repeatPasswordValidation, show, submitAbility, errorValidation, submitForm
} from "@/special_assets/js/resetPassword_reset.js";
import * as Constants from "@/utils/constants.js";
</script>

<template>
  <div class="main resetPassword_reset_main">
    <div class="form">
      <div>
        <div class="welcome">找回密码</div>
        <div>设置新密码</div>
      </div>
      <form id="resetPassword-reset" class="input-wrap" @submit.prevent="submitForm">
        <!--新密码-->
        <div class="input-wrap__item input-area input-wrap__item-password">
          <div class="input-flags">
            <div class="input-ok" v-show="status.password === 'ok'"></div>
            <div href="javascript:void(0)" :class="{'eye': show.password,'eye close': !show.password }"
                 title="长按显示密码" @mousedown="show.password = true" @mouseup="show.password = false"
                 @mouseleave="show.password = false" @touchstart="show.password = true"
                 @touchend="show.password = false" v-show="userInfo.password.length!==0"></div>
          </div>
          <label for="password"></label>
          <div class="input-outer">
            <input id="new_password" maxlength="16" tabindex="4" placeholder="请输入新密码" :type="show.password ? 'text' : 'password'"
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
        <!--重复新密码-->
        <div class="input-wrap__item input-area input-wrap__item-password">
          <div class="input-flags">
            <div class="input-ok" v-show="status.repeatPassword === 'ok' && userInfo.repeatPassword!==''"></div>
            <div href="javascript:void(0)" :class="{'eye': show.repeatPassword,'eye close': !show.repeatPassword }"
                 title="长按显示密码" @mousedown="show.repeatPassword = true" @mouseup="show.repeatPassword = false"
                 @mouseleave="show.repeatPassword = false" @touchstart="show.repeatPassword = true"
                 @touchend="show.repeatPassword = false" v-show="userInfo.repeatPassword.length!==0"></div>
          </div>
          <label for="password"></label>
          <div class="input-outer">
            <input id="repeat_password" maxlength="16" tabindex="4" placeholder="请再次输入新密码" :type="show.repeatPassword ? 'text' : 'password'"
                   v-model="userInfo.repeatPassword" @focus="hideErrorAndShowTIps('repeatPassword')"
                   @blur="checkAndShowError('repeatPassword',repeatPasswordValidation)"
                   :class="{'error': status.repeatPassword === 'error' }" autocomplete="off"></div>
          <div  class="error-tips-wrap" :class="{slideup: status.repeatPassword !== 'error'}">
            <div class="error-tips" v-show="status.repeatPassword === 'error'">{{repeatPasswordValidation}}</div>
          </div>
        </div>
        <div class="submit_button">
          <button id="get_acc" type="submit" class="btn-submit" tabindex="3" value="reset"
                  :class="{disabled:!submitAbility}" :disabled="!submitAbility" >确定</button>
          <div class="safeTips_text">安全提示：新密码请勿与旧密码过于相似</div>
          <div class="error-tips-wrap" :class="{slideup: status.error!=='error'}">
            <div class="error-tips" v-show="status.error==='error'">{{errorValidation}}</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style src="@/special_assets/css/resetPassword_resetPageStyles.css" scoped>

</style>
