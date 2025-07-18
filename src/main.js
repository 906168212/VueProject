import {createApp} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import router from "@/router/index.js";
import store from "@/store/index.js";
import SelfDialog from "@/components/selfDialog.vue";
import SvgIcons from '@/components/svgIcon/index.vue'
import Dialog from "@/components/diyDialog.vue";
import collapseTransition from "@/components/collapseTransition.vue";
import splitLine from "@/components/splitLine.vue"
import '@/router/guard.js';
import '@/assets/css/index.css';
import '@/assets/css/index_me.css'
import '@/assets/css/media.css';
import '@/assets/css/native.css';
import '@/assets/js/jquery.min.js';
import ClickOutSide from "@/utils/clickOutSide.ts";

const app = createApp(App)


//此处实现自定义懒加载指令，为v-lazy
// app.directive('lazy',{
//     mounted(el,binding){
//         const callBack = binding.value;
//         if (typeof callBack !== 'function') return ;
//         // 进入视口时执行回调
//         const threshold = binding.arg || 0.1
//         const {value} = binding
//         // 类型检查
//         if (!value || typeof value !== 'object'){
//             return console.error('v-lazy requires an object value')
//         }
//         const { stop } = useIntersectionObserver(
//             el,
//             ([{ isIntersecting}]) =>{
//                 if (isIntersecting){
//                     stop();
//                     lazyLoad(value);
//                 }
//             },
//             { threshold : threshold}
//         );
//         // 保存stop函数以便卸载时使用
//         el._lazyStop = stop;
//     },
//     unmounted(el){
//         // 组件卸载时停止观察
//         if (el._lazyStop){
//             el._lazyStop();
//         }
//     }
// });
app.directive('oclick',ClickOutSide)

app.use(router).use(store)
    .component('svg-icon',SvgIcons)
    .component('self-dialog',SelfDialog)
    .component('diyDialog',Dialog)
    .component('col-transition',collapseTransition)
    .component('split',splitLine)
    .mount('#app')

