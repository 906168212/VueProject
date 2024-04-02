import transformTest1 from '@/assets/image/transform_test.avif';
import transformTest2 from '@/assets/image/transform_test_2.avif';
import transformTest3 from '@/assets/image/transform_test_3.avif';
import transformTest4 from '@/assets/image/transform_test_4.avif';
import transformTest5 from '@/assets/image/transform_test_5.avif';
import transformTest6 from '@/assets/image/transform_test_6.avif';
import colorthief from 'colorthief';
import SwiperCore, {Autoplay, Navigation, Pagination, Scrollbar} from "swiper";
import {onMounted, reactive, ref} from "vue";
import {createCardInfo} from "@/utils/utils.js";

SwiperCore.use([Autoplay,Pagination,Navigation,Scrollbar])

const column_chart_pagination_text = ref('')

export const pictureChiefColor = ref(['rgb(123,123,123)'])
export const swiperImage=[
    {src:transformTest1,alt:'这是第一个'},
    {src:transformTest2,alt:'这是第二个'},
    {src:transformTest3,alt:'这是第三个'},
    {src:transformTest4,alt:'这是第四个'},
    {src:transformTest5,alt:'这是第五个'},
    {src:transformTest6,alt:'这是第六个'},
    {src:transformTest1,alt:'这是第七个'},
    {src:transformTest2,alt:'这是第八个'},
    {src:transformTest3,alt:'这是第九个'}
]
export const noticeSwiper=[
    '必看：站点公告',
    '必看：站点会员准则、规定',
    '账号、充值&帮助说明',
    '其他相关说明'
]
const Article = createCardInfo(11)
export const indexArticle = reactive(Article)
export const currentSlideIndex = ref(0);
export const updateCaption = (event) => {
    if(event.activeIndex-1>=9) currentSlideIndex.value = 0;
    else currentSlideIndex.value=event.activeIndex-1;
}

export const swiper_recommended ={
    loop:true,
    autoplay:{
        autoplay:true,
        delay:3000,
        disableOnInteraction:false,
        pauseOnMouseEnter:true
    },
    pagination:{
        el:'.not-gray_li',
        bulletElement:'li',
        clickable:true,
        bulletClass:'swiper-bullet'
    },
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
}

export const swiper_notice =reactive({
    loop:true,
    autoplay:{
        autoplay:true,
        delay: 3000,
        disableOnInteraction:false,
        pauseOnMouseEnter:true
    },
    direction:'vertical',
})

export const swiper_chart=reactive({
    spaceBetween:20,
    scrollbar:{
        el:'.swiper-scrollbar',
        dragClass:'diy_scrollbar_drag',
    },
    pagination:{
        el:'.diy_pagination',
        bulletClass: 'diy_pagination_bullet',
        bulletActiveClass: 'diy_pagination_bullet_active',
        renderBullet:function (index,className){
            switch (index) {
                case 0:column_chart_pagination_text.value='今天';break;
                case 1:column_chart_pagination_text.value='昨天';break;
                case 2:column_chart_pagination_text.value='本周';break;
                case 3:column_chart_pagination_text.value='本月';break;
                case 4:column_chart_pagination_text.value='本年';break;
                case 5:column_chart_pagination_text.value='所有';break;
            }
            return '<a class="'+ className + '"><div class="header_chart_type_item">' + column_chart_pagination_text.value + '</div></a>';
        },
        clickable: true,
    }
})



export const getColorPalette = async ()=>{
    const colorThief = new colorthief();
    const imageColors = [];
    for (const image of swiperImage){
        const img = new Image();
        img.src = image.src;
        img.crossOrigin = 'Anonymous';
        // 等待图片加载完成
        await new Promise(resolve => {
            img.onload = () => resolve();
        });
        // 提取图片的主题颜色并存储
        const palette = colorThief.getColor(img);
        imageColors.push(`rgb(${palette[0]}, ${palette[1]}, ${palette[2]})`);
    }
    pictureChiefColor.value = imageColors
}

export const restData = ()=>{
    currentSlideIndex.value = 0
    pictureChiefColor.value = ['rgb(123,123,123)']
    Object.assign(indexArticle,Article)
}
