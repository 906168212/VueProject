<script setup>
import {cloudList, cloudList_Eng} from "@/utils/constants.js";
import {reactive, ref} from "vue";
import {useClipboard} from "@vueuse/core";

class UnsupportedBrowserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnsupportedBrowserError';
  }
}

class CopyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CopyError';
  }
}

const codeTipPopover = ref(false)
const current = reactive({
  link:'',
  code:null
})
const copyStatus = ref(false)
const props = defineProps({
  cloudLinks:{
    type:Object,
    default:[{cloud:0,link:'https://pan.baidu.com/share/init?surl=ag1s8e5gUzqe7muTBwu-QA',code:'v2jo'},{cloud:1,link:'1',code:'1234'},{cloud:2,link:'2',code:'5678'},{cloud:3,link:'3',code:''}
      ,{cloud:4,link:'3',code:''},{cloud:5,link:'3',code:''},{cloud:6,link:'3',code:''},{cloud:7,link:'3',code:''}
      ,{cloud:8,link:'3',code:''}]
  },

})
const { copy, isSupported } = useClipboard()
/*
  copy(需要拷贝的内容)
  copied 是否拷贝成功，默认1.5s恢复状态
  isSupported 浏览器是否支持，需要授权读取粘贴板和写入粘贴板权限
* */
const copyCode = async (code)=>{
  try {
    if(!isSupported.value) throw new UnsupportedBrowserError("当前浏览器不支持自动复制")
    await copy(code)
    copyStatus.value = true
  }catch (e){
    copyStatus.value = false
    if(e instanceof UnsupportedBrowserError){
      console.error(e.message)
      log.error(e.message)
    }else{
      console.error("复制失败")
      log.error("复制失败")
    }

  }
}
const getIconName=(item)=>{
  return cloudList_Eng[item.cloud]+'_cloud'
}
const checkCodeAndGo=(item)=>{
  if(item.code !== ''){
    current.code = item.code
    current.link = item.link
    copyCode(item.code)
    codeTipPopover.value = true
  }else{
    codeTipPopover.value = false
    window.open(item.link,'_blank')
  }
}
const closeDialog=(payload)=>{
  if(!payload) {
    codeTipPopover.value = false
    copyStatus.value = false
  }
}
const goDownloadPage=()=>{
  window.open(current.link+`?pwd=${current.code}`,'_blank')
}
</script>

<template>
  <div class="related-links">
    <div class="related-links_header">
      <span class="related-links_header__test">相关下载资源</span>
    </div>
    <div class="related-links_main">
      <a @click="checkCodeAndGo(item)" v-for="(item) in cloudLinks" class="related-links_item">
        <svg-icon class-name="related-links_item_svg" :icon-name="getIconName(item)"></svg-icon>
        <span>{{cloudList[item.cloud]}}</span>
      </a>
      <diy-dialog v-if="codeTipPopover" class="code-tip-dialog" @closeDialog="closeDialog">
        <div class="code-tip_main_entry">
          <div class="code-tip_content">
            <span>提取码</span>
            <span class="code_content" :class="{copy_error:!copyStatus}">{{current.code}}</span>
            <span>{{ copyStatus?"已复制" : "复制失败（请手动复制）"}}</span>
            <svg-icon class-name="copy_status_svg" icon-name="circle-correct" v-if="copyStatus"></svg-icon>
            <svg-icon class-name="copy_status_svg" icon-name="circle-error" v-if="!copyStatus"></svg-icon>
          </div>
          <div class="code-tip_link" @click="goDownloadPage">
            <svg-icon icon-name="cloud_download" class-name="cloud_download_svg"></svg-icon>
            <span>前往下载页面</span>
          </div>
        </div>
        <template #dialog_bottom>
          <div class="code-tip-dialog__bottom"></div>
        </template>
      </diy-dialog>
    </div>
    <div class="related-links_bottom">
      ©资源版权归原作者所有；本站所有资源均来源于网络，仅供学习使用，请支持正版！本站统一解压密码：halihapi.com
    </div>
  </div>
</template>

<style scoped>
.related-links{
  margin-top: 100px;
  width: 100%;
  border: 1px solid var(--line_contribute);
  border-radius: 4px;
}
.related-links_header{
  border-radius: 4px 4px 0 0;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg_regular);
  line-height: 44px;
  font-size: 16px;
}
.related-links_main{
  border-radius: 0 0 4px 4px ;
  padding: 40px 20px;
  background-color: var(--bg_white);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.related-links_item{
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  margin: 10px 5px 0;
  border: 1px solid var(--line_regular);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color .2s;
}
.related-links_item_svg{
  width: 22px;
  height: 22px;
  margin-right: 4px;
}
.code-tip-dialog{
  --popover_width: 400px;
  --popover_m_t: 30vh;
}
.code-tip_main_entry{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.code-tip-dialog__bottom{
  height: 40px;
}
.code-tip_content{
  height: 30px;
  line-height: 30px;
  display: flex;
  align-items: center;
}
.code-tip_content .code_content{
  margin: 0 10px;
  padding: 0 10px;
  height: 100%;
  border: 1px dashed var(--Lg5_u);
  border-radius: 4px;
  background-color: var(--Lg2_u);
  color: var(--Lg7_u);
}
.code-tip_link{
  margin-top: 30px;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
  border: 2px solid var(--Lb5_u);
  border-radius: 4px;
  font-size: 16px;
  color: var(--Lb5_u);
  background-color: transparent;
  transition: background-color .2s;
  cursor: pointer;
}
.cloud_download_svg{
  width: 20px;
  height: 20px;
  margin-right: 4px;
}
.copy_status_svg{
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.code-tip_content .code_content.copy_error{
  border-color: var(--Re5_u);
  background-color: var(--Re2_u);
  color: var(--Re7_u);
}
.related-links_bottom{
  padding-bottom: 10px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: var(--text3);
}
.code-tip_link:hover{
  background-color: var(--Lb5_u);
  color: var(--text-white);
}
.related-links_item:hover{
  background-color: var(--bg_regular);
}
</style>
