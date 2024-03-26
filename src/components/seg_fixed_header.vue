<script setup>
import {computed, ref} from "vue";
import store from "@/store/index.js";

const prop = defineProps({
  fixedName:{
    type: String,
    required:true
  }
})
const emit = defineEmits(['selectedId'])
const game_class = [
  {id:1,name:'首页',href:''},{id:2,name:'PC游戏',href:''},{id:3,name:'模拟器游戏',href:''},
  {id:4,name:'至高之神',href:''},{id:5,name:'手机游戏',href:''},{id:6,name:'游戏插件',href:''}
]
const currentGamePage = computed(()=>store.state.game.gamePage)
const handleLinkClick=(linkId)=>{
  store.commit('game/setGamePage',linkId)
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
