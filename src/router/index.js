import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Main from '../views/Main.vue';
import Mall from '../views/Mall.vue';
import pageOne from "../views/PageOne.vue";
import pageTwo from "../views/PageTwo.vue";


// 1、创建路由组件
// 2、将路由与组件进行映射
// 3、创建Router实例

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {path: 'home', component: Home}, // 首页
            {path: 'user', component: User}, // 用户管理
            {path: 'mall', component: Mall},  // 商品管理
            {path: 'page1', component: pageOne}, // 页面1
            {path: 'page2', component: pageTwo}  // 页面2
        ]
    }
]

const router = new VueRouter(
    {routes} // (缩写) 相当于routes: routes
)

export  default router

Vue.use(VueRouter)
