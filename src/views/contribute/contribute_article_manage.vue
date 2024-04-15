<script setup>

import {links} from "@/api/dataInfo.js";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import store from "@/store/index.js";
import ArticleLogCard from "@/components/articleLogCard.vue";

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
const region = reactive(links)
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

onUnmounted(()=>{
  selected.value = null
  Object.assign(deg,new Deg())
  Object.assign(selected,new Select())
  Object.assign(show,new Show())
  Object.assign(region,links)
  Object.assign(queue,new Queue())
})

onMounted(()=>{
  // 更改页面
  store.commit('page/setContributePage',2)
  // 获取所有类型的已发布文章,将数据填入hasSent
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
              <div v-show="show.region" class="list_entry">
                <ul class="region_list_option">
                  <li class="region_list_item" :class="{selected:selected.region===null}">
                    <div class="region_list_item_test">全部分区</div>
                    <svg-icon icon-name="check" class-name="check_svg" v-if="selected.region===null"></svg-icon>
                  </li>
                  <li class="region_list_item" :class="{is_disabled:option.sent===0,selected:selected.region===index}" v-for="(option,index) in region" :key="index">
                    <div class="region_list_item_test" >{{option.name+'('+option.sent+')'}}</div>
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
                <div class="list_entry" v-show="show.queue">
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
        <article-log-card/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.platform_popover{
  --entry_m:72px;
  --entry_mt:16px;
  background-color: var(--bg_regular);
  height: 100%;
  width: 100%;
}

.platform_entry{
  margin-left: var(--entry_m);
  margin-right: var(--entry_m);
  background: #fff;
  margin-top: var(--entry_mt)!important;
  display: flow-root;
  padding-bottom: 20px;
}
@media (min-width: 1600px) {
  .max_entry{
    width: 1283px;
    margin: 0 auto;
  }
}
.article_manage__top_wrap{
  height: 64px;
  border-bottom: 1px solid var(--line_regular);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.article_manage__top_wrap .search_wrap{
  position: relative;
  height: 32px;
  width: 230px;
  margin-left: 40px;
  display: flex;
}
.search_wrap .search_input{
  width: 100%;
  height: 100%;
  border: 1px solid var(--line_regular);
  padding-left: 10px;
  padding-right: 30px;
  border-radius: 6px;
  font-size: 13px;
  transition: .2s;
}
.search_wrap .search_input:focus{
  border-color: var(--normal_blue);
}
.search_wrap .search_btn{
  position: absolute;
  right: 5px;
  top:6px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color .2s linear;
}
.search_wrap .search_btn:hover{
  background-color: var(--bg_regular);
}
.search_btn_svg{
  width: 14px;
  height: 14px;
}
.article_manage__top_wrap .category_wrap{
  padding-right: 40px;
  height: 32px;
  display: flex;
  align-items: center;
}
.list_wrap{
  position: relative;
  width: 112px;
  height: 100%;
  border: 1px solid var(--line_regular);
  border-radius: 4px;
}
.list_wrap.queue_wrap{
  width: 164px;
}
.list_wrap:first-of-type{
  margin-right: 10px;
}
.list_wrap input{
  padding-left: 10px;
  padding-right: 20px;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: var(--text1);
  outline: none;
  cursor: pointer;
  background: none;
  z-index: 1001;
  position: relative;
}
.list_wrap input::placeholder{
  color: var(--text1);
}
.arrow_svg{
  width: 12px;
  height: 12px;
  position: absolute;
  right: 10px;
  top: 9px;
  color: var(--text3);
  cursor: pointer;
}
.list_entry{
  position: absolute;
  margin-top: 6px;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 10;
  overflow: hidden;
  background-color: var(--background-white);
}
.region_list_option{
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.region_list_item{
  position: relative;
  padding-left: 10px;
  padding-right: 20px;
  height: 36px;
  line-height: 36px;
  cursor: pointer;
  transition: background-color .2s linear;
}
.region_list_item:not(.is_disabled):hover{
  background-color: var(--bg_regular);
}
.check_svg{
  position: absolute;
  right: 10px;
  top: 11px;
  width: 12px;
  height: 12px;
  display: none;
}
.region-enter-from,.region-leave-to,
.queue-enter-from,.queue-leave-to{
  height: 0;
}
.region-enter-active,.region-leave-active,
.queue-enter-active,.queue-leave-active{
  transition: height .2s ease-in-out;
}
.region-enter-to,.region-leave-from{
  height: calc(36px * 17);
}
.queue-enter-to,.queue-leave-from{
  height: calc(36px * 5);
}
.region_list_item.is_disabled{
  color: var(--text3);
  cursor: not-allowed;
}
.region_list_item.selected{
  color: var(--normal_blue);
}
.region_list_item.selected .check_svg{
  display: block;
}
.article_log_wrap{
  margin-top: 12px;
  padding: 0 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
