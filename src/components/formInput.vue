<script setup lang="ts">
  import {computed} from "vue";
  import {string} from "fast-glob/out/utils";

  const props = defineProps({
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    placeHolder: {
      type: String,
      default: ''
    },
    tabindex: {
      type: String,
      default: '0'
    },
    maxLength: {
      type: String,
      default: '100'
    },
    minLength: {
      type: String,
      default: '0'
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    modelValue :{
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    }
  })
  const emits = defineEmits(['update:modelValue','focus','blur'])
  const value = computed({
    get : () => props.modelValue,
    set : (val) => emits('update:modelValue',val)
  })
</script>

<template>
  <div class="input_popover">
    <slot name="ok-flag"></slot>
    <label :for="id"></label>
    <input :id="id" :type="type" :placeholder="placeHolder"
           :tabindex="tabindex" :maxlength="maxLength" :minlength="minLength"
           :autocomplete="autocomplete" v-model="value" :class="{error:error}"
           @focus="$emit('focus')" @blur="$emit('blur')">
    <slot name="tips"></slot>
    <slot name="dis-error"></slot>
  </div>
</template>

<style scoped>

</style>
