<script setup>
  import {computed} from "vue";

 const props = defineProps({
    iconName:{
      type:String,
      required:true
    },
    className:{
      type:String,
      default:'icon'
    }
  })

  const svgId = computed(()=> `#${props.iconName}`)
</script>

<template>
  <svg :class="className" aria-hidden="true">
    <use :xlink:href="svgId" fill="currentColor"></use>
  </svg>
</template>

<style scoped>
  .icon{
    width: 20px;
    height: 20px;
    fill: currentColor;
    overflow: hidden;
  }
</style>
