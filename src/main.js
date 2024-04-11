import {createApp} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import router from "@/router/index.js";
import store from "@/store/index.js";

import SvgIcons from '@/components/svgIcon/index.vue'
import '@/router/guard.js';
import '@/assets/css/index.css';
import '@/assets/css/index_me.css'
import '@/assets/css/media.css';
import '@/assets/css/native.css';
import '@/assets/js/jquery.min.js';
import {lazyLoad} from "@/utils/hook.ts";





const app = createApp(App)

//此处实现自定义懒加载指令，为v-lazy
app.directive('lazy',{
    mounted(target,binding){lazyLoad(target,binding)}
})

app.use(router).use(store).component('svg-icon',SvgIcons).mount('#app')

