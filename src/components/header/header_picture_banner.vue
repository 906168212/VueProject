<script setup>

</script>

<template>
  <div class="header_picture_banner">
    <picture class="v-img">
      <source srcset="@/assets/image/header_picture_banner.avif" type="image/avif">
      <source srcset="@/assets/image/header_picture_banner.webp" type="image/webp">
      <img src="@/assets/image/header_picture_banner.png" alt="" >
    </picture>
    <div class="header_picture_banner_inner">
      <picture class="header_logo__game">
        <img src="@/assets/image/header_banner_game_logo.png" alt="">
      </picture>
    </div>
  </div>
</template>

<style scoped>
.header_picture_banner{
  display: flex;
  height: 9.375vw;
  justify-content: center;
  min-height: 155px;
  max-height: 240px;
  min-width: 1100px;
  position: relative;
  background-color: #e3e5e7;
  background-position: center 0;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.v-img{
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  vertical-align: middle;  /*用于设置元素对齐方式，将元素的垂直中线与父元素的垂直中线对齐*/
  position: absolute;
  object-fit: cover;
}
.v-img img{
  width: 100%;
  height: 100%;
  object-fit: inherit;  /*继承父级的fit*/
}
.header_picture_banner_inner{
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  width: 100%;
  position: relative;
  max-width: 2078px;
}
.header_logo__game{
  margin-bottom: 10px;
  z-index: 1;
  display: inline-block;
  min-height: 60px;
  height: 50%;
  position: relative;
}
.header_logo__game img{
  height: 65px;
  position: absolute;
  bottom: 20px;
}
</style>
