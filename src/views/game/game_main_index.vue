<script setup>
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/swiper-bundle.css';
import {getSwiper, handleImageLoad, swiper_game, swiperImage} from "@/special_assets/js/game_main_index.js";
const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
</script>

<template>
  <div class="channel_layout main_part">
    <div class="game_carousel_popover">
      <swiper class="game_carousel_swiper" :loop="swiper_game.loop" @swiper="getSwiper" :autoplay="swiper_game.autoplay"
              :slidesPerView="swiper_game.slidesPerView" :centered-slides="swiper_game.centeredSlides"
      :effect="swiper_game.effect" :coverflow-effect="swiper_game.coverflowEffect" :looped-slides="swiper_game.loopedSlides">
        <swiper-slide class="swiper_slide_size" v-for="(slide,index) in swiperImage" :key="index">
          <picture class="v-img">
            <source :srcset="slide.src" type="image/avif">
            <img :src="slide.src" alt="" @load="handleImageLoad"/>
          </picture>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style src="@/special_assets/css/game_main_index.css" scoped>

</style>
<style>
.swiper-slide{
  width: auto !important;
  height: auto !important;
}
</style>
