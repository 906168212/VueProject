import {createRouter, createWebHistory} from "vue-router";
const routes = [
    {
      path: '',
      redirect: 'login'
    },
    {
        path: '/login',
        name: 'welcome',
        component: ()=> import('@/views/LoginView.vue'),
        children: [],
    },{
        path:'/register',
        name:'register',
        component:() => import('@/views/RegisterView.vue'),
        children:[],
    },{
        path:'/index',
        name:'index',
        component:()=>  import('@/views/IndexView.vue'),
        children:[],
        meta:{requiresAuth: true}
    },{
        path:'/forget',
        name:'forget',
        component:() => import('@/views/ResetPasswordView.vue'),
        children:[
            {
                path:'',
                name:'resetPassword',
                component:() => import('@/views/forget/ResetPassword_AccountPage.vue'),
            },
            {
                path:'identify',
                name:'resetPassword-identify',
                component:() => import('@/views/forget/ResetPassword_IdentifyOptionsPage.vue'),
            },{
                path:'identify/email',
                name:'resetPassword-identify-email',
                component:() => import('@/views/forget/ResetPassword_EmailPage.vue'),
            },{
                path: 'identify/dataAssist',
                name: 'resetPassword-identify-dataAssist',
                component:()=>import('@/views/forget/ResetPassword_DataAssistedPage.vue'),
            },{
                path: 'reset',
                name: 'resetPassword-reset',
                component:()=>import('@/views/forget/ResetPassword_resetPage.vue'),
            }
        ]
    },{
        path: '/game',
        name: 'game',
        component: ()=> import('@/views/GameView.vue'),
        children: [
            {
                path: '',
                name:'game_index',
                component:()=>import('@/views/game/game_main_index.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_index'
                    }
                }
            },
            {
                path: 'pc',
                name:'game_pc',
                component:()=>import('@/views/game/game_main_common.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_pc'
                    }
                }
            },
            {
                path: 'simulator',
                name:'game_simulator',
                component:()=>import('@/views/game/game_main_common.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_simulator'
                    }
                }
            },
            {
                path: 'best',
                name:'game_best',
                component:()=>import('@/views/game/game_main_common.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_best'
                    }
                }
            },
            {
                path: 'phone',
                name:'game_phone',
                component:()=>import('@/views/game/game_main_common.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_phone'
                    }
                }
            },{
                path: 'plug',
                name:'game_plug',
                component:()=>import('@/views/game/game_main_common.vue'),
                meta:{
                    requiresAuth: true,
                    data:{
                        name:'game_plug'
                    }
                }
            }
        ],
        meta:{requiresAuth: true}
    },
    {
        path:'/test',
        name:'test',
        component:()=>import('@/views/testVue.vue')
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


export default router


