<script setup>
import {onMounted, onUnmounted, ref} from "vue";
  import store from "@/store/index.js";
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  const coverInput = ref(null)
  const coverUrl = ref(null)
  const triggerFileUpload = ()=>{
    coverInput.value.click()
  }

  const handleCoverUpload = (event)=>{
    const inputCover = event.target
    if (inputCover.files && inputCover.files[0]) {
      const img = inputCover.files[0]
      const reader = new FileReader()
      reader.onload = (e)=>{
        coverUrl.value = e.target.result;
        console.log(coverUrl.value)
      }
      reader.readAsDataURL(img)
    }
  }

  onMounted(()=>{
    store.commit('page/setContributePage',0)
  })
  onUnmounted(()=>{
    coverInput.value = null
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
            <span class="article_put_title_wrap_test">封面</span>
          </div>
          <div class="article_put_cover_style">
            <div class="article_put_cover_svg_wrap" @click="triggerFileUpload" :style="{background:`url('${coverUrl}') no-repeat`}">
              <svg-icon class-name="contribute_send_large_svg" icon-name="contribute_send"></svg-icon>
            </div>
            <input id="cover_upload" ref="coverInput" type="file" accept="image/*" @change="handleCoverUpload">
          </div>
        </div>
        <div class="article_put_title_wrap">
          <div class="article_put_title">
            <svg-icon icon-name="title" class-name="title_svg"></svg-icon>
            <span class="article_put_title_wrap_test">标题</span>
          </div>
          <input placeholder="请输入标题（建议30字以内）" maxlength="40">
        </div>
        <div class="article_put_desc_wrap">
          <div class="article_put_desc">
            <svg-icon icon-name="describe" class-name="desc_svg"></svg-icon>
            <span class="article_put_title_wrap_test">简介</span>
          </div>
          <textarea placeholder="请输入简介（建议100字以内）" maxlength="150" />
        </div>
        <QuillEditor theme="snow"/>
      </div>
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
}
.article_put_title_wrap input{
  width: 100%;
  line-height: 32px;
  font-size: 20px;
  font-weight: 800;
  padding: 10px 50px 10px 10px;
  border: 1px solid var(--line_regular);
  transition: border-color .2s;
}
.article_put_title_wrap input::placeholder,.article_put_desc_wrap textarea::placeholder{
  font-weight: 400;
  color:var(--text4);
}
.article_put_title_wrap_test{
  font-size: 20px;
  font-weight: 800;
}
.article_put_title,.article_put_cover,.article_put_desc{
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
.article_put_desc_wrap textarea{
  width: 100%;
  border: 1px solid var(--line_regular);
  line-height: 26px;
  font-size: 16px;
  padding: 10px;
  outline: none;
  resize: none;
  text-align: justify;
  transition: border-color .2s;
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
.article_put_cover_wrap #cover_upload{
  opacity: 0;
  display: none;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.article_put_cover_svg_wrap{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-size: cover;
}
.contribute_send_large_svg{
  width: 60px;
  height: 60px;
  color: var(--normal_blue);
  margin-bottom: 10px;
}
</style>
