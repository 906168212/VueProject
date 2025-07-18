<script setup>
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/swiper-bundle.css';
import {
  handleLoaded, swiper_game, swiperImage
} from "@/special_assets/js/game/game_main_index";
import {onMounted, onUnmounted} from "vue";
import GridPopover from "@/components/gridPopover.vue";

import {links} from "@/api/dataInfo.js";

onUnmounted(()=>{

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
    <grid-popover :rid="2" :show-imag="true"></grid-popover>
    <grid-popover v-for="index in links[2].category.length" :key="index" :rid="2" :cid="index-1" :show-image="(index-1)%2!==0"></grid-popover>
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
