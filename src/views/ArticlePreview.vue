<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RelatedLinks from "@/components/article/relatedLinks.vue";
import {getCurrentTime, levelSvgName, numberRegular} from "@/utils/regular.js";
import {onAvatarError} from "@/utils/utils.js";

const info = JSON.parse(sessionStorage.getItem("preview_info"));
let saveInfo = info.saveInfo
let userInfo = info.userInfo
let title = saveInfo.content.title || '默认标题'
let desc = saveInfo.content.desc || '默认描述'

const showTip = ref(true)
const mainContent = ref(null)
const commentQueue = ref(1)

const currentTime =()=>{
  return getCurrentTime()
}

const closeTip = () =>{
  showTip.value = false
}
const changeCommentQueue=(value)=>{
  commentQueue.value = value
}

onMounted(()=>{
  const element = mainContent.value
  console.log(element)
  element.innerHTML = saveInfo.content.quillContent
})
</script>

<template>
  <div id="article_preview">
    <div v-if="showTip" class="preview_tip_popover">
      <span>此链接为预览，仅您自己可见</span>
      <span class="click_btn" @click="closeTip">知道了</span>
    </div>
    <main class="preview_main_popover">
      <div class="preview_main_content">
        <div class="preview_main_content_inner">
          <div class="title_container">
            <div class="title_text">
              <h1 class="mb_20">{{title}}</h1>
              <div class="article_info mb_20">
                <span style="margin-right: 15px">{{ currentTime() }}</span>
                <span style="margin: 0 3px">--浏览</span>
                 ·
                <span style="margin: 0 3px">--喜欢</span>
                ·
                <span style="margin: 0 3px">--收藏</span>
                 ·
                <span style="margin: 0 3px">--评论</span>
              </div>
              <div class="article_user">
                <div class="article_user_avatar">
                  <picture class="v-avatar-image">
                    <source srcset="" type="image/avif">
                    <source srcset="" type="image/webp">
                    <img src="" alt="" @error="onAvatarError($event)">
                  </picture>
                </div>
                <div class="article_user_info">
                  <div class="article_user_info_top">
                    <span style="cursor: pointer">{{userInfo.nickname || "默认昵称"}}</span>
                    <svg-icon :icon-name="levelSvgName(userInfo.level)" class-name="level_svg"></svg-icon>
                  </div>
                  <div class="article_user_info_button">
                    <span style="margin-right: 13px">粉丝：{{numberRegular(userInfo.fans)}}</span>
                    <span>文章：{{numberRegular(userInfo.articles)}}</span>
                  </div>
                </div>
              </div>
              <div class="desc_inner mt_20">
                <div class="desc mb_10">内容简介:</div>
                <div class="desc_content">{{desc}}</div>
              </div>
            </div>
          </div>
          <div class="main_content_wrap">
            <div ref="mainContent" class="ql-editor"></div>
            <related-links v-if="saveInfo.cloudLinks.length" :cloud-links="saveInfo.cloudLinks"></related-links>
            <div class="reproduce_tip">
              <span>转载请标明作者及来源</span>
            </div>
            <div class="article_label">
              <svg-icon class-name="label_svg" icon-name="label"></svg-icon>
              <span v-for="item in saveInfo.labels">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="preview_main_column">
        <svg-icon icon-name="game_icon" class-name="game_icon_svg"></svg-icon>
      </div>
      <div class="preview_main_column_test">
        <span>{{saveInfo.region.column}}</span> / <span>{{saveInfo.region.category}}</span>
      </div>
    </main>
    <div class="comment_popover">
      <div class="preview_main_content">
        <div class="preview_main_content_inner">
          <div class="comment_header">
            <div class="comment_title">
              <svg-icon class-name="comment_svg" icon-name="comment"></svg-icon>
              <span class="comment_title_test" style="margin-right: 7px">评论</span>
              <span class="comment_num_test">0</span>
              <split height="20px" margin-l-r="18px"></split>
              <div class="comment_queue">
                <div class="mr_15 comment_queue_test" :class="{comment_queue_selected:commentQueue===1}" @click="changeCommentQueue(1)">
                  <span class="p_lr_5">最热</span>
                </div>
                <div class="comment_queue_test" :class="{comment_queue_selected:commentQueue===2}" @click="changeCommentQueue(2)">
                  <span class="p_lr_5">最新</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#article_preview{
  position: relative;
  margin: 0 auto;
  --tip_popover_h: 40px;
  --tip_popover_ptb:11px;
  --tip_text_fs: 13px;
}
.preview_tip_popover{
  height: var(--tip_popover_h);
  padding: var(--tip_popover_ptb);
  background-color: var(--Lb5_u);
  text-align: center;
  color: var(--color_white);
  font-size: var(--tip_text_fs);
  line-height: calc(var(--tip_popover_h) - var(--tip_popover_ptb) * 2);
}
.click_btn{
  margin-left: 14px;
  padding: 4px 11px;
  border: 1px solid var(--color_white);
  border-radius: 4px;
  cursor: pointer;
}

.preview_main_popover,.comment_popover{
  background-color: var(--bg_white);
  max-width: 900px;
  border-radius: 6px;
  position: relative;
}
.preview_main_popover{
  margin: 60px auto 15px;
}
.comment_popover{
  margin: 0 auto;
}
.preview_main_content{
  padding: 30px 40px 50px;
}
.title_container{
  margin-bottom: 30px;
}
.title_text{
  display: flex;
  flex-direction: column;
}
.article_info{
  font-size: 13px;
  color: var(--text3);
  line-height: 20px;
}
.article_user{
  display: flex;
}
.article_user_avatar{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: var(--bg_regular);
  cursor: pointer;
}
.article_user_info_top,.article_user_info_button{
  height: 50%;
  display: flex;
  align-items: center;
  line-height: 22px;
}
.article_user_info_button{
  font-size: 13px;
  color: var(--text3);
}
.desc{
  font-size: 17px;
  font-weight: 600;
}
.desc_content{
  font-size: 15px;
  color: var(--text2);
  line-height: 20px;
}
.main_content_wrap{
  padding-top: 20px;
  border-top: 1px solid var(--line_regular);
  border-bottom: 1px solid var(--line_regular);
}
.reproduce_tip{
  margin: 40px 0 15px;
  color: var(--text3);
  font-size: 13px;
}
.ql-editor{
  min-height: unset!important;
  padding: 16px 0 30px!important;
}
.preview_main_column{
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  background-color: var(--Lb5_u);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}
.preview_main_column_test{
  position: absolute;
  top: -30.004px;
  left: 0;
  height: 30px;
  padding: 0 40px 0 40px;
  background-color: var(--Lb5_u);
  border-radius: 0 20px 0 0;
  line-height: 30px;
  color: var(--text-white);
  font-weight: 600;
}
.preview_main_column_test span{
  cursor: pointer;
}
.game_icon_svg{
  width: 35px;
  height: 35px;
  color: var(--text-white);
}
.label_svg{
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
.level_svg{
  margin-left: 4px;
  width: 30px;
  height: 22px;
}
.comment_svg{
  width: 25px;
  height: 25px;
  margin-right: 4px;
}
.article_label{
  display: flex;
  align-items: center;
  line-height: 32px;
  font-size: 13px;
  margin-bottom: 30px;
  color: var(--text2);
  flex-wrap: wrap;
}
.article_label span{
  margin: 0 5px;
  transition: color .2s;
  cursor: pointer;
}
.comment_header{
  line-height: 30px;
  height: 30px;
  align-items: center;
  display: flex;
}
.comment_title{
  display: flex;
  align-items: center;
}
.comment_title_test{
  font-size: 20px;
  font-weight: 600;
}
.comment_num_test{
  font-size: 15px;
  color: var(--text3);
}
.comment_queue{
  display: flex;
}
.comment_queue_test{
  cursor: pointer;
  transition: all .2s;
}
.comment_queue_selected{
  box-shadow: inset 0 -3px 0 0 var(--Lb5_u);
}
.article_label span:hover{
  color: var(--Lb5_u);
}
</style>
