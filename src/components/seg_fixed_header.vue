<script setup>
const prop = defineProps({
  fixedName:{
    type: String,
    default: '默认'
  }
})
</script>

<template>
  <div class="fixed_popover">
    <div class="fixed_popover_left name">{{fixedName}}</div>
  </div>
</template>

<style src="@/special_assets/css/seg_fixed_header_styles.css" scoped>

</style>
