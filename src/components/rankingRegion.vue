<script setup>

import {onImageError} from "@/utils/utils.ts";
import {computed, onUnmounted, ref} from "vue";

const props = defineProps({
  ranking:{
    type:Object,
    required:true
  },
  loadStatus:{
    type:Boolean,
    required:true,
    default:false
  }
})

const pictureLoadStatus = ref(false)

const imageReady = computed(()=>{
  return props.ranking[0].pic || props.ranking[0].pic_webp || props.ranking[0].pic_avif
})

const ready = computed(()=>{
  return props.loadStatus && pictureLoadStatus.value
})

onUnmounted(()=>{
  pictureLoadStatus.value = false
})

</script>

<template>
  <div class="grid_header">
    <span class="grid_header_test">热门</span>
  </div>
  <div class="aside_body" :class="{image_loading:!ready}">
    <div class="aside_core">
      <div class="aside_grid_entry">
        <ul class="rank_list">
          <li v-for="(per,index) in ranking" class="rank_list_item">
            <div class="rank_list_item__inner">
              <span class="rank_list_item__index" :data-index="index+1">{{index+1}}</span>
              <a href="/" class="rank_list_item__card" :class="{rank_list_item__card_concise:index!==0}">
                <div class="rank_list_card__image" v-if="index===0">
                  <picture class="v-image rank_list_card__cover">
                    <source :srcset="per.pic_avif" type="image/avif">
                    <source :srcset="per.pic_webp" type="image/webp">
                    <img v-if="imageReady" :src="per.pic" :alt="per.alt" @load="pictureLoadStatus=true" @error="pictureLoadStatus=true;onImageError(per)">
                  </picture>
                </div>
                <div class="rank_list_card__info">
                  <h3 class="rank_list_card__info_tit">{{per.alt}}</h3>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
