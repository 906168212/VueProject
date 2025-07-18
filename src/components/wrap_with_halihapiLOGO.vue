<script setup lang="ts">

import SvgIcon from "@/components/svgIcon/index.vue";
</script>

<template>
  <div class="wrap">
    <div class="large_logo_entry">
      <svg-icon class-name="halihapi_svg" icon-name="halihapi"></svg-icon>
    </div>
    <slot name="form"></slot>
  </div>
</template>

<style scoped>
.wrap{
  position: relative;
  width: fit-content;
  height: fit-content;
  max-width: 400px;
  padding: 20px 40px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.4);
}
.halihapi_svg{
  color: var(--color_pink);
  height: 84.38px;
  width: auto;
}
</style>
