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

const app = createApp(App)

app.use(router).use(store).component('svg-icon',SvgIcons).mount('#app')

