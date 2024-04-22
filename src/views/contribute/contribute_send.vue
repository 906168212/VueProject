<script setup>
import {computed, onMounted, onUnmounted, reactive, ref} from "vue";
import store from "@/store/index.js";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter'
import ImageUploader from 'quill-image-uploader';
import ImageCut from "@/components/imageCut.vue";
class Content {
  title = ''
  desc = ''
  quillContent = ''
}

const TITLE_MAX_INPUT = 40
const DESC_MAX_INPUT = 150
const content = reactive(new Content())
const dialog = ref(false)
const coverData = ref(null)
const modules = [
  {
    name: 'blotFormatter',
    module: BlotFormatter,
    options:{}
  },
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      // upload:
    }
  }
]

const myQuillOptions = reactive({
  theme:'snow',
  placeholder:"请输入具体内容"
})


const openCoverDialog = ()=>{
  dialog.value = true
}
const closeCoverDialog=(payload)=>{
  dialog.value = payload
}
const getCoverData=(payload)=>{
  coverData.value = payload
}
const titleNum = computed(()=> content.title.length)
const descNum = computed(()=>content.desc.length)
const quillNum = computed(()=>content.quillContent.length)
onMounted(()=>{
  store.commit('page/setContributePage',0)
})
onUnmounted(()=>{
  dialog.value = false
  coverData.value = null
  Object.assign(content,new Content())
})
</script>

<template>
  <div class="platform_popover">
    <div class="platform_entry max_entry">
      <div class="platform_entry_top_wrap platform_entry_padding">
        <div class="left_part">
          <svg-icon icon-name="send_article" class-name="send_article_svg"></svg-icon>
          <span class="send_article_test">文章投稿</span>
        </div>
      </div>
      <div class="platform_entry_main_wrap platform_entry_padding">
        <div class="article_put_cover_wrap">
          <div class="article_put_cover">
            <svg-icon icon-name="title" class-name="title_svg"></svg-icon>
            <span class="article_put_test">封面</span>
          </div>
          <div class="article_put_cover_style" @click="openCoverDialog">
            <div class="article_put_cover_svg_wrap" >
              <svg-icon  class-name="contribute_send_large_svg" icon-name="contribute_send"></svg-icon>
            </div>
            <img v-if="coverData" :src="coverData" alt="">
          </div>
        </div>
        <div class="article_put_title_wrap">
          <div class="article_put_title">
            <svg-icon icon-name="title" class-name="title_svg"></svg-icon>
            <span class="article_put_test">标题</span>
          </div>
          <div class="article_put_input">
            <input placeholder="请输入标题（建议30字以内）" :maxlength="TITLE_MAX_INPUT" v-model="content.title">
            <span class="article_input_text_count">{{ titleNum }}/{{ TITLE_MAX_INPUT }}</span>
          </div>
        </div>
        <div class="article_put_desc_wrap">
          <div class="article_put_desc">
            <svg-icon icon-name="describe" class-name="desc_svg"></svg-icon>
            <span class="article_put_test">简介</span>
          </div>
          <div class="article_put_input">
            <textarea placeholder="请输入简介（建议100字以内）" :maxlength="DESC_MAX_INPUT" v-model="content.desc"/>
            <span class="article_input_text_count desc">{{descNum}}/{{DESC_MAX_INPUT}}</span>
          </div>
        </div>
        <div class="article_put_content_wrap">
          <div class="article_put_content">
            <svg-icon icon-name="article_main" class-name="article_main_svg"></svg-icon>
            <span class="article_put_test">主要内容</span>
          </div>
          <QuillEditor ref="quillEditor" :modules="modules" toolbar="full" :options="myQuillOptions" v-model:content="content.quillContent"/>
          <div class="quill_editor_count_wrap">
            <span class="quill_editor_count">已输入{{ quillNum }}字</span>
          </div>
        </div>
      </div>
    </div>
    <div class="image_cut_entry">
      <transition name="dialog">
        <image-cut class="dialog_box" :dialog="dialog" v-if="dialog" @closeDialog="closeCoverDialog" @getBackCoverData="getCoverData"></image-cut>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.platform_popover{
  --send_article_svg_s:30px;
  --send_article_svg_mr:7px;
  --send_article_test_fs:20px;
  --send_article_test_fw:600;
}
.platform_entry_padding{
  padding:0 40px;
}
.platform_entry_top_wrap{
  height: 64px;
  border-bottom: 1px solid var(--line_regular);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.platform_entry_top_wrap .left_part{
  color: var(--normal_blue);
  line-height: 64px;
  display: flex;
  align-items: center;
}
.send_article_svg{
  height: var(--send_article_svg_s);
  width: var(--send_article_svg_s);
  margin-right: var(--send_article_svg_mr);
}
.left_part .send_article_test{
  font-size: var(--send_article_test_fs);
  font-weight: var(--send_article_test_fw);
}
.platform_entry_main_wrap{
  display: flex;
  flex-direction: column;
}
.article_put_title_wrap,.article_put_desc_wrap,.article_put_cover_wrap{
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}
.article_put_title_wrap input{
  width: 100%;
  line-height: 32px;
  font-size: 20px;
  font-weight: 800;
  padding: 10px 50px 10px 10px;
  border: 1px solid var(--line_contribute);
  transition: border-color .2s;
}
.article_put_title_wrap input::placeholder,.article_put_desc_wrap textarea::placeholder{
  font-weight: 400;
  color:var(--text4);
}
.article_put_test{
  font-size: 20px;
  font-weight: 800;
}
.article_put_title,.article_put_cover,.article_put_desc,.article_put_content{
  display: flex;
  height: 30px;
  line-height: 30px;
  align-items: center;
  margin-bottom: 10px;
}
.title_svg,.desc_svg{
  width: 25px;
  height: 25px;
  margin-right: 7px;
}
.article_main_svg,.desc_svg{
 margin-top: 3px;
}
.article_main_svg{
  width: 27px;
  height: 27px;
  margin-right: 7px;
}
.article_put_desc_wrap textarea{
  width: 100%;
  border: 1px solid var(--line_contribute);
  line-height: 26px;
  font-size: 16px;
  padding: 10px 50px 10px 10px;
  outline: none;
  resize: none;
  text-align: justify;
  transition: border-color .2s;
  font-family: inherit;
  min-height: 120px;
  //scrollbar-width: 5px;
}
.article_put_title_wrap input:hover,.article_put_desc_wrap textarea:hover,
.article_put_title_wrap input:focus,.article_put_desc_wrap textarea:focus{
  border-color: var(--normal_blue);
}
.article_put_cover_style{
  width: 200px;
  height: 112.5px;
  border: 2px dashed var(--normal_blue);
  border-radius: 8px;
  position: relative;
  cursor: pointer;
}
.article_put_cover_svg_wrap{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.contribute_send_large_svg{
  width: 60px;
  height: 60px;
  color: var(--normal_blue);
  margin-bottom: 10px;
}
.article_put_cover_style img{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 8px;
}
.dialog-enter-from,.dialog-leave-to{
  transform: scale(0);
  opacity: 0;
}
.dialog-enter-active,.dialog-leave-active{
  transition: all .2s ease-in-out;
}
.dialog-enter-to,.dialog-leave-from{
  transform: scale(1);
}
.image_cut_entry{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
.dialog_box{
  margin-top: 100px;
  border: 2px solid var(--normal_blue);
  border-radius: 8px;
}
.article_put_input{
  position: relative;
}
.article_input_text_count{
  position: absolute;
  top: 50%;
  right: 15px;
  color: var(--text3);
  font-size: 13px;
  transform: translateY(-50%);
}
.article_input_text_count.desc{
  top:unset;
  bottom: 0;
}
.quill_editor_count_wrap{
  border: 1px solid var(--line_contribute);
  border-top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0 15px 10px 15px;
}
.quill_editor_count{
  font-size: 13px;
  line-height: 20px;
  color: var(--text3);
}
</style>

