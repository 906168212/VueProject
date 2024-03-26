<script setup>

import Index_test_part from "@/views/index/index_test_part.vue";
import Index_header from "@/views/index/index_header.vue";
import {onMounted, onUnmounted} from "vue";
import Footer from "@/components/Footer.vue";
import Overlay from "@/components/Overlay.vue";
import {Nav} from "@/api/navApi.js";
import {handleScroll} from "@/utils/utils.js";
import Header_video_banner from "@/components/header/header_video_banner.vue";



onMounted(()=>{
  window.addEventListener('scroll',handleScroll)
  Nav()
})
onUnmounted(()=>{
  window.removeEventListener('scroll',handleScroll)
})

</script>

<template>
  <div id="indexPage">
    <index_header>
      <template #videoBanner>
        <header_video_banner/>
      </template>
    </index_header>
    <index_test_part/>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style src="@/special_assets/css/index_mainPageStyles.css" scoped>

</style>
