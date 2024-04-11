import {computed, reactive, ref} from "vue";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar} from "swiper";
import { cardInfo} from "@/api/dataInfo.js";
import {createCardInfo} from "@/utils/utils.js";

SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar,EffectCoverflow])

const SwiperImage = [
    {src:'https://picsum.photos/918/270.webp?1',alt:'第一个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?2',alt:'第二个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?3',alt:'第三个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?4',alt:'第四个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?5',alt:'第五个',hasLoaded:false}
]


const createArticle = createCardInfo(4)
const createUpdate = createCardInfo(2)

const createList = createCardInfo(10)
export const goodArticle = reactive(createArticle)
export const updateArticle = reactive(createUpdate)
export const pcArticle = reactive(createArticle)
export const simulatorArticle = reactive(createArticle)
export const bestArticle = reactive(createArticle)
export const phoneArticle = reactive(createArticle)
export const pluginArticle = reactive(createArticle)
export const pcList = reactive(createList)
export const simulatorList = reactive(createList)
export const bestList = reactive(createList)
export const phoneList = reactive(createList)
export const pluginList = reactive(createList)
export const swiperImage = ref(SwiperImage)


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
    swiperImage.value[index].hasLoaded = true
}

export const resetData=()=>{
    swiperImage.value = SwiperImage
    Object.assign(goodArticle,createArticle)
    Object.assign(pcArticle,createArticle)
    Object.assign(updateArticle,createUpdate)
    Object.assign(pcList,createList)
    Object.assign(simulatorList,createList)
    Object.assign(bestList,createList)
    Object.assign(phoneList,createList)
    Object.assign(pluginList,createList)
}


export const rotate = (roll)=>{
    game[roll].rotate += 360
}

