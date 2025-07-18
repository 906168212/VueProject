 <script setup>
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import {handleScroll} from "@/utils/utils.ts";
import {Nav} from "@/api/navApi.js";
import Overlay from "@/components/Overlay.vue";
import Index_header from "@/views/index/index_header.vue";
import Footer from "@/components/Footer.vue";
import Header_picture_banner from "@/components/header/header_picture_banner.vue";
import Seg_fixed_header from "@/components/seg_fixed_header.vue";
import router from "@/router/index.js";
import {useRouter} from "vue-router";
import store from "@/store/index.js";
import SvgIcon from "@/components/svgIcon/index.vue";
import {getArticle} from "@/api/articleApi.js";

onMounted(()=>{
  window.addEventListener('scroll',handleScroll)
  Nav()
})
onUnmounted(()=>{
  window.removeEventListener('scroll',handleScroll)
})
const data = reactive({
  name:''
})
const IdWithPageName = {
  1: 'game_index',
  2: 'game_pc',
  3: 'game_simulator',
  4: 'game_best',
  5: 'game_phone',
  6: 'game_plug'
}
const handleGamePageChange=(selectedId)=>{
  data.name = IdWithPageName[selectedId]
  router.push({name:IdWithPageName[selectedId]})
}
const currentPageId = computed(()=>store.state.page.gamePage)
onMounted(()=>{
  data.name = IdWithPageName[currentPageId.value]
})
</script>
<template>
  <div id="game">
    <index_header :selected-link-id="3">
      <template #pictureBanner>
        <header_picture_banner/>
      </template>
    </index_header>
    <seg_fixed_header :fixed-name="'游戏'" @selected-id="handleGamePageChange"/>
    <router-view :data="data"/>
    <Footer/>
  </div>
  <Overlay/>
</template>

<style  scoped>
#game{
  position: relative;
  margin: 0 auto;
  max-width: 2560px;
  background-color: var(--bg_white);
}
</style>
