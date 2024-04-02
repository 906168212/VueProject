<script setup>
import {onUnmounted, ref} from "vue";

  defineProps({
    showImage:{
      type:Boolean,
      default:false
    }
  })
  const imageLoadError = ref(false)
  onUnmounted(()=>{
    imageLoadError.value= false
  })
</script>

<template>
  <div class="image_banner_popover" v-if="showImage">
    <img :src="`https://picsum.photos/2320/192.webp?${Math.random()}`" alt="" @error="imageLoadError=true">
    <div class="error_show" v-if="imageLoadError">
      <span>⚠图片加载失败⚠</span>
    </div>
  </div>
</template>

<style scoped>

</style>
