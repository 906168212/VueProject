<script setup >
import {computed, onBeforeUnmount, onMounted, onUnmounted, reactive, ref} from "vue";
import store from "@/store/index.js";
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import BlotFormatter from 'quill-blot-formatter'
import ImageUploader from 'quill-image-uploader';
import ImageCut from "@/components/imageCut.vue";
import PlatformFooter from "@/components/platformFooter.vue";
import {links} from "@/api/dataInfo.js";
class Content {
  title = ''
  desc = ''
  quillContent = ''
}
const defaultId = 2
const defaultColumn = links[defaultId].name
const defaultCategory = links[defaultId].category[0]

class Selected {
  showId = 0
  id = defaultId
  column = defaultColumn
  category = defaultCategory
  choose = false
}

const TITLE_MAX_INPUT = 40
const DESC_MAX_INPUT = 150
const columns = links;

const content = reactive(new Content())
const selected = reactive(new Selected())

const dialogInit = ref(false)
const dialog = ref(false)
const moreConfig = ref(false)
const coverData = ref(null)
const quillEditor = ref(null)
const quillCount = ref(0)
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
      upload:{}
    }
  }
]

const myQuillOptions = reactive({
  theme:'snow',
  placeholder:"请输入具体内容"
})


const openCoverDialog = ()=>{
  dialogInit.value = true
  dialog.value = true
}
const closeCoverDialog=(payload)=>{
  dialog.value = payload
}
const getCoverData=(payload)=>{
  coverData.value = payload
}
const updateQuillTextCount=(event)=>{
  quillCount.value =  quillEditor.value.getText().length - 1
}
const getSelectedColumn=(index)=>{
  // selected.id = index
  selected.showId = index
  selected.choose = true
}
const getSelectedCategory=(index,cindex)=>{
  selected.id = index
  selected.column = columns[index].name
  selected.category = columns[index].category[cindex]
  selected.choose = false
}
const handleOutSideClick=(event)=>{
  if(!event.target.classList.contains('column_click_box') && !event.target.classList.contains('column_item_category')){
    selected.choose = false
  }
}
const titleNum = computed(()=> content.title.length)
const descNum = computed(()=>content.desc.length)
onMounted(()=>{
  store.commit('page/setContributePage',0)
  document.addEventListener("click",handleOutSideClick)
})
onUnmounted(()=>{
  quillCount.value = 0
  quillEditor.value = null
  dialog.value = false
  coverData.value = null
  dialogInit.value = false
  Object.assign(content,new Content())
  Object.assign(selected,new Selected())
  document.removeEventListener("click",handleOutSideClick)
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
          <QuillEditor ref="quillEditor" @textChange="updateQuillTextCount($event)"  :modules="modules" toolbar="full" :options="myQuillOptions" v-model:content="content.quillContent"/>
          <div class="quill_editor_count_wrap">
            <span class="quill_editor_count">已输入{{ quillCount }}字</span>
          </div>
        </div>
        <div class="article_put_more_config_wrap">
          <div class="more_config_entry">
            <div class="column_config">
              <span>请设置专栏分类</span>
              <div class="column_item_container">
                <div v-for="(column,index) in columns" :key="index" class="column_item">
                  <span class="column_click_box" :class="{selected:selected.id === index}"  @click="getSelectedColumn(index)">{{ column.name }}</span>
                  <div class="column_item_category" v-if="selected.showId===index && selected.choose">
                    <div  @click="getSelectedCategory(index,ind)" v-for="(single,ind) in column.category" :key="ind" class="column_category_item">{{single}}</div>
                  </div>
                </div>
              </div>
              <div class="column_config_tip">
                <span>当前选择的分类：</span>
                <span style="color: var(--Lb5_u)">{{selected.column}} / {{selected.category}}</span>
              </div>
              <div class="column_config_tip column_default_tip">
                <span>非必选，默认选择【{{defaultColumn}} / {{defaultCategory}}】</span>
              </div>
            </div>
          </div>
          <div class="more_config_tip">
            <span>更多设置</span>
            <svg-icon icon-name="arrow" class-name="arrow_svg"></svg-icon>
          </div>
          <div class="more_config_tip_test">
            <svg-icon icon-name="info" class-name="info_svg"></svg-icon>
            <span>分类、标签、定时发布等</span>
          </div>
        </div>
        <div class="article_put_upload_wrap">
          <button class="upload_btn">提交文章</button>
          <button>存草稿箱</button>
          <button>网页预览</button>
        </div>
      </div>
      <platform-footer/>
    </div>
    <div class="image_cut_entry">
      <transition name="dialog">
        <image-cut class="dialog_box" :dialog="dialog" v-if="dialogInit" v-show="dialog" @closeDialog="closeCoverDialog" @getBackCoverData="getCoverData"></image-cut>
      </transition>
    </div>
  </div>
</template>

<style src="@/special_assets/css/articleSend.css" scoped>

</style>

