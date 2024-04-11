<script setup>

import BigCard from "@/components/bigCard.vue";
import Card from "@/components/card.vue";
import {createCardInfo, onImageError, rid} from "@/utils/utils.js";
import SvgIcon from "@/components/svgIcon/index.vue";
import {computed, onUnmounted, reactive, ref} from "vue";
import Image_banner from "@/components/image_banner.vue";
import RankingRegion from "@/components/rankingRegion.vue";
import {getArticle} from "@/api/articleApi.js";


const props = defineProps({
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
  },
  rid:Number,
  pt:Number
})
class Status{
  left=false;
  right=false;
}
const rotateDeg = ref(0)
const imageLoadError = ref(false)
const status = reactive(new Status())


const article = reactive(createCardInfo(4))
const update = reactive(createCardInfo(2))
const ranking = reactive(createCardInfo(10))


const resetData=()=>{
  rotateDeg.value = 0;
  imageLoadError.value = false
  Object.assign(article,createCardInfo(4))
  Object.assign(update,createCardInfo(2))
  Object.assign(status,new Status())
}
const rotate = ()=>{
  rotateDeg.value += 360
  // 清空原有数据
  Object.assign(article,createCardInfo(4))
  status.left = false
  getArticle(status,article,props.rid)
}

onUnmounted(()=>{
  resetData()
})

const backData = computed(()=>{
  if(props.right==='update')
    return {status:status,pt:props.pt,article:article,update:update}
  else return {status: status,rid:props.rid,article: article,ranking:ranking}
})



</script>

<template>
  <div class="gird_popover" v-lazy="backData">
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
        <big-card v-for="(per,index) in article" :key="index" :article="per" :load-status="status.left"/>
      </div>
    </div>
    <div class="grid_right_entry" v-if="right==='update'">
      <div class="grid_header">
        <span class="grid_header_test">最近更新</span>
      </div>
      <div class="update_body">
        <card v-for="per in update" :article="per" :load-status="status.right"/>
      </div>
    </div>
    <aside v-if="right==='list'" class="aside_entry">
      <ranking-region :load-status="status.right" :ranking="ranking"></ranking-region>
    </aside>

  </div>
  <image_banner :show-image="showImage"/>
</template>

<style scoped>

</style>
