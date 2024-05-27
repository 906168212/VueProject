<script setup>
const props = defineProps({
  height:{
    type:String,
    default:'100%'
  },
  backgroundColor:{
    type:String,
    default:'var(--line_regular)'
  },
  marginLR:{
    type:String,
    default:'15px'
  }
})
</script>

<template>
  <div class="split-line" :style="{height:props.height,backgroundColor:props.backgroundColor,margin:`0 ${props.marginLR}`}"></div>
</template>

<style scoped>
.split-line{
  width: 1px;
}
</style>
