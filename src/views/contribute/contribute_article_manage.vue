<script setup lang="ts">

import {links} from "@/api/dataInfo";
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import store from "@/store/index";
import ArticleLogCard from "@/components/articleLogCard";
import {getAllUserArticle} from "@/api/articleApi";
import {createCardInfo} from "@/utils/utils";
import {getAllUpdatedArticles} from "@/api/contribute/contributeResponse";

class Deg {
  region=0
  queue=0
}
class Select {
  region=null
  queue=0
}
class Show {
  region=false;
  queue=false;
}
class Queue {
  time = '投稿时间排序'
  visitor = '浏览量排序'
  like = '喜欢数排序'
  collect = '收藏数排序'
  review = '评论数排序'
}
const deg = reactive(new Deg())
const show = reactive(new Show())
const region = ref(
    links.map(link=>({
      name: link.name,
      count:0
    })
))
const article = ref([])
const queue = [
  {name:'投稿时间排序',get:null},
  {name:'浏览量排序',get:null},
  {name:'喜欢数排序',get:null},
  {name:'收藏数排序',get:null},
  {name:'评论数排序',get:null}
]
const selected = reactive(new Select())

const toggleShow=(a)=>{
  deg[a] += 180
  show[a] = !show[a]
}

const getArticleLength = computed(()=> article.value.length)



onUnmounted(()=>{
  selected.value = null
  Object.assign(deg,new Deg())
  Object.assign(selected,new Select())
  Object.assign(show,new Show())
  Object.assign(queue,new Queue())
  Object.assign(article, {})
})


onMounted(async () => {
  // 更改页面
  store.commit('page/setContributePage', 2)
  // 获取所有类型的已发布文章
  const {success,data,error} = await getAllUpdatedArticles()
  if (success) {
    article.value = data.data
    // 重置计数
    region.value .forEach(item => item.count = 0);
    article.value.forEach(item => {
      const rid = item.category.id.rid
      // 在 links 中查找匹配的 id 索引
      const index = links.findIndex(link => link.id === rid);
      if (index !== -1) {
        region.value[index].count += 1;
      }
    })
  }else log.error(error)
  // putArticleCount(get.getType)
  // Object.assign(article,get.getArticle)
})

</script>

<template>
  <div class="platform_popover">
    <div class="platform_entry max_entry">
      <div class="article_manage__top_wrap">
        <div class="search_wrap">
          <input class="search_input" placeholder="搜索稿件" type="text">
          <div class="search_btn">
            <svg-icon icon-name="search_btn" class-name="search_btn_svg"></svg-icon>
          </div>
        </div>
        <div class="category_wrap">
          <div class="list_wrap">
            <input placeholder="全部分区" readonly type="text" @focus="toggleShow('region')" @blur="toggleShow('region')">
            <svg-icon icon-name="arrow" class-name="arrow_svg" :style="{transform:`rotate(${deg.region}deg)`}"></svg-icon>
            <transition name="region">
              <div v-show="show.region" class="list_entry" style="z-index: 999">
                <ul class="region_list_option">
                  <li class="region_list_item" :class="{selected:selected.region===null}">
                    <div class="region_list_item_test">全部分区</div>
                    <svg-icon icon-name="check" class-name="check_svg" v-if="selected.region===null"></svg-icon>
                  </li>
                  <li class="region_list_item" :class="{is_disabled:option.count===0,selected:selected.region===index}" v-for="(option,index) in region" :key="index">
                    <div class="region_list_item_test" >{{option.name+'('+option.count+')'}}</div>
                    <svg-icon icon-name="check" class-name="check_svg"  v-if="selected.region===index"></svg-icon>
                  </li>
                </ul>
              </div>
            </transition>
          </div>
          <div class="list_wrap queue_wrap">
            <input placeholder="投稿时间排序" readonly type="text" @focus="toggleShow('queue')" @blur="toggleShow('queue')">
            <svg-icon icon-name="arrow" class-name="arrow_svg" :style="{transform:`rotate(${deg.queue}deg)`}"></svg-icon>
            <transition name="queue">
                <div class="list_entry" v-show="show.queue" style="z-index: 999">
                  <ul class="region_list_option">
                    <li class="region_list_item" :class="{selected:selected.queue===index}"  v-for="(option,index) in queue" :key="index">
                      <div class="region_list_item_test" >{{option.name}}</div>
                      <svg-icon icon-name="check" class-name="check_svg" v-if="selected.queue===index"></svg-icon>
                    </li>
                  </ul>
                </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="article_log_wrap">
        <article-log-card v-for="(per,index) in article" :key="index" :article="per" />
      </div>
      <div class="article_page_and_num_wrap">
        <span class="article_page_and_num_test">共 {{getArticleLength}} 个</span>
      </div>
    </div>
  </div>
</template>

<style src="@/special_assets/css/contribute_article_manage.css" scoped>

</style>
