<script setup>

import RelatedLinks from "@/components/article/relatedLinks.vue";
import {getStsToken} from "@/api/stsTokenApi.js";
import {bucketName, endpoint, region} from "@/utils/constants.js";
import {ref} from "vue";
import OSS from "ali-oss";
let credentials = null;
const picInput = ref(null);
const onFileChange = (e) =>{
  picInput.value =  e.target.files[0];
}
const isCredentialsExpired = (credentials) =>{
  if (!credentials) return true;
  const expireDate = new Date(credentials.expiration)
  const now = new Date()
  // 如果有效期不足一分钟，视为过期。
  return expireDate.getTime() - now.getTime() <= 60000;
}

const submit = async (event) => {
  if(isCredentialsExpired(credentials)){
    credentials = await getStsToken()
  }
  const client = new OSS({
    bucket : bucketName,
    region : region,
    accessKeyId : credentials.accessKeyId,
    accessKeySecret : credentials.accessKeySecret,
    stsToken: credentials.securityToken,
    endpoint : endpoint,
    secure : true
  })
  console.log(new Date().getTime())
  const ObjectName = 'testDir/mac_'+new Date().getTime()+'.'+picInput.value.name.split('.').pop()
  const result =  await client.put(ObjectName,picInput.value);
  console.log(result);
}
</script>

<template>
  <div id="test">
    <div class="test_popover" @submit.prevent="submit">
      <form style="display: flex;flex-direction: column">
        <input type="file" class="mb_20" @change="onFileChange">
        <button v-if="picInput" class="button" value="submitPic" style="margin-bottom: 20px">提交照片</button>
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
</style>
