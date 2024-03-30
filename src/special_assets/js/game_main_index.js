import {reactive, ref} from "vue";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar} from "swiper";

SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar,EffectCoverflow])

const SwiperImage = [
    {src:'https://picsum.photos/918/270.webp?1',alt:'第一个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?2',alt:'第二个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?3',alt:'第三个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?4',alt:'第四个',hasLoaded:false},
    {src:'https://picsum.photos/918/270.webp?5',alt:'第五个',hasLoaded:false}
]
// const ArticleImage = [
//     {src:'https://picsum.photos/672/378.webp?1',alt:'第一个',hasLoaded:false,title:'这是一个非常正经的标题[你认为呢]'},
//     {src:'https://picsum.photos/672/378.webp?2',alt:'第二个',hasLoaded:false,title:'这是一个非常正经的标题[你认为呢]'},
//     {src:'https://picsum.photos/672/378.webp?3',alt:'第三个',hasLoaded:false,title:'这是一个非常正经的标题[你认为呢]'},
//     {src:'https://picsum.photos/672/378.webp?4',alt:'第四个',hasLoaded:false,title:'这是一个非常正经的标题[你认为呢]'}
// ]
class ArticleInfo{
    author='默认作者'
    alt=''
    pic=''
    visitor=0
    like=0
    review=0
    desc=''
    category='未知'
    pubDate='0-0'
}
const GoodArticle = [new ArticleInfo(),new ArticleInfo(),new ArticleInfo(),new ArticleInfo()]
export const goodArticle = ref(GoodArticle)
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
    console.log(swiperImage.value[index])
    swiperImage.value[index].hasLoaded = true
}

export const resetData=()=>{
    swiperImage.value = SwiperImage
    goodArticle.value = GoodArticle
}

