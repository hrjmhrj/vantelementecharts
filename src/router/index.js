import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/voicerai',
    component: (resolve) => require(['@/components/VoiceAi'], resolve),
    name: 'VoiceAi',
    //meta: {title: '语音识别', noCache: true, affix: true},
  },
  {
    path: '/map',
    component: (resolve) => require(['@/components/Map.vue'], resolve),
    name: 'Map',
  },
  {
    path: '/table',
    component: (resolve) => require(['@/views/ELTable.vue'], resolve),
    name: 'table',
  },
  {
    path: '/editor',
    component: (resolve) => require(['@/views/VanEditors.vue'], resolve),
    name: 'editor',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/qyzndsspvue/',
  routes
})

// 解决路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
