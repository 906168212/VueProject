<script setup>
const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
</script>

<template>
  <div>这里是game的首页-{{data.name}}</div>
</template>

<style scoped>

</style>
