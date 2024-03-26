<script setup>
import {
  handleMouseEnter,
  handleMouseLeave,
  handleMouseMove,
  mouseMoveTransform, transitionType
} from "@/special_assets/js/index/index_header.ts";
</script>

<template>
  <div class="header_video_banner" @mouseenter="handleMouseEnter" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
    <video loop autoplay muted src="@/assets/video/header_video_summer_1.mp4"
           :style="{transform: mouseMoveTransform,transition: transitionType}"></video>
  </div>
</template>

<style scoped>
.header_video_banner{
  display: flex;
  justify-content: center;
  position: relative;
  height: 9.375vw;
  max-height: 240px;
  min-height: 155px;
  min-width: 1100px;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.header_video_banner video{
  object-fit: cover;
}
</style>
