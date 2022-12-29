import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'

// 1、创建路由组件
// 2、将路由与组件进行映射
// 3、创建Router实例

const routes = [
    {
        path: '/',
        component: Main,
        children: [
            {path: 'home', component: Home},
            {path: 'user', component: User}
        ]
    }
]

const router = new VueRouter(
    {routes} // (缩写) 相当于routes: routes
)

export  default router

Vue.use(VueRouter)
