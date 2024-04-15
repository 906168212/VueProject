<script setup>
  import {onMounted} from "vue";
  import store from "@/store/index.js";

  onMounted(()=>{
    store.commit('page/setContributePage',3)
  })
</script>

<template>

</template>

<style scoped>

</style>
