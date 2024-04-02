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
  <div class="feed_card_popover">
    <div class="card_skeleton" :class="{hide:loadStatus}">
      <div class="card_skeleton__cover" :class="{image_loading:!loadStatus}"></div>
      <div class="card_skeleton__info">
        <div class="card_skeleton__info_inner">
          <p class="card_skeleton__info_test" :class="{image_loading:!loadStatus}"></p>
          <p class="card_skeleton__info_test short" :class="{image_loading:!loadStatus}"></p>
          <p class="card_skeleton__info_light" :class="{image_loading:!loadStatus}"></p>
        </div>
      </div>
    </div>
    <div class="card_wrap" :class="{hide:!loadStatus}">
      <a class="card_image_link">
        <div class="card_image_popover">
          <picture class="v-image card_picture_entry">
            <source :srcset="article.pic_avif" type="image/avif">
            <source :srcset="article.pic_webp" type="image/webp">
            <img :src="article.pic" :alt="article.alt" @load="loadStatus=true" @error="loadStatus=true;onImageError(article)">
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
