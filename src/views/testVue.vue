<script setup>

import ImageCut from "@/components/imageCut.vue";
import {onUnmounted, ref} from "vue";
const dialogStatus = ref(false)
const coverData = ref(null)

const triggerDialog=()=>{
  dialogStatus.value = !dialogStatus.value
}
const closeDialog=(payload)=>{
  dialogStatus.value = payload
}
const getCoverData=(payload)=>{
  coverData.value = payload
}

onUnmounted(()=>{
  dialogStatus.value = false
  coverData.value = null
})
</script>

<template>
  <div id="test">
    <div class="test_popover">
      <transition name="dialog">
        <image-cut :dialog="dialogStatus" v-if="dialogStatus" @closeDialog="closeDialog" @getBackCoverData="getCoverData"/>
      </transition>
    </div>
    <div style="position:absolute;top:0;width: 100%;display: flex;justify-content: center;padding-top: 600px">
      <button class="button" @click="triggerDialog">点击切换关闭和开启</button>
    </div>
  </div>
</template>

<style scoped>
#test{
  position: relative;
  height: 100%;
  margin: 0 auto;
  max-width: 2560px;
  background-color: var(--bg-thick);
}
.test_popover{
  padding: 50px 50px;
  display: flex;
  justify-content: center;
}
.button{
  border-radius: 4px;
  border: 1px solid var(--normal_blue);
  background-color: var(--normal_blue);
  padding: 4px 10px;
  color: var(--text-white);
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
</style>
