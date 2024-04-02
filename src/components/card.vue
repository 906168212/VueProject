<script setup>
  import {onImageError} from "@/utils/utils.js";
  import SvgIcon from "@/components/svgIcon/index.vue";

  defineProps({
    article:{
      type:Object,
      required:true
    }
  })
</script>

<template>
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
            <source :srcset="article.pic_avif" type="image/avif">
            <source :srcset="article.pic_webp" type="image/webp">
            <img :src="article.pic" :alt="article.alt" @error="onImageError(article)">
          </picture>
        </div>
      </a>
      <div class="card_info_entry">
        <div class="card_info_inner">
          <h3 class="card_info_title" :title="article.alt">
            <a>{{article.alt}}</a>
          </h3>
          <div class="card_info__button">
            <a class="card_info__author">
              <svg-icon icon-name="author" class-name="big_card__author_icon"></svg-icon>
              <span class="card_info__author_name" :title="article.author">{{ article.author }}</span>
              <span class="card_info__date">{{ article.pubDate }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
