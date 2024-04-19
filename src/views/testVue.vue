<script setup>

</script>

<template>
  <div id="test">
    <div class="test_popover">
      <div class="upload_image_cut_popover">
        <div class="upload_image_cut_header">
          <svg-icon ></svg-icon>
        </div>
      </div>
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
  align-content: center;
  justify-content: center;
}
.upload_image_cut_popover{
  background: var(--bg_white);
  width: 600px;
  height: 350px;
  position: relative;
}
.upload_image_cut_header{
  position: absolute;
  top: 0;
  left: 0;
  height: 48px;
  width: 100%;
  border-bottom: 1px solid var(--line_regular);
}
</style>
