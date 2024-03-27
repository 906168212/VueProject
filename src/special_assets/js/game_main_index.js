import {reactive, ref} from "vue";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar} from "swiper";

SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar,EffectCoverflow])

export const swiperImage = ref([
    {src:'./src/assets/image/game_carousel_1.avif'},
    {src:'./src/assets/image/game_carousel_2.avif'},
    {src:'./src/assets/image/game_carousel_3.avif'},
    {src:'./src/assets/image/game_carousel_4.avif'},
    {src:'./src/assets/image/game_carousel_5.avif'},
])

export const swiper_game={
    loop:true,
    autoplay:{
        delay:2000,
        disableOnInteraction:false,
        pauseOnMouseEnter:true
    },
    effect:'coverflow',
    slidesPerView: 'auto',  // 用于控制显示图片的宽
    loopedSlides: 5,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 120,
        depth: 150,
        modifier: 1,
        slideShadows : true
    },
}
const swiperValue = ref(null)
export const getSwiper = (swiper)=>{
    swiperValue.value = swiper
}

export const handleImageLoad=()=>{
    swiperValue.value.update()
}
