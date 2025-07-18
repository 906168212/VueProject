<script setup lang="ts">
  import Wrap_with_halihapiLOGO from "@/components/wrap_with_halihapiLOGO.vue";
  import FormInput from "@/components/formInput.vue";
  import {MAX_USERNAME_LENGTH} from "@/utils/constants.js";
  import {forgetFormState} from "@/special_assets/js/forget/forgetFormState";

  const {formData,uiState,v$} = forgetFormState()

  const userFocus = (fieldName) => {
    const fieldValidator = v$.value[fieldName]
    if (fieldValidator){
      uiState.activeFields[fieldName] = true
      v$.value[fieldName].$reset() // 可选：聚焦时重置验证状态
    }
  }
  const userBlur = (fieldName) => {
    const fieldValidator = v$.value[fieldName]
    if (fieldValidator){
      uiState.activeFields[fieldName] = false
      fieldValidator.$touch()
    }
  }

</script>

<template>
  <div class="form_wrap resetPassword_main">
    <wrap_with_halihapi-l-o-g-o>
      <template #form>
        <div class="form">
          <div style="margin-bottom: 20px">
            <div class="welcome">找回密码</div>
          </div>
          <form id="resetPassword-username" class="input-wrap" @submit.prevent="submitForm">
            <form-input id="username" type="text" place-holder="请输入账号" :max-length="MAX_USERNAME_LENGTH.toString()"
                        @focus="userFocus('username')" @blur="userBlur('username')" v-model="formData.username" :error="v$.username.$error">
              <template #dis-error>
                <div class="error-tips-wrap" :class="{slideup: !v$.username.$error}">
                  <div class="error-tips" v-show="v$.username.$error">{{v$.username.$errors[0]?.$message||''}}</div>
                </div>
              </template>
            </form-input>
            <div class="submit_popover">
              <button class="form_btn" value="next">下一步</button>
            </div>
<!--            <div  class="input-wrap__item input-area resetPassword_username_inner">-->
<!--              <div class="input-outer">-->
<!--                <input type="text" id="username" maxlength="20" tabindex="1" placeholder="请输入账号"-->
<!--                       v-model="username" autocomplete="off" :class="{error:status.error === 'error'|| status.username === 'error'}"-->
<!--                       @click="hideError" @blur="checkAndShowError">-->
<!--              </div>-->
<!--              <div class="error-tips-wrap" :class="{slideup: status.username !== 'error'}">-->
<!--                <div class="error-tips" v-show="status.username === 'error'">{{usernameValidation}}</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="submit_button">-->
<!--              <button id="get_acc" type="submit" class="btn-submit" value="askAccount"-->
<!--                      :class="{disabled:InputNone(username)}"  tabindex="2" :disabled="InputNone(username)">-->
<!--                下一步</button>-->
<!--              <div class="error-tips-wrap" :class="{slideup: status.error !== 'error'}">-->
<!--                <div class="error-tips" v-show="status.error === 'error'">{{errorValidation}}</div>-->
<!--              </div>-->
<!--            </div>-->
          </form>
        </div>
      </template>
    </wrap_with_halihapi-l-o-g-o>
  </div>
</template>

<style src="@/special_assets/css/resetPassword_accountPageStyles.css" scoped>

</style>
