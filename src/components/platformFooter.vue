<script setup>
const props = defineProps({
  margin_lr:{
    type:Number,
    default:40
  }
})
</script>

<template>
  <div class="platform_footer_popover" :style="{margin:'0 '+margin_lr+'px'}">
    <div class="platform_footer_entry">
      <a href="/index">halihapi</a>
      <a href="">帮助中心</a>
      <a href="">问题反馈</a>
      <a href="">关于本站</a>
    </div>
  </div>
</template>

<style scoped>
.platform_footer_popover{
  padding: 50px 0;
}
.platform_footer_entry{
  padding-top: 20px;
  border-top: 1px solid var(--line_regular);
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: center;
  color: var(--text3);
  cursor: pointer;

}
.platform_footer_entry a{
  padding: 0 16px;
  border-right: 1px solid var(--line_regular);
  transition: color .2s;
}
.platform_footer_entry a:hover{
  color: var(--Lb5_u);
}
.platform_footer_entry a:last-child{
  border: none;
}
</style>
