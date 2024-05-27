<script setup>
import {computed, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {on} from "@/utils/utils.js";

const props = defineProps({
  placeholder:{
    type:String,
    default:'请输入'
  },
  defaultSelectedId:{
    type:Number,
    default:null
  },
  selectedList:{
    type:Object,
    required:true
  }
})
const emits = defineEmits(['updateSelectedId'])
const displayList = ref(false)
const select = ref(null)
const list = ref(null)
const selectedContent = ref(null)
const selectedId = ref(props.defaultSelectedId)
const changeRotate = ()=>{
  displayList.value = !displayList.value
}
const checkClick = (e)=>{
  if(displayList.value){
    displayList.value = false
  }
}
const selectItem = (item,index)=>{
  selectedId.value = index
  selectedContent.value = item
  displayList.value = false
}



watch(selectedContent,()=>{
  emits('updateSelectedId',selectedId.value)
})
onMounted(()=>{
  if(selectedId.value!==null && selectedId.value < props.selectedList.length){
    selectedContent.value = props.selectedList[selectedId.value]
  }
})
</script>

<template>
  <div class="ha-select" v-oclick="checkClick">
    <div ref="select" class="ha-select_entry" @click="changeRotate">
      <input v-model="selectedContent" class="ha-select_input" readonly :placeholder="placeholder">
      <svg-icon icon-name="arrow" class-name="arrow_svg" :class="{rotate:displayList}"></svg-icon>
    </div>
    <col-transition>
      <div ref="list" class="ha-select_list" v-show="displayList">
        <slot name="list_inner">
          <div class="list_inner">
            <div class="list_item" :class="{selected:selectedId===index}" v-for="(item,index) in selectedList" @click="selectItem(item,index)">
              {{item}}
              <svg-icon :class="{selected:selectedId===index}" class-name="selected_svg" icon-name="check"></svg-icon>
            </div>
          </div>
        </slot>
      </div>
    </col-transition>
  </div>
</template>

<style scoped>
.ha-select{
  display: inline-block;
  position: relative;
  --entry_h:40px;
  --entry_lh:40px;
  --entry_w:200px;
  --entry_p_tb:5px;
  --entry_p_lr:10px;
  --input_m_r:15px;
  --input_fs:14px;
  --arrow_size:15px;
  --list_item_lh:25px;
  --list_m_tb:10px
}
.ha-select_entry{
  background-color: var(--bg_white);
  border: 1px solid var(--line_contribute);
  border-radius: 4px;
  line-height: var(--entry_lh);
  width: var(--entry_w);
  height: var(--entry_h);
  padding: var(--entry_p_tb) var(--entry_p_lr);
  cursor: pointer;
  transition: all .2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ha-select_input{
  background: none;
  height: 100%;
  cursor: pointer;
  width: calc(var(--entry_w) - 2 * var(--entry_p_lr) - var(--input_m_r) - var(--arrow_size) - 10px);
  margin-right: var(--input_m_r);
  font-size: 14px;
}
.arrow_svg{
  width: 15px;
  height: 15px;
  color: var(--text3);
  transition: all .2s;
}
.arrow_svg.rotate{
  transform: rotate(180deg);
}
.ha-select_list{
  position: absolute;
  top:110%;
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 1101;
  background: var(--bg_white);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 -1px 0 1px rgba(0, 0, 0, .2);
}
.list_item{
  padding: var(--entry_p_tb) var(--entry_p_lr);
  cursor: pointer;
  transition: background-color .2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: var(--list_item_lh);
}
.list_item.selected{
  background-color: var(--bg_regular);
  color: var(--Lb5_u);
}
.selected_svg{
  width: 15px;
  height: 15px;
  color: var(--Lb5_u);
  display: none;
}
.selected_svg.selected{
  display: block;
}
.list_inner{
  margin: var(--list_m_tb) 0;
}
.ha-select_entry:hover{
  border-color: var(--Lb5_u);
}
.list_item:hover{
  background-color: var(--bg_regular);
}
</style>
