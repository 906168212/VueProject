import {reactive, ref} from "vue";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar} from "swiper";

SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar,EffectCoverflow])

export const swiperImage = ref([
    {src:'https://picsum.photos/918/270?1',hasLoaded:false},
    {src:'https://picsum.photos/918/270?2',hasLoaded:false},
    {src:'https://picsum.photos/918/270?3',hasLoaded:false},
    {src:'https://picsum.photos/918/270?4',hasLoaded:false},
    {src:'https://picsum.photos/918/270?5',hasLoaded:false}
])

export const swiper_game={
    loop:true,
    autoplay:{
        delay:3000,
        disableOnInteraction:false,
        pauseOnMouseEnter:true
    },
    pagination:{
        el:'.swiper-pagination',
        bulletElement: 'li',
        clickable:true
    },
    navigation:{
        prevEl:'.swiper-button-prev',
        nextEl:'.swiper-button-next'
    },
    effect:'coverflow',
    roundLengths:true,
    slidesPerView: 'auto',  // 用于控制显示图片的宽
    loopedSlides: 5,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 150,
        modifier: 1,
        slideShadows : true
    },
}

export const handleLoaded=(index)=>{
    console.log(swiperImage.value[index])
    swiperImage.value[index].hasLoaded = true
}

