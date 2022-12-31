import Vue from 'vue'
import VueRouter from "vue-router";
import Home from '../views/home/Home.vue';
import User from '../views/user/User.vue';
import Main from '../views/Main.vue';
import Mall from '../views/mall/Mall.vue';
import PageOne from "../views/pageOne/PageOne.vue";
import PageTwo from "../views/pageTwo/PageTwo.vue";
import Login from "../views/login/Login.vue";



// 1、创建路由组件
// 2、将路由与组件进行映射
// 3、创建Router实例

const routes = [
    {
        path: '/',
        component: Main, // 根路径页面
        name: 'Main',
        redirect: '/home',
        // children: [
        //     {path: 'home', name: 'home', component: Home}, // 首页
        //     {path: 'user', name: 'user', component: User}, // 用户管理
        //     {path: 'mall',  name: 'mall',component: Mall},  // 商品管理
        //     {path: 'page1', name: 'page1',component: PageOne}, // 页面1
        //     {   path: 'page2', name: 'page2', component: PageTwo},  // 页面2
        // ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
]

const router = new VueRouter(
    {routes} // (缩写) 相当于routes: routes
)

export  default router

Vue.use(VueRouter)

// 解决点击路由重复控制台报错问题
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
