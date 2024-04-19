<script setup>

import {onImageError} from "@/utils/utils.js";
import {cardInfo} from "@/api/dataInfo.js";
import {onUnmounted, reactive, ref} from "vue";

const props = defineProps({
  article:{
    type:Object,
    required:true,
    default:reactive(new cardInfo())
  }
})

const image_loaded = ref(false)

onUnmounted(()=>{
  image_loaded.value = false
})

</script>

<template>
  <div class="article_log_card_popover">
    <div class="article_log_card_skeleton" :class="{hide:image_loaded}">
      <div class="article_log_card_skeleton_cover" :class="{image_loading:!image_loaded}"></div>
      <div class="article_log_card_skeleton_info">
        <div class="skeleton_info_title" :class="{image_loading:!image_loaded}"></div>
        <div class="skeleton_info_middle">
          <div class="middle_date" :class="{image_loading:!image_loaded}"></div>
        </div>
        <div class="skeleton_info_stat" :class="{image_loading:!image_loaded}"></div>
      </div>
    </div>
    <div class="article_log_card_entry" :class="{hide:!image_loaded}">
      <div class="article_log_card_cover">
        <picture class="v-image">
          <source :srcset="article.pic_avif" type="image/avif">
          <source :srcset="article.pic_webp" type="image/webp">
          <img :src="article.pic" :alt="article.alt" @load="image_loaded=true" @error="image_loaded=true;onImageError(article)">
        </picture>
      </div>
      <div class="article_log_card_info">
        <div class="info_title">{{article.alt}}</div>
        <div class="info_middle">
          <div class="middle_date">{{article.pubDate}}</div>
          <div class="middle_right">
            <a class="middle_compile">
              <svg-icon icon-name="compiler" class-name="compiler_svg"></svg-icon>
              <span>编辑</span>
            </a>
            <a class="middle_more">
              <svg-icon icon-name="more" class-name="more_svg"></svg-icon>
            </a>
          </div>
        </div>
        <div class="info_stat">
          <div class="info_stat_item" title="浏览量">
            <svg-icon icon-name="visitor" class-name="stat_svg"></svg-icon>
            <span>{{article.visitor}}</span>
          </div>
          <div class="info_stat_item" title="点赞">
            <svg-icon icon-name="like" class-name="stat_svg"></svg-icon>
            <span>{{article.like}}</span>
          </div>
          <div class="info_stat_item" title="收藏">
            <svg-icon icon-name="collect" class-name="stat_svg"></svg-icon>
            <span>{{article.collect}}</span>
          </div>
          <div class="info_stat_item" title="浏览量">
            <svg-icon icon-name="review" class-name="stat_svg"></svg-icon>
            <span>{{article.review}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/articleLogCard.css" scoped>

</style>
