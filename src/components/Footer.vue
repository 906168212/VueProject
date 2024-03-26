<script setup>
import {onMounted, ref} from "vue";

  const currentYear = ref(new Date().getFullYear());
  onMounted(() => {
  // 在组件挂载后更新当前年份
  updateCurrentYear();
  });
  function updateCurrentYear() {
    currentYear.value = new Date().getFullYear();
  }
</script>

<template>
  <div class="footer">
    Copyright
    <span class="footer__text-copryright">©</span>
    <span class="footer__text-date">2024 - {{currentYear}}</span>For My Own Test Reserved.
  </div>
</template>

<style src="@/special_assets/css/footer_styles.css" scoped>

</style>
