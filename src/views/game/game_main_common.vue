<script setup>
  import {Swiper,SwiperSlide} from "swiper/vue";
  import 'swiper/swiper-bundle.css';
  import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar} from "swiper";
  const props = defineProps({
    data:{
      type:Object,
      required:true
    }
  })
  SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar,EffectCoverflow])
  const image = [
    {src:'https://picsum.photos/918/270?1'},
    {src:'https://picsum.photos/918/270?2'},
    {src:'https://picsum.photos/918/270?3'},
    {src:'https://picsum.photos/918/270?4'},
    {src:'https://picsum.photos/918/270?5'}
  ]

  const coverflowEffect = {
    rotate: 0,
    stretch: 80,
    depth: 150,
    modifier: 1,
    slideShadows : true
  }
  const autoplay = {
    delay:2000,
    disableOnInteraction:false,
    pauseOnMouseEnter:true
  }
</script>

<template>
  <div class="container_diy">
    <swiper :loop="true"  :slides-per-view="'auto'" :looped-slides="5" :effect="'coverflow'" :coverflow-effect="coverflowEffect" :centered-slides="true">
      <swiper-slide v-for="(slide,index) in image" :key="index"><picture class="v-img"><img :src="slide.src" alt=""/></picture></swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
  .container_diy{
    position: relative;
    margin-left: 100px;
    margin-right: 100px;
    height: 300px;
  }
  .v-img{
    position: absolute;
    width: 100%;
    height: 100%;
    transition: .5s;
  }
  .v-img img{
    width: 100%;
    height: 100%;
    transition: .5s;
  }
</style>
<style>
.swiper-slide{
  transition:  .5s;
}

</style>
