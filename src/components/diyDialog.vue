<script setup>
import {ref} from "vue";

const props = defineProps({
  title:{
    type:String
  }
})
const emits = defineEmits(['closeDialog','sureDialog'])
const closeDialog = ()=>{
  emits('closeDialog',false)
}
const suerDialog = ()=>{
  emits('sureDialog',true)
}
</script>

<template>
  <div class="common_dialog_overlay">
    <div class="common_dialog_popover">
      <div class="common_dialog_entry">
        <slot name="dialog_header">
          <div class="common_dialog_header">
            <span>{{title}}</span>
            <svg-icon icon-name="close_btn" class-name="close_btn_svg" @click.stop="closeDialog"></svg-icon>
          </div>
        </slot>
        <slot></slot>
        <slot name="dialog_bottom">
          <div class="common_dialog_bottom">
            <button class="sure_btn" @click.stop="suerDialog">确定</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.common_dialog_overlay{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  overflow: auto;
  --popover_width:800px;
  --popover_m_t:15vh;
  --popover_m_b:30px;
}
.common_dialog_popover{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.common_dialog_entry{
  position: relative;
  margin: var(--popover_m_t) auto var(--popover_m_b);
  width: var(--popover_width);
  background-color: var(--bg_white);
  border-radius: 4px;
}
.common_dialog_header{
  height: 64px;
  line-height: 24px;
  font-size: 18px;
  font-weight: 800;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text1);
}
.common_dialog_bottom{
  height: 64px;
  padding: 20px 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.close_btn_svg{
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: color .2s;
}
.close_btn_svg:hover{
  color: var(--Lb5_u);
}
.sure_btn{
  padding: 5px 11px;
  border-radius: 4px;
  background-color: var(--Lb5_u);
  color: var(--color_white);
  transition: background-color .2s;
}
.sure_btn:hover{
  background-color: var(--Lb4_u);
}
</style>
