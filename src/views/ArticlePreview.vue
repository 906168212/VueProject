<script setup>
import {onMounted, ref} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
let route = useRoute()
let title = route.query.title
let desc = route.query.desc
const quillContent = route.query.quillContent

const showTip = ref(true)
const mainContent = ref(null)

const closeTip = () =>{
  showTip.value = false
}
onMounted(()=>{
  const element = mainContent.value
  console.log(element)
  element.innerHTML = quillContent
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
        <div class="title_container">
          <div class="title_text">
            <h1 class="mb_20">{{title}}</h1>
            <span class="desc mb_10">内容简介:</span>
            <span class="desc_content">{{desc}}</span>
          </div>
        </div>
        <div class="main_content_wrap">
          <div ref="mainContent" class="ql-editor">
          </div>
        </div>
        <div class="reproduce_tip">
          <span>转载请标明作者及来源</span>
        </div>
      </div>
    </main>
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
.preview_main_popover{
  margin: 20px auto 40px;
  background-color: var(--bg_white);
  max-width: 900px;
  border-radius: 6px;
}
.preview_main_content{
  padding: 30px 40px 50px;
}
.title_container{
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line_regular);
}
.title_text{
  display: flex;
  flex-direction: column;
}
.desc{
}
.desc_content{
  font-size: 13px;
  color: var(--text3);
  line-height: 20px;
}
.main_content_wrap{
  margin-top: 40px;
}
.reproduce_tip{
  margin-top: 40px;
  padding-bottom: 20px;
  color: var(--text3);
  font-size: 13px;
  border-bottom: 1px solid var(--line_regular);
}
.ql-editor{
  min-height: unset!important;
  padding: 16px 12px 30px!important;
}
</style>