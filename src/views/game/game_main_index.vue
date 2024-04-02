<script setup>
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/swiper-bundle.css';
import {
  bestArticle, bestList, goodArticle, handleLoaded,
  pcArticle, pcList, phoneArticle, phoneList, pluginArticle, pluginList, resetData,
  simulatorArticle, simulatorList, swiper_game, swiperImage, updateArticle
} from "@/special_assets/js/game_main_index.js";
import {onMounted, onUnmounted} from "vue";
import GridPopover from "@/components/gridPopover.vue";
const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
onUnmounted(()=>{
  resetData()
})
onMounted(()=>{
})

</script>

<template>
  <div class="channel_layout main_part">
    <div class="game_carousel_popover swiper-no-swiping">
      <swiper :loop="swiper_game.loop" :autoplay="swiper_game.autoplay"  :pagination="swiper_game.pagination"
              :slidesPerView="swiper_game.slidesPerView" :centered-slides="swiper_game.centeredSlides"
              :navigation="swiper_game.navigation" :round-lengths="swiper_game.roundLengths"
      :effect="swiper_game.effect" :coverflow-effect="swiper_game.coverflowEffect" :looped-slides="swiper_game.loopedSlides">
        <swiper-slide  class="swiper_slide_size" v-for="(slide,index) in swiperImage" :key="index">
          <a class="img_inner">
            <picture class="v-img" :class="{image_loading:!swiperImage[index].hasLoaded}">
              <source :srcset="slide.src" type="image/avif">
              <img :src="slide.src" :alt="slide.alt" @load="handleLoaded(index)"/>
            </picture>
            <div class="v_img_mask">
              <p class="v_img_alt_test">{{slide.alt}}</p>
            </div>
          </a>
        </swiper-slide>
        <div class="swiper_button_popover">
          <div class="swiper_button_inner">
            <button class="swiper-button-prev swiper-button-style"></button>
            <button class="swiper-button-next swiper-button-style"></button>
          </div>
        </div>
      </swiper>
      <div class="swiper-pagination"></div>
    </div>
    <grid-popover category="文章精选" :update="updateArticle" :article="goodArticle" right="update" :show-image="true"></grid-popover>
    <grid-popover category="PC游戏" :article="pcArticle" :list="pcList"></grid-popover>
    <grid-popover category="模拟器游戏" :article="simulatorArticle" :list="simulatorList" :show-image="true"></grid-popover>
    <grid-popover category="至高之神" :article="bestArticle" :list="bestList"></grid-popover>
    <grid-popover category="手机游戏" :article="phoneArticle" :list="phoneList" :show-image="true"></grid-popover>
    <grid-popover category="游戏插件" :article="pluginArticle" :list="pluginList"></grid-popover>
  </div>
</template>

<style src="@/special_assets/css/game_main_index.css" scoped>

</style>
<style>
.swiper-slide{
  border-radius: 8px!important;
  cursor: pointer;
}
.swiper-pagination{
  bottom: 0!important;
  line-height: 0;
}
</style>
