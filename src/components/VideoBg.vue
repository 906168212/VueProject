<script setup lang="ts">
  const props = defineProps({
    videoSrc: {
      type: String,
      default: ''
    }
  })
</script>

<template>
  <div class="video_wrap">
    <video id="video" class="video-wrap__video" :src="videoSrc" type="video/mp4"
           tabindex="-1" autoplay muted webkit-playsinline="true" playsinline="true"></video>
  </div>
</template>

<style src="@/special_assets/css/video_bg_styles.css" scoped>

</style>
