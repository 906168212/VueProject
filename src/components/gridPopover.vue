<script setup lang="ts">

import BigCard from "@/components/bigCard.vue";
import Card from "@/components/card.vue";

import {createCardInfo, onImageError} from "@/utils/utils";
import SvgIcon from "@/components/svgIcon/index.vue";
import {computed, onUnmounted, reactive, ref} from "vue";
import Image_banner from "@/components/image_banner.vue";
import RankingRegion from "@/components/rankingRegion.vue";
import {links} from "@/api/dataInfo";
import {useLazyLoad} from "@/utils/hook";
import {getLatestArticles} from "@/api/article/articleResponse.js";
import {cardInfo} from "@/interface/interface";
import {DefaultCardInfo} from "@/defaultObject/defaultObject";


const props = defineProps({
  rid : {
    type:Number,
    default:undefined
  },
  cid :{
    type:Number,
    default:undefined
  },
  showImage:{
    type:Boolean,
    default:false
  }
})

const target = ref(null)
const latestArticles = ref<cardInfo[]>([DefaultCardInfo(),DefaultCardInfo()])
useLazyLoad(target,async ()=>{
  console.log("lazy load")
  if (props.cid===undefined){
    // 推荐栏目和最新栏目
    console.log("推荐栏目和最新栏目")
    const {data,success,error} = await getLatestArticles(2)
    latestArticles.value = data.data
    if (success){
      console.log(data)
      loadStatus.right = true
    }else {
      console.error( error)
      log.error(error)
    }
  }else {
    // 分区栏目
  }
})

const rotateDeg = ref(0)
const imageLoadError = ref(false)
const loadStatus = reactive({
  left:false,
  right:false
})

const ranking = reactive(createCardInfo(10))


const resetData=()=>{
  rotateDeg.value = 0;
  imageLoadError.value = false

}
const rotate = ()=>{
  rotateDeg.value += 360
  //getArticle(status,article,props.rid)
}

onUnmounted(()=>{
  resetData()
})

const ArticleName = computed(()=>{
  if (props.cid===undefined)
    return "文章精选"
  else return links[props.rid].category[props.cid]
})



</script>

<template>
  <div class="gird_popover" ref="target">
    <div class="grid_left_entry">
      <div class="grid_header">
        <div class="left"><span class="grid_header_test">{{ArticleName}}</span></div>
        <div class="right">
          <button class="primary_btn roll_btn" @click="rotate" v-if="cid">
            <svg-icon class-name="refresh" icon-name="refresh" :style="{transform:`rotate(${rotateDeg}deg)`}"></svg-icon>
            <span>换一换</span>
          </button>
          <a class="primary_btn see_more" href="/" v-if="cid">
            <span>查看更多</span>
            <svg-icon icon-name="arrow" class-name="arrow"></svg-icon>
          </a>
        </div>
      </div>
      <div class="body">
        <big-card v-for="(per,index) in article" :key="index" :article="per" :load-status="loadStatus.left"/>
      </div>
    </div>
    <div class="grid_right_entry" v-if="rid && cid===undefined">
      <div class="grid_header">
        <span class="grid_header_test">最近更新</span>
      </div>
      <div class="update_body">
        <card v-for="per in latestArticles" :article="per" :load-status="loadStatus.right"/>
      </div>
    </div>
    <aside v-if="cid" class="aside_entry">
      <ranking-region :load-status="loadStatus.right" :ranking="ranking"></ranking-region>
    </aside>

  </div>
  <image_banner :show-image="showImage"/>
</template>

<style scoped>

</style>
