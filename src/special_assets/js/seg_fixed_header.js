import {computed} from "vue";
import store from "@/store/index.js";

export const game_class = [
    {id:1,name:'首页',href:''},{id:2,name:'PC游戏',href:''},{id:3,name:'模拟器游戏',href:''},
    {id:4,name:'至高之神',href:''},{id:5,name:'手机游戏',href:''},{id:6,name:'游戏插件',href:''}
]

export const currentGamePage = computed(()=>store.state.page.gamePage)

