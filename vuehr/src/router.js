import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: resolve => require(['@/views/Login'], resolve),
            hidden: true
        }, {
            path: '/home',
            name: 'Home',
            component: resolve => require(['@/views/Home'], resolve),
            hidden: true,
            meta: {
                roles: ['admin', 'user']
            },
            children: [
                {
                    path: '/chat',
                    name: '在线聊天',
                    component: resolve => require(['@/views/chat/FriendChat'], resolve),
                    hidden: true
                }, {
                    path: '/hrinfo',
                    name: '个人中心',
                    component: resolve => require(['@/views/HrInfo'], resolve),
                    hidden: true
                }
            ]
        }, {
            path: '*',
            redirect: '/home'
        }
    ]
})