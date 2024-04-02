<script setup>

import BigCard from "@/components/bigCard.vue";
import Card from "@/components/card.vue";
import {onImageError} from "@/utils/utils.js";
import SvgIcon from "@/components/svgIcon/index.vue";
import {ref} from "vue";


const props = defineProps({
  list: Object,
  article:{
    type:Object,
    required:true
  },
  update:Object,
  category:{
    type:String,
    required:true
  },
  right:{
    type:String,
    default:'list'
  },
  showImage:{
    type:Boolean,
    default:false
  }
})
const rotateDeg = ref(0)
const rotate = ()=>{
  rotateDeg.value += 360
}
</script>

<template>
  <div class="gird_popover">
    <div class="grid_left_entry">
      <div class="grid_header">
        <div class="left"><span class="grid_header_test">{{category}}</span></div>
        <div class="right">
          <button class="primary_btn roll_btn" @click="rotate" v-if="right==='list'">
            <svg-icon class-name="refresh" icon-name="refresh" :style="{transform:`rotate(${rotateDeg}deg)`}"></svg-icon>
            <span>换一换</span>
          </button>
          <a class="primary_btn see_more" href="/" v-if="right==='list'">
            <span>查看更多</span>
            <svg-icon icon-name="arrow" class-name="arrow"></svg-icon>
          </a>
        </div>
      </div>
      <div class="body">
        <big-card v-for="(per,index) in article" :key="index" :article="per"/>
      </div>
    </div>
    <div class="grid_right_entry" v-if="right==='update'">
      <div class="grid_header">
        <span class="grid_header_test">最近更新</span>
      </div>
      <div class="update_body">
        <card v-for="per in update" :article="per"/>
      </div>
    </div>
    <aside v-if="right==='list'" class="aside_entry">
      <div class="grid_header">
        <span class="grid_header_test">热门</span>
      </div>
      <div class="aside_body">
        <div class="aside_core">
          <div class="aside_grid_entry">
            <ul class="rank_list">
              <li v-for="(per,index) in list" class="rank_list_item">
                <div class="rank_list_item__inner">
                  <span class="rank_list_item__index" :data-index="index+1">{{index+1}}</span>
                  <a href="/" class="rank_list_item__card" :class="{rank_list_item__card_concise:index!==0}">
                    <div class="rank_list_card__image" v-if="index===0">
                      <picture class="v-image rank_list_card__cover">
                        <source :srcset="per.pic_avif" type="image/avif">
                        <source :srcset="per.pic_webp" type="image/webp">
                        <img :src="per.pic" :alt="per.alt" @error="onImageError(per)">
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
    </aside>

  </div>
  <div class="image_banner_popover" v-if="showImage">
    <img :src="`https://picsum.photos/2320/192.webp?${Math.random()}`" alt="" loading="lazy" >
  </div>
</template>

<style scoped>

</style>
