import {createRouter, createWebHistory} from "vue-router";
const routes = [
    {
        path: '/',
        redirect: '/login',
        name: 'welcome',
        component: ()=> import('@/views/welcomeView.vue'),
        children: [
            {
                path: 'login',
                name: 'welcome_login',
                component:()=>import('@/views/login/login_form.vue'),
            },
            {
                path: 'register',
                name: 'welcome_register',
                component:()=>import('@/views/register/register_form.vue'),
            },
            {

                path: 'forget',
                name : 'welcome_forget',
                component:()=>import('@/views/forget/ResetPassword_AccountPage.vue'),
                children : {

                }
            }
        ]
    },
    {
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
    },
    {
        path:'/contribute',
        redirect: '/contribute/send',
        name:'contribute',
        component:() => import('@/views/ContributeView.vue'),
        children: [
            {
                path:'send',
                name:'contribute-send',
                component:() => import('@/views/contribute/contribute_send.vue'),
                meta:{requiresAuth: true}
            },
            {
                path:'index',
                name:'contribute-index',
                component:() => import('@/views/contribute/contribute_index.vue'),
                meta:{requiresAuth: true}
            },
            {
                path: 'manage',
                redirect:'/contribute/manage/sent',
                name:'contribute-manage',
                meta:{requiresAuth: true},
            },
            {
                path: 'manage/sent',
                name:'contribute-manage-sent',
                component:() => import('@/views/contribute/contribute_article_manage.vue'),
                meta:{requiresAuth: true}
            },
            {
                path: 'manage/sketch',
                name:'contribute-manage-sketch',
                component:() => import('@/views/contribute/contribute_sketch.vue'),
                meta:{requiresAuth: true}
            },
            {
                path: 'convention',
                name:'contribute-convention',
                component:() => import('@/views/contribute/contribute_convention.vue'),
                meta:{requiresAuth: true}
            }
        ],
        meta:{requiresAuth: true}
    },
    {
        path:'/preview',
        name:'preview',
        meta:{requiresAuth: true},
        component:()=> import('@/views/ArticlePreview.vue'),
    }
]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


export default router


