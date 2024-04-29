<script setup>

</script>

<template>
  <div class="dialog_overlay">
    <div class="dialog_popover">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog_overlay{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  overflow: auto;
}
.dialog_popover{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
</style>