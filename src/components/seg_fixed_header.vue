<script setup>
import {currentGamePage, game_class} from "../special_assets/js/seg_fixed_header.js";
import store from "@/store/index.js";
const props = defineProps({
  fixedName:{
    type: String,
    required:true
  }
})
const emit = defineEmits(['selectedId'])
const handleLinkClick=(linkId)=>{
  store.commit('page/setGamePage',linkId)
  emit('selectedId',currentGamePage.value)
}
</script>

<template>
  <div class="fixed_popover">
    <div class="fixed_popover_left name">{{fixedName}}</div>
    <div class="fixed_popover_right">
      <a v-for="link in game_class" :key="link.id" @click="handleLinkClick(link.id)" :class="{selected_active: currentGamePage === link.id}">{{link.name}}</a>
    </div>
  </div>
</template>

<style src="@/special_assets/css/seg_fixed_header_styles.css" scoped>

</style>
