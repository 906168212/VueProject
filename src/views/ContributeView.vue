<script setup>

import ContributeHeader from "@/components/header/contributeHeader.vue";
import {onMounted, onUnmounted, reactive, ref} from "vue";
import {Nav} from "@/api/dataInfo.js";
import {getNav} from "@/api/navApi.js";
import ContributeSideBar from "@/views/contribute/contributeSideBar.vue";
import Footer from "@/components/Footer.vue";
import Overlay from "@/components/Overlay.vue";
import Contribute_article_manage from "@/views/contribute/contribute_article_manage.vue";

const nav = reactive(new Nav())
const pageID = ref(0)


onMounted(()=>{
  getNav(nav)
})

onUnmounted(()=>{
  Object.assign(nav,new Nav())
})

</script>

<template>
  <div id="contribute">
    <contribute-header></contribute-header>
    <main class="contribute_main_popover">
      <contribute-side-bar/>
      <router-view/>
    </main>
  </div>
  <Overlay/>
</template>

<style scoped>
#contribute{
  position: relative;
  height: 100%;
  margin: 0 auto;
  max-width: 2560px;
  background-color: var(--bg_white);
}
.contribute_main_popover{
  display: flex;
  flex-direction: row;
  height: calc(100% - 64px);
}
</style>
