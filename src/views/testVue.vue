<script setup>
import {goodArticle, updateArticle} from "@/special_assets/js/game_main_index.js";
import {onImageError} from "@/utils/utils.js";
import BigCard from "@/components/bigCard.vue";
import GridPopover from "@/components/gridPopover.vue";
import {reactive} from "vue";
import {cardInfo} from "@/api/dataInfo.js";

const testData = reactive([new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo(),new cardInfo()])
</script>

<template>
  <grid-popover :list="testData" category="PC游戏" :article="goodArticle" :update="updateArticle"/>
  <grid-popover :list="testData" category="PC游戏" :article="goodArticle" :update="updateArticle"/>
</template>

<style scoped>
.testMe{
  display: grid;
  grid-template-columns: repeat(3,1fr);
  grid-template-rows: repeat(3,1fr);
  grid-gap: 20px 10px;
  padding: 100px 200px;
  position: relative;
}
</style>
