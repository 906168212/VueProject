<script setup>

import {onImageError} from "@/utils/utils.js";
import SvgIcon from "@/components/svgIcon/index.vue";
import {onUnmounted, ref} from "vue";

  defineProps({
    article:{
      type:Object,
      required:true
    }
  })
const loadStatus = ref(false)
onUnmounted(()=>{
  loadStatus.value = false
})
</script>

<template>
  <div class="big_card_popover">
    <div class="big_card_skeleton" :class="{hide:loadStatus}">
      <div class="big_card_skeleton__cover" :class="{image_loading:!loadStatus}">
        <div class="big_card_skeleton__cover_inner"></div>
      </div>
      <div class="big_card_skeleton__right">
        <div class="big_card_skeleton__right_inner">
          <p class="big_card_skeleton__title" :class="{image_loading:!loadStatus}"></p>
          <p class="big_card_skeleton__title short" :class="{image_loading:!loadStatus}"></p>
        </div>
        <div class="big_card_skeleton__article_where" :class="{image_loading:!loadStatus}"></div>
        <div class="big_card_skeleton__data_box">
          <div class="big_card_skeleton__data" :class="{image_loading:!loadStatus}"></div>
        </div>
      </div>
      <div class="big_card_skeleton__bottom">
        <div class="big_card_skeleton__bottom_inner">
          <p class="big_card_skeleton___desc" :class="{image_loading:!loadStatus}"></p>
          <p class="big_card_skeleton___desc short" :class="{image_loading:!loadStatus}"></p>
          <p class="big_card_skeleton__light" :class="{image_loading:!loadStatus}"></p>
        </div>
      </div>
    </div>
    <div class="big_card" :class="{hide:!loadStatus}">
      <div class="big_card_wrap">
        <a class="big_card_image_link">
          <div class="big_card_image_popover">
            <picture class="v-image big_card_image_entry">
              <source :srcset="article.pic_avif" type="image/avif">
              <source :srcset="article.pic_webp" type="image/webp">
              <img :src="article.pic" :alt="article.alt" @load="loadStatus=true" @error="loadStatus=true;onImageError(article)">
            </picture>
          </div>
        </a>
      </div>
      <div class="big_card__right">
        <div class="big_card__right_entry">
          <div class="big_card__title">
            <h2 class="big_card__title_test">
              <a style="font-weight: inherit">{{article.alt}}</a>
            </h2>
          </div>
        </div>
        <div class="big_card__right_where">
          <svg-icon icon-name="from" class-name="big_card__from_svg"></svg-icon>
          <h3 class="big_card__from_test">
            <a>{{article.category}}</a>
          </h3>
        </div>
        <div class="big_card__right_data_box">
          <div class="big_card__right_data">
            <div class="big_card__data_margin">
              <svg-icon icon-name="like" class-name="big_card__data_icon"></svg-icon>

              <span class="big_card__data_test">{{article.like}}</span>
            </div>
            <div class="big_card__data_margin">
              <svg-icon icon-name="review" class-name="big_card__data_icon review"></svg-icon>
              <span class="big_card__data_test review">{{article.review}}</span>
            </div>
            <div class="big_card__data_margin final_data">
              <svg-icon icon-name="visitor" class-name="big_card__data_icon visitor"></svg-icon>
              <span class="big_card__data_test">{{article.visitor}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="big_card_entry">
        <div class="big_card__desc">
          <h3 class="big_card__desc_test">
            <a>{{ article.desc }}</a>
          </h3>
          <div class="big_card__final">
            <a class="big-card__author">
              <svg-icon icon-name="author" class-name="big_card__author_icon"></svg-icon>
              <span class="big_card__author_name">{{ article.author }}</span>
              <span class="big_card__author_date">{{ article.pubDate }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
