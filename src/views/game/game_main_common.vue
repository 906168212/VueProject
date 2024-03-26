<script setup>
  const props = defineProps({
    data:{
      type:Object,
      required:true
    }
  })
</script>

<template>
  <div>这是通用组件-{{data.name}}</div>
</template>

<style scoped>

</style>
