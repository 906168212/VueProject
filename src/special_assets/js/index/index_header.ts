import {computed, reactive, ref} from "vue";
import store from "../../../store/index.js";
import {doLogout} from "../../../api/loginAndLogoutApi.js";
import {getUserStat} from "../../../api/indexApi.js";

class Search {
    placeHolder = '测试中'
    content = ''
}
class Mouse {
    avatar = ref<null | boolean>(null)
    otherService = false
    contribute = false
    headerChannel = false
    message = false
    moveLength = -36
    enterX = 0
    moveX = 0
}
class Animation {
    avatar = false
    otherService = false
    contribute = false
    message = false
}

class User {
    svgPath = 'src/assets/svg/'
    current_level = 1
    current_vip = 0
    current_level_name = '新手上路'
    vip_status = 0
    point_num = 0.0
    future_coin_num = 0.0
    motion_num = 0
    concerned_num = 0
    fan_num = 0
    nickName = '用户_0000000'
    number = 0
}

const timer = ref(null)

export const transitionType = ref('none')

export const headerSearchFocus = ref(false)

export const search = reactive(new Search())

export const mouse = reactive(new Mouse())
export const animation = reactive(new Animation())
export const user=reactive(new User())

export const links = [
    {id: 1, name: '动漫',href:''},{id: 2, name: '漫画',href:''},{id: 3, name: '游戏',href:'/game'},{id: 4, name: '吃瓜',href:''},
    {id: 5, name: '热点',href:''},{id: 6, name: '资讯',href:''},{id: 7, name: '影视',href:''},{id: 8, name: '美食',href:''},
    {id: 9, name: '旅游',href:''},{id: 10, name: '知识',href:''},{id: 11, name: '单机游戏',href:''},{id: 12, name: '生活',href:''},
    {id: 13, name: '工具',href:''},{id: 14, name: 'ASMR',href:''},{id: 15, name: '网址大全',href:''},{id: 16, name: '精品',href:''}
]

export const resetData = () =>{
    transitionType.value = 'none'
    headerSearchFocus.value = false
    Object.assign(search,new Search())
    Object.assign(mouse,new Mouse())
    Object.assign(animation,new Animation())
    Object.assign(user,new User())
}

const stat = async ()=>{
    await getUserStat()
}


export const mouseMoveTransform = computed(()=>{
    return 'translate('+mouse.moveLength+'px,0)'
})
export const mouseEnter_normal = (action)=>{
    mouse[action] = true
}
export const mouseLeave_normal = (action)=>{
    mouse[action] = false
}

export const mouseEnter_animation=(action)=>{
    timer.value = setTimeout(()=>{
        if(!animation[action]) mouse[action]  = true
        if(action === 'avatar') stat()
    },200)
}

export const mouseLeave_animation=(action)=>{
    clearTimeout(timer.value)
    if(!animation[action]) {
        // 如果动画没有在进行中，立即设置 mouse[action] 为 false
        mouse[action] = false
    }
}



export const animationStart=(action)=>{
    animation[action] = true
}
export const animationEnd=(action)=>{
    animation[action] = false
}

export const handleMouseEnter=(event)=>{
    mouse.enterX = event.clientX
    transitionType.value = 'none'
}
export const handleMouseMove=(event)=>{
    mouse.moveX = event.clientX
    const disx = mouse.moveX - mouse.enterX;
    mouse.moveLength = -36 - disx / -20
}
export const handleMouseLeave=()=>{
    transitionType.value = .3+'s'
    mouse.moveLength = -36
}
export const handleHeaderSearchFocus=()=>{
    headerSearchFocus.value = true
}
export const handleHeaderSearchBlur=()=>{
    headerSearchFocus.value = false
}

export const getUserLevelSvg =(level)=>{
    if(level>6) level = 6
    return user.svgPath+'user_level_'+level+'.svg'
}
export const getUserVipSvg = (vip)=>{
    return user.svgPath+'vip_'+vip+'.svg'
}

export const searchClean=()=>{
    search.content='';
    handleHeaderSearchFocus();
}


export const logout = async ()=>{
    await doLogout()
}


export const formattedMemberCount = computed(()=>{
    const countStr = String(user.number);
    const diff = 6 - countStr.length;
    return '0'.repeat(Math.max(0,diff))+countStr
})

export const pointForOneFixed=computed(()=>{
    return user.point_num.toFixed(1);
})
export const futureCoinForOneFixed=computed(()=>{
    return user.future_coin_num.toFixed(1);
})
export const scrollBarStatus = computed(()=>{
    return store.state.header.scrolled_bar
})
export const scrollChannelStatus = computed(()=>{
    return store.state.header.scrolled_channel
})
