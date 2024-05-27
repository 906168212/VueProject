<script setup>

import RelatedLinks from "@/components/article/relatedLinks.vue";
</script>

<template>
  <div id="test">
    <div class="test_popover">
      <related-links/>
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
  padding: 4px 11px;
  border: 1px solid var(--Lb5_u);
  border-radius: 4px;
  color: var(--color_white);
  background-color: var(--Lb5_u);
  transition: .2s;
}
.button:hover{
  background-color: var(--Lb4_u);
}
.test_dialog{
  margin: 100px auto 20px;
}
</style>
