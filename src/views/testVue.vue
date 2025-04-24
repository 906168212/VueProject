<script setup>

import {ref} from "vue";
import {submitFileToOss} from "@/utils/AliOss.js";
let credentials = null;
const picInput = ref(null);
const picUrl = ref(null);
const onFileChange = (e) =>{
  picInput.value =  e.target.files[0];
}

const submit = async (event) => {
  picUrl.value = await submitFileToOss(picInput.value);
}
</script>

<template>
  <div id="test">
    <div class="test_popover" @submit.prevent="submit">
      <form style="display: flex;flex-direction: column">
        <input type="file" class="mb_20" @change="onFileChange">
        <button v-if="picInput" class="button" value="submitPic" style="margin-bottom: 20px">提交照片</button>
        <p>预览图片</p>
        <img class="image_test_box" :src="picUrl" alt="图片测试">
      </form>
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
.image_test_box{
  width: 200px;
  height: auto;
}
</style>
