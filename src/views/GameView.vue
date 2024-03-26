<script setup>

import {onMounted, onUnmounted} from "vue";
import {handleScroll} from "@/utils/utils.js";
import {Nav} from "@/api/navApi.js";
import Overlay from "@/components/Overlay.vue";
import Index_header from "@/views/index/index_header.vue";
import Footer from "@/components/Footer.vue";
import Header_picture_banner from "@/components/header/header_picture_banner.vue";
import Seg_fixed_header from "@/components/seg_fixed_header.vue";

onMounted(()=>{
  window.addEventListener('scroll',handleScroll)
  Nav()
})
onUnmounted(()=>{
  window.removeEventListener('scroll',handleScroll)
})

</script>
<template>
  <div id="game">
    <index_header :selected-link-id="3">
      <template #pictureBanner>
        <header_picture_banner/>
      </template>
    </index_header>
    <seg_fixed_header :fixed-name="'游戏'"/>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style  scoped>
#game{
  position: relative;
  background: var(--background-white);
  max-width: 2560px;
  margin: 0 auto;
}
</style>
