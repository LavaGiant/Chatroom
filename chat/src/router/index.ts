import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import store from '@/store/index'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录' as string
    }
  },
  {
    path: '/',
    component: () => import('@/views/layout/TabBar.vue'),
    meta: {
      title: ''
    },
    children: [
      {
        path: '/message',
        name: 'Message',
        component: () => import('@/views/message/Message.vue'),
        meta: {
          keepAlive: true as boolean,
          title: '消息' as string
        }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/Profile.vue'),
        meta: {
          title: '我的' as string
        }
      },
      {
        path: '/friends',
        name: 'Friends',
        component: () => import('@/views/friends/Friends.vue'),
        meta: {
          title: '好友' as string
        }
      },
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('@/views/404/404.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
  ) => {
    if(Object.keys(store.state.myInfo).length === 0){
      if(to.path === '/login'){
        // @ts-ignore
        document.title = to.meta.title
        return true
      }else{
        return '/login'
      }
    }else{
      // @ts-ignore
      document.title = to.meta.title
      return true
    }
    // if(!store.state.myInfo) {
    //   // @ts-ignore
    //   document.title = to.meta.title
    //   return true
    // }else{
    //   return false
    // }
  }
)

export default router