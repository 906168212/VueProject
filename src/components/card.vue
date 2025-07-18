<script setup lang="ts">
  import errorImage from "@/assets/image/errorImage.png"
  import SvgIcon from "@/components/svgIcon/index.vue";
  import {computed, onUnmounted,shallowRef} from "vue";
  import {cardInfo} from "@/interface/interface";

  const props = withDefaults(defineProps<{
    article:cardInfo,
    loadStatus:boolean,
    errorImage:string
  }>(),{
    errorImage : errorImage
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
  <div class="feed_card_popover">
    <div class="card_skeleton" :class="{hide:ready}">
      <div class="card_skeleton__cover" :class="{image_loading:!ready}"></div>
      <div class="card_skeleton__info">
        <div class="card_skeleton__info_inner">
          <p class="card_skeleton__info_test" :class="{image_loading:!ready}"></p>
          <p class="card_skeleton__info_test short" :class="{image_loading:!ready}"></p>
          <p class="card_skeleton__info_light" :class="{image_loading:!ready}"></p>
        </div>
      </div>
    </div>
    <div class="card_wrap" :class="{hide:!ready}">
      <a class="card_image_link">
        <div class="card_image_popover">
          <picture class="v-image card_picture_entry">
            <img v-if="imageReady" :src="article.coverSrc" :alt="article.title" loading="lazy" @load="pictureLoadStatus=true"  @error="handleImageError">
          </picture>
        </div>
      </a>
      <div class="card_info_entry">
        <div class="card_info_inner">
          <h3 class="card_info_title" :title="article.title">
            <a>{{article.title}}</a>
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
