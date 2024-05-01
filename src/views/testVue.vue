<script setup>
import SelfDialog from "@/components/selfDialog.vue";
import ImageCut from "@/components/imageCut.vue";
import {ref} from "vue";
import CommonDialog from "@/components/diyDialog.vue";
import HaSelect from "@/components/ha-select.vue";
const dialog = ref(false)
const title = ref("测试历程")

const openDialog = ()=>{
  dialog.value = true
}
const closeCoverDialog=(payload)=>{
  dialog.value = payload
}
const getBackData=(payload)=>{

}
const content = ['1','2','3','4','5']
</script>

<template>
  <div id="test">
    <div class="test_popover">
      <ha-select :selected-list="content" :default-selected-id="4"></ha-select>
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
