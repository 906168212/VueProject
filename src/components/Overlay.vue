<script setup>
import {computed, onMounted, ref} from "vue";
import store from "@/store/index.js";
  // 创建一个 computed 属性，用于派生 showOverlay 的值
  // const isOverlayHidden = computed(() => store.state.overlay.showOverlay);
  const removeOverlay = ref(false)

  onMounted(()=>{
    removeOverlay.value = true;
  })
</script>

<template>
  <transition name="overlay">
    <div v-if="!removeOverlay" id="white-overlay"></div>
  </transition>
</template>

<style src="@/special_assets/css/overlay_ComponentStyles.css" scoped>

</style>
