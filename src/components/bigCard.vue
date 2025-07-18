<script setup lang="ts">

import {onImageError} from "@/utils/utils";
import SvgIcon from "@/components/svgIcon/index.vue";
import {computed, onUnmounted, shallowRef} from "vue";
import {cardInfo} from "@/interface/interface";
import errorImage from "@/assets/image/errorImage.png"

const props = withDefaults(defineProps<{
  article:cardInfo,
  loadStatus:boolean,
  errorImage:string
}>(),{
  errorImage:errorImage
})
const pictureLoadStatus = shallowRef(false)

const imageReady = computed(()=>{
  return props.article.coverSrc;
})

const ready = computed(()=>
    props.loadStatus && (pictureLoadStatus.value || !imageReady.value)
)

const handleImageError = (e:Event)=>{
  if ((e.target as HTMLImageElement).src!==props.errorImage){
    (e.target as HTMLImageElement).src = props.errorImage
  }
  pictureLoadStatus.value = true
}


onUnmounted(()=>{
})
</script>

<template>
  <div class="big_card_popover">
    <div class="big_card_skeleton" :class="{hide:ready}">
      <div class="big_card_skeleton__cover" :class="{image_loading:!ready}">
        <div class="big_card_skeleton__cover_inner"></div>
      </div>
      <div class="big_card_skeleton__right">
        <div class="big_card_skeleton__right_inner">
          <p class="big_card_skeleton__title" :class="{image_loading:!ready}"></p>
          <p class="big_card_skeleton__title short" :class="{image_loading:!ready}"></p>
        </div>
        <div class="big_card_skeleton__article_where" :class="{image_loading:!ready}"></div>
        <div class="big_card_skeleton__data_box">
          <div class="big_card_skeleton__data" :class="{image_loading:!ready}"></div>
        </div>
      </div>
      <div class="big_card_skeleton__bottom">
        <div class="big_card_skeleton__bottom_inner">
          <p class="big_card_skeleton___desc" :class="{image_loading:!ready}"></p>
          <p class="big_card_skeleton___desc short" :class="{image_loading:!ready}"></p>
          <p class="big_card_skeleton__light" :class="{image_loading:!ready}"></p>
        </div>
      </div>
    </div>
    <div class="big_card" :class="{hide:!ready}">
      <div class="big_card_wrap">
        <a class="big_card_image_link">
          <div class="big_card_image_popover">
            <picture class="v-image big_card_image_entry" >
              <img v-if="imageReady" :src="article.coverSrc" :alt="article.title" loading="lazy" @load="pictureLoadStatus=true"  @error="handleImageError">
            </picture>
          </div>
        </a>
      </div>
      <div class="big_card__right">
        <div class="big_card__right_entry">
          <div class="big_card__title">
            <h2 class="big_card__title_test">
              <a style="font-weight: inherit">{{article.title}}</a>
            </h2>
          </div>
        </div>
        <div class="big_card__right_where">
          <svg-icon icon-name="from" class-name="big_card__from_svg"></svg-icon>
          <h3 class="big_card__from_test">
            <a>{{article.category.name}}</a>
          </h3>
        </div>
        <div class="big_card__right_data_box">
          <div class="big_card__right_data">
            <div class="big_card__data_margin">
              <svg-icon icon-name="like" class-name="big_card__data_icon"></svg-icon>

              <span class="big_card__data_test">{{article.stat.like}}</span>
            </div>
            <div class="big_card__data_margin">
              <svg-icon icon-name="review" class-name="big_card__data_icon review"></svg-icon>
              <span class="big_card__data_test review">{{article.stat.review}}</span>
            </div>
            <div class="big_card__data_margin final_data">
              <svg-icon icon-name="visitor" class-name="big_card__data_icon visitor"></svg-icon>
              <span class="big_card__data_test">{{article.stat.visitor}}</span>
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
