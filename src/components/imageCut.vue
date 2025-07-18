<script setup>
import {getCurrentInstance, onUnmounted, reactive, ref, watch} from "vue";
import 'vue-cropper/dist/index.css'
import {VueCropper} from "vue-cropper";

const props = defineProps({
  dialog:{
    type:Boolean,
    required:true,
    default:false
  }
})
const emits = defineEmits(['closeDialog','getBackCoverData'])
const closeDialog = ()=>{
  emits('closeDialog',false)
}
const previews = ref({})
const uploadCover = ref(false)
const cover = ref(null)
const coverUrl = ref(null)

watch(coverUrl,()=>option.img = coverUrl.value)

const {proxy} = getCurrentInstance()
const triggerCoverUpload=()=>{
  cover.value.click()
}
const backCoverData=() => {
  if(!coverUrl.value) log.error('请先添加封面图片')
  else {
    proxy.$refs.cropper.getCropData(data => {
      emits('getBackCoverData', data)
      emits('closeDialog',false)
    })
  }
}
const handleCoverUpload=(event)=>{
  const imageFile = event.target.files[0]
  const isImage = (file)=>{
    return /^image\//i.test(file.type);
  }
  if(isImage(imageFile)){
    const reader = new FileReader()
    reader.onload = (e)=>{
      coverUrl.value = e.target.result
    }
    reader.readAsDataURL(imageFile)
  }else {
    log.error('禁止上传非图片类型文件！')
  }
}
const realTime = (data)=>{
  previews.value = data
}
class Option {
  img = ''; // 图片地址
  autoCropWidth = 320; // 截图层宽度
  autoCropHeight = 180;// 截图层高度
  autoCrop=true  // 是否默认生成截图层
  centerBox=false // 截图层是否允许超出图片
  fixedBox=false
  fixed=true
  fixedNumber=[16,9]
  limitMinSize=[320,180]
  canMove=false
  mode='contain'
}
const option = reactive(new Option())

// 修改图片大小 正数为变大 负数变小
const changeScale = (scale) =>{
  scale = scale || 1
  proxy.$refs.cropper.changeScale(scale)
}
// 向左边旋转90度
const rotateLeft = () => {
  proxy.$refs.cropper.rotateLeft();
}
// 向右边旋转90度
const rotateRight = () => {
  proxy.$refs.cropper.rotateRight();
}
// 重置
const reload = ()=>{
  proxy.$refs.cropper.reload()
  proxy.$refs.cropper.rotateClear()
}
onUnmounted(()=>{
  uploadCover.value = false
  cover.value = null
  previews.value = {}
  coverUrl.value = null
  Object.assign(option,new Option())
})
</script>

<template>
    <div class="upload_image_cut_popover">
      <div class="upload_image_cut_header">
        <div class="left">
          <svg-icon icon-name="cover" class-name="cover_svg"></svg-icon>
          <span class="cover_cut_header_test">上传封面</span>
        </div>
        <div class="right close_btn">
          <svg-icon icon-name="close_btn" class-name="close_btn_svg" @click.stop="closeDialog"></svg-icon>
        </div>
      </div>
      <div class="upload_image_cut_main">
        <div class="main_box">
          <div class="left">
            <div class="no_image_upload_tip_test" v-if="!previews.url">未选择图片</div>
            <vue-cropper ref="cropper"
                         :img="option.img" :auto-crop-width="option.autoCropWidth" :fixed-box="option.fixedBox"
                         :fixed="option.fixed" :fixed-number="option.fixedNumber" :limit-min-size="option.limitMinSize"
                         :auto-crop-height="option.autoCropHeight" :auto-crop="option.autoCrop" :mode="option.mode"
                         :center-box="option.centerBox" @real-time="realTime" :can-move="option.canMove"/>
          </div>
          <div class="right">
            <div class="need_upload_image_entry">
              <div class="no_image_upload_tip_test" v-if="!previews.url">未选择图片</div>
              <img :src="previews.url" :style="previews.img" v-if="previews.url">
            </div>
          </div>
        </div>
      </div>
      <div class="upload_image_cut_button">
        <div class="button_left">
          <div class="upload_image_btn" @click="triggerCoverUpload"><span>选择图片</span></div>
          <input ref="cover" type="file" accept="image/*" @change="handleCoverUpload">
          <div class="upload_image_btn operate_btn" @click.stop="changeScale(1)">
            <svg-icon class-name="plus_svg" icon-name="plus" ></svg-icon>
          </div>
          <div class="upload_image_btn operate_btn" @click.stop="changeScale(-1)">
            <svg-icon icon-name="minus" class-name="minus_svg" ></svg-icon>
          </div>
          <div class="upload_image_btn operate_btn" @click.stop="rotateLeft">
            <svg-icon icon-name="left_circle" class-name="left_circle_svg"></svg-icon>
          </div>
          <div class="upload_image_btn operate_btn" @click.stop="rotateRight">
            <svg-icon icon-name="right_circle" class-name="right_circle_svg"></svg-icon>
          </div>
          <div class="upload_image_btn operate_btn" @click.stop="reload">
            <span>重置</span>
          </div>
        </div>
        <div class="button_right">
          <div class="upload_image_btn ensure_btn" @click.stop="backCoverData">确定</div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.upload_image_cut_popover{
  --cover_cut_popover_w:800px;
  --cover_cut_popover_h:450px;
  --cover_cut_header_svg_s:23px;
  --cover_cut_header_close_svg_s:18px;
  --cover_cut_header_h:48px;
  --cover_cut_header_fs:18px;
  --cover_cut_header_fw:800;
  --padding_lr:20px;
  --cover_header_svg_mr:7px;
  --cover_cut_main_pt:20px;
  --cover_cut_main_pb:10px;
  --need_cover_width:320px;
  --need_cover_length:180px;
  --upload_image_button_fs:15px;
  --upload_image_button_mr:30px;
  --operate_button_mr:15px;
}
.upload_image_cut_popover{
  background: var(--bg_white);
  width: var(--cover_cut_popover_w);
  height: var(--cover_cut_popover_h);
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}
.upload_image_cut_header{
  height: var(--cover_cut_header_h);
  width: 100%;
  border-bottom: 1px solid var(--line_regular);
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 0 var(--padding_lr);
  color: var(--normal_blue);
}
.upload_image_cut_header .left,.upload_image_cut_header .right.close_btn{
  display: flex;
  align-items: center;
}
.cover_svg{
  width: var(--cover_cut_header_svg_s);
  height: var(--cover_cut_header_svg_s);
  margin-right: var(--cover_header_svg_mr);
  margin-top: 2px;
}
.close_btn_svg{
  width: var(--cover_cut_header_close_svg_s);
  height: var(--cover_cut_header_close_svg_s);
  cursor: pointer;
  transition: all 0.3s;
}
.close_btn_svg:hover{
  transform: rotate(90deg);
}
.cover_cut_header_test{
  line-height: var(--cover_cut_header_h);
  font-size: var(--cover_cut_header_fs);
  font-weight: var(--cover_cut_header_fw);
}

.upload_image_cut_main{
  padding: var(--cover_cut_main_pt) var(--padding_lr) var(--cover_cut_main_pb) var(--padding_lr);
  flex:1
}
.upload_image_cut_main .main_box{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.upload_image_cut_main .left{
  position: relative;
  height: 100%;
}
.upload_image_cut_main .right,.upload_image_cut_main .left{
  width: 48%;
}
.upload_image_cut_main .right{
  display: flex;
  align-items: center;
  justify-content: center;
}
.need_upload_image_entry{
  position: relative;
  width: 320px;
  height: 180px;
  overflow: hidden;
  border: 1px dashed var(--normal_blue);
  border-radius: 6px;
}
.upload_image_cut_button{
  height: calc(var(--cover_cut_header_h) + 10px);
  padding: 0 var(--padding_lr);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.upload_image_cut_button .button_left{
  display: inline-flex;
}
.button_left .operate_btn{
  background-color: var(--bg_white);
  border-color: var(--line_regular);
  color: var(--text2);
  padding: 4px 8px !important;
  margin-right: var(--operate_button_mr);
}
.button_left input{
  display: none;
}
.upload_image_btn{
  font-size: var(--upload_image_button_fs);
  padding: 4px 11px;
  display: flex;
  align-items: center;
  color: var(--normal_blue);
  border: 1px solid var(--normal_blue);
  border-radius: 4px;
  background-color: rgba(0,174,236,.05);
  cursor: pointer;
  transition: all .2s linear;
  margin-right: var(--upload_image_button_mr);
}
.upload_image_btn:not(.operate_btn,.ensure_btn):hover{
  background-color:rgba(0,174,236,.1);
}
.operate_btn:hover{
  background-color: var(--bg_regular);
}
.plus_svg,.minus_svg,.right_circle_svg,.left_circle_svg{
  width: 15px;
  height: 15px;
}
.no_image_upload_tip_test{
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 800;
  z-index: 1;
}
.ensure_btn{
  background-color: var(--normal_blue);
  color: var(--text-white);
  margin-right: 0;
}
.ensure_btn:hover{
  opacity: .8;
}
</style>
