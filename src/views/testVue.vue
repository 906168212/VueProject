<script setup>
import GridPopover from "@/components/gridPopover.vue";



//可视窗口数据懒加载测试
/*
*  测试目标：
*    1、学习useIntersectionObserver的使用，能够实现可视区域dom元素的获取
* */

// 闭包节流
const throttle=(fn, wait) =>{
  let timer = '';
  return function(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}


</script>

<template>
  <grid-popover category="文章精选" article=""></grid-popover>
</template>

<style scoped>

.test_observe{
  width: 100%;
  padding: 100px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.test_img{
  display: flex;
  min-height: 300px;
  justify-content: center;
  margin-bottom: 30px;
  background-color: var(--bg_regular);
}
</style>
