<script setup>
import {Swiper,SwiperSlide} from "swiper/vue";
import 'swiper/swiper-bundle.css';
import {handleLoaded, swiper_game, swiperImage} from "@/special_assets/js/game_main_index.js";
const props = defineProps({
  data:{
    type:Object,
    required:true
  }
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
    <div class="game_gird_popover">
      <div class="game_featured_entry">
        <div class="game_header">
          <span class="game_header_test">文章精选</span>
        </div>
        <div class="game_card_left_body">
          <div style="border: 1px solid #000000;border-radius: 6px"></div>
          <div style="border: 1px solid #000000;border-radius: 6px"></div>
          <div style="border: 1px solid #000000;border-radius: 6px"></div>
          <div style="border: 1px solid #000000;border-radius: 6px  "></div>
        </div>
      </div>
      <div class="game_relate_update_entry">
        <div class="game_header">
          <span class="game_header_test">最近更新</span>
        </div>
        <div class="game_card_right_body">
          <div class="feed_card_popover">
            <div class="card_skeleton hide">
              <div class="card_skeleton__cover"></div>
              <div class="card_skeleton__info">
                <div class="card_skeleton__info_inner">
                  <p class="card_skeleton__info_test"></p>
                  <p class="card_skeleton__info_test short"></p>
                  <p class="card_skeleton__info_light"></p>
                </div>
              </div>
            </div>
            <div class="card_wrap">
                <a class="card_image_link">
                  <div class="card_image_popover">
                    <picture class="v-image card_picture_entry">
                      <img src="@/assets/image/common-cover_1.avif" alt="【预告】「面对校园网的多设备检测，我的解决方案是」">
                    </picture>
                  </div>
                </a>
                <div class="card_info_entry">
                  <div class="card_info_inner">
                    <h3 class="card_info_title" title="会不会影响考公">
                      <a>不影响考公，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊</a>
                    </h3>
                    <div class="card_info__button">
                      <a class="card_info__author">
                        <svg class="card_info__author_icon" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3490" width="20" height="20">
                          <g fill="currentColor">
                            <path d="M825.6 951.04h-614.4c-73.4208 0-133.12-59.6992-133.12-133.12v-614.4c0-73.4208 59.6992-133.12 133.12-133.12h614.4c73.4208 0 133.12 59.6992 133.12 133.12v614.4c0 73.4208-59.7504 133.12-133.12 133.12z m-614.4-819.2c-39.5264 0-71.68 32.1536-71.68 71.68v614.4c0 39.5264 32.1536 71.68 71.68 71.68h614.4c39.5264 0 71.68-32.1536 71.68-71.68v-614.4c0-39.5264-32.1536-71.68-71.68-71.68h-614.4z"></path><path d="M518.4 520.96c-93.184 0-168.96-75.776-168.96-168.96s75.776-168.96 168.96-168.96 168.96 75.776 168.96 168.96-75.8272 168.96-168.96 168.96z m0-276.48c-59.2896 0-107.52 48.2304-107.52 107.52s48.2304 107.52 107.52 107.52 107.52-48.2304 107.52-107.52-48.2304-107.52-107.52-107.52z"></path><path d="M603.3408 843.52H433.4592c-104.0896 0-188.7232-84.6848-188.7232-188.7232v-55.4496c0-39.2704 15.9232-77.312 43.7248-104.448 24.1664-23.6544 64.3584-56.1152 118.8352-76.5952a30.72 30.72 0 0 1 21.6576 57.4976c-44.4416 16.7424-77.568 43.52-97.536 63.0272-16.0256 15.6672-25.2416 37.7344-25.2416 60.5184v55.4496c0 70.1952 57.088 127.2832 127.2832 127.2832h169.8816c70.1952 0 127.2832-57.088 127.2832-127.2832v-55.4496c0-22.784-9.1648-44.8512-25.1904-60.5184-19.968-19.5584-53.0944-46.336-97.536-63.0784a30.72 30.72 0 0 1 21.6576-57.4976c54.4256 20.48 94.6688 52.992 118.8352 76.6464 27.7504 27.136 43.6736 65.1776 43.6736 104.448v55.4496c0 104.0896-84.6848 188.7232-188.7232 188.7232z"></path><path d="M518.4 720.64c-46.2848 0-83.9168-32.8192-83.9168-73.1136V645.12l0.3584-2.3552c0.256-1.5872 6.2976-39.8848 16.128-78.848 15.0528-59.5968 32.3072-99.2768 67.3792-99.2768s52.3264 39.68 67.3792 99.2768c9.8816 38.9632 15.9232 77.2608 16.128 78.848l0.3584 2.3552v2.4064c0.1024 40.3456-37.5808 73.1136-83.8144 73.1136zM496.128 648.704c1.3824 4.2496 9.5744 10.496 22.272 10.496s20.8896-6.2976 22.272-10.496c-5.8368-35.9936-14.336-72.4992-22.272-97.3824-7.936 24.8832-16.4864 61.3888-22.272 97.3824z"></path>
                          </g>
                        </svg>
                        <span class="card_info__author_name" title="测试测试测试测试">测试测试测试测试</span>
                        <span class="card_info__date">2-23</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="feed_card_popover">
            <div class="card_skeleton hide">
              <div class="card_skeleton__cover"></div>
              <div class="card_skeleton__info">
                <div class="card_skeleton__info_inner">
                  <p class="card_skeleton__info_test"></p>
                  <p class="card_skeleton__info_test short"></p>
                  <p class="card_skeleton__info_light"></p>
                </div>
              </div>
            </div>
            <div class="card_wrap">
              <a class="card_image_link">
                <div class="card_image_popover">
                  <picture class="v-image card_picture_entry">
                    <img src="@/assets/image/common-cover_1.avif" alt="【预告】「面对校园网的多设备检测，我的解决方案是」">
                  </picture>
                </div>
              </a>
              <div class="card_info_entry">
                <div class="card_info_inner">
                  <h3 class="card_info_title" title="会不会影响考公">
                    <a>不影响考公，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊，再长一点会不会有事啊</a>
                  </h3>
                  <div class="card_info__button">
                    <a class="card_info__author">
                      <svg class="card_info__author_icon" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3490" width="20" height="20">
                        <g fill="currentColor">
                          <path d="M825.6 951.04h-614.4c-73.4208 0-133.12-59.6992-133.12-133.12v-614.4c0-73.4208 59.6992-133.12 133.12-133.12h614.4c73.4208 0 133.12 59.6992 133.12 133.12v614.4c0 73.4208-59.7504 133.12-133.12 133.12z m-614.4-819.2c-39.5264 0-71.68 32.1536-71.68 71.68v614.4c0 39.5264 32.1536 71.68 71.68 71.68h614.4c39.5264 0 71.68-32.1536 71.68-71.68v-614.4c0-39.5264-32.1536-71.68-71.68-71.68h-614.4z"></path><path d="M518.4 520.96c-93.184 0-168.96-75.776-168.96-168.96s75.776-168.96 168.96-168.96 168.96 75.776 168.96 168.96-75.8272 168.96-168.96 168.96z m0-276.48c-59.2896 0-107.52 48.2304-107.52 107.52s48.2304 107.52 107.52 107.52 107.52-48.2304 107.52-107.52-48.2304-107.52-107.52-107.52z"></path><path d="M603.3408 843.52H433.4592c-104.0896 0-188.7232-84.6848-188.7232-188.7232v-55.4496c0-39.2704 15.9232-77.312 43.7248-104.448 24.1664-23.6544 64.3584-56.1152 118.8352-76.5952a30.72 30.72 0 0 1 21.6576 57.4976c-44.4416 16.7424-77.568 43.52-97.536 63.0272-16.0256 15.6672-25.2416 37.7344-25.2416 60.5184v55.4496c0 70.1952 57.088 127.2832 127.2832 127.2832h169.8816c70.1952 0 127.2832-57.088 127.2832-127.2832v-55.4496c0-22.784-9.1648-44.8512-25.1904-60.5184-19.968-19.5584-53.0944-46.336-97.536-63.0784a30.72 30.72 0 0 1 21.6576-57.4976c54.4256 20.48 94.6688 52.992 118.8352 76.6464 27.7504 27.136 43.6736 65.1776 43.6736 104.448v55.4496c0 104.0896-84.6848 188.7232-188.7232 188.7232z"></path><path d="M518.4 720.64c-46.2848 0-83.9168-32.8192-83.9168-73.1136V645.12l0.3584-2.3552c0.256-1.5872 6.2976-39.8848 16.128-78.848 15.0528-59.5968 32.3072-99.2768 67.3792-99.2768s52.3264 39.68 67.3792 99.2768c9.8816 38.9632 15.9232 77.2608 16.128 78.848l0.3584 2.3552v2.4064c0.1024 40.3456-37.5808 73.1136-83.8144 73.1136zM496.128 648.704c1.3824 4.2496 9.5744 10.496 22.272 10.496s20.8896-6.2976 22.272-10.496c-5.8368-35.9936-14.336-72.4992-22.272-97.3824-7.936 24.8832-16.4864 61.3888-22.272 97.3824z"></path>
                        </g>
                      </svg>
                      <span class="card_info__author_name" title="测试测试测试测试">测试测试测试测试</span>
                      <span class="card_info__date">2-23</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
