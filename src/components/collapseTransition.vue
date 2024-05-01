<script setup>
// 过渡时间自定义，手风琴样式自定义
const props = defineProps({
  time:{
    type:String,
    default:'0.2s'
  },
  accordion:{
    type:Boolean,
    default:true
  },
})
const transitionStyle = props.time + ' height ease-in-out'
const beforeEnter = (el)=>{
  el.style.transition = transitionStyle;
  el.style.height = 0;
}
const enter = (el)=>{
  if(el.scrollHeight !== 0){
    el.style.height = `${el.scrollHeight}px`
  }else {
    el.style.height = ''
  }
  el.style.overflow = 'hidden'
}
const afterEnter = (el)=>{
  el.style.transition = '';
  el.style.height = '';
}
const beforeLeave = (el)=>{
  if(props.accordion){
    el.style.display = 'block'; // 手风琴
  }
  el.style.height = `${el.scrollHeight}px`;
  el.style.overflow = 'hidden';
}
const leave = (el)=>{
  if (el.scrollHeight !== 0) {
    el.style.transition = transitionStyle;
    el.style.height = 0;
  }
}
const afterLeave = (el)=>{
  el.style.transition = '';
  el.style.height = '';
}
</script>

<template>
  <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
              @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<style scoped>

</style>
