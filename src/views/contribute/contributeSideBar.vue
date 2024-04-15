<script setup>
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import router from "@/router/index.js";
import store from "@/store/index.js";

  // send=0;
  // index=1;
  // sent=2;
  // sketch=3;
  // convention=4;


const deg = ref(0)
const showDetail = ref(false)
const selected = ref(0)
const toggleArrow = ()=>{
  deg.value += 180;
  if(!showDetail.value){ // 未展开
    selected.value = 2;
    router.push('/contribute/manage')
  }
  showDetail.value = !showDetail.value
}

const currentPage = computed(()=> store.state.page.contributePage)

onMounted(()=>{
})
onUnmounted(()=>{
  showDetail.value = false
  selected.value = 0
})
</script>

<template>
  <div class="sidebar_popover">
    <a class="send_article_item" @click="router.push('/contribute/send')">
      <svg-icon  icon-name="contribute_send" class-name="send_svg"></svg-icon>
      <span class="send_article_text">投稿</span>
    </a>
    <a class="sidebar_item" @click="router.push('/contribute/index')" :class="{selected:currentPage === 1}">
      <svg-icon icon-name="contribute_home" class-name="contribute_svg"></svg-icon>
      <span class="sidebar_text">首页</span>
    </a>
    <div class="arrow_item" >
      <div class="sidebar_item" @click="toggleArrow" :class="{selected:currentPage === 2 || currentPage === 3}">
        <svg-icon icon-name="send_article_manage" class-name="contribute_svg"></svg-icon>
        <span class="sidebar_text">稿件管理</span>
        <svg-icon icon-name="arrow" class-name="arrow_svg" :style="{transform:`rotate(${deg}deg)`}"></svg-icon>
      </div>
      <transition name="sidebarArrow">
        <div v-show="showDetail" class="sidebar_arrow_inner">
          <a class="sidebar_item" @click="router.push('/contribute/manage/sent')">
            <div class="block_svg_entry"></div>
            <span class="sidebar_text arrow_inner_text" :class="{selected:currentPage===2}">已发稿件</span>
          </a>
          <a class="sidebar_item" @click="router.push('/contribute/manage/sketch')">
            <div class="block_svg_entry"></div>
            <span class="sidebar_text arrow_inner_text" :class="{selected:currentPage===3}">草稿箱</span>
          </a>
        </div>
      </transition>
    </div>
    <a class="sidebar_item" @click="router.push('/contribute/convention')" :class="{selected:currentPage === 4}">
      <svg-icon icon-name="convention" class-name="contribute_svg"></svg-icon>
      <span class="sidebar_text">社区公约</span>
    </a>
  </div>
</template>

<style scoped>
.sidebar_popover{
  --pl:32px;
  --pr:24px;
  --item_height:46px;
  --arrow_item_height:38px;
  --svg_mr:20px;
  --svg_size:20px;
  --arrow_size:12px;
  --send_fs:16px;
  font-family: PingFangSC-Regular,Microsoft YaHei,Arial,Helvetica,sans-serif;
}
.sidebar_popover{
  min-width: 200px;
  height: 100%;
  border-right: 1px solid var(--line_regular);
  display: flex;
  flex-direction: column;
  color: var(--text1);
}
.send_article_item{
  margin: 26px auto 17px;
  width: 136px;
  height: 40px;
  background-color: var(--normal_blue);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 40px;
  color: var(--text-white);
  cursor: pointer;
  transition: opacity .2s linear;
}
.send_article_item:hover{
  opacity: .9;
}
.sidebar_item{
  padding-left: var(--pl);
  padding-right: var(--pr);
  height: var(--item_height);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color .2s;
}
.send_svg{
  width: 18px;
  height: 18px;
  margin-right: 5px;
}
.send_article_text{
  font-size: var(--send_fs);
}
.arrow_item .sidebar_item{
  height: var(--arrow_item_height);
}

.sidebar_item:hover{
  background-color: var(--bg_regular);
}
.contribute_svg{
  width: var(--svg_size);
  height: var(--svg_size);
  margin-right: var(--svg_mr);
}
.sidebar_text{
  line-height: 20px;
  width: 90px;
}
.arrow_svg{
  width: var(--arrow_size);
  height: var(--arrow_size);
  color: var(--text2);
}
.arrow_item{
  flex-direction: column;
}
.block_svg_entry{
  width: var(--svg_size);
  height: var(--svg_size);
  margin-right: var(--svg_mr);
}
.arrow_inner_text{
  color: var(--text2);
}

.sidebar_arrow_inner{
  overflow: hidden;
}

.sidebarArrow-enter-from,.sidebarArrow-leave-to{
  height: 0;
}
.sidebarArrow-enter-active,.sidebarArrow-leave-active{
  transition: height .3s ease-in-out;
}
.sidebarArrow-enter-to,.sidebarArrow-leave-from{
  height: calc(var(--arrow_item_height) * 2);
}
.selected{
  color: var(--normal_blue);
}
</style>
