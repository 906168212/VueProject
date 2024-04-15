<script setup>

import {onImageError} from "@/utils/utils.js";
import {cardInfo} from "@/api/dataInfo.js";
import {reactive} from "vue";

const props = defineProps({
  article:{
    type:Object,
    required:true,
    default:reactive(new cardInfo())
  }
})

</script>

<template>
  <div class="article_log_card_popover">
    <div class="article_log_card_skeleton hide">
      <div class="article_log_card_skeleton_cover"></div>
      <div class="article_log_card_skeleton_info">
        <div class="skeleton_info_title"></div>
        <div class="skeleton_info_middle">
          <div class="middle_date"></div>
        </div>
        <div class="skeleton_info_stat"></div>
      </div>
    </div>
    <div class="article_log_card_entry">
      <div class="article_log_card_cover">
        <picture class="v-image">
          <source :srcset="article.pic_avif" type="image/avif">
          <source :srcset="article.pic_webp" type="image/webp">
          <img :src="article.pic" :alt="article.alt" @error="onImageError(article)">
        </picture>
      </div>
      <div class="article_log_card_info">
        <div class="info_title">{{article.alt}}</div>
        <div class="info_middle">
          <div class="middle_date">{{article.pubDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/articleLogCard.css" scoped>

</style>
