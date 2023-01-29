import Vue from 'vue'
import App from './App.vue'
// import {Row, Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import createRouter from "@/router"; // 引入路由规则
import store from '@/store';
// 后端请求，注释mock
import './api/mock'
import Cookie from "js-cookie";
//
import http from "@/utils/request";

import PubSub from "pubsub-js"

Vue.config.productionTip = false

// 全局引入
Vue.use(ElementUI)

// 挂载全局 // ajax请求方法
Vue.prototype.$http = http // ajax请求方法
// 全局引用PubSub
Vue.prototype.PubSub = PubSub


// 按需引入
// Vue.use(Row)
// Vue.use(Button)


// 添加全局前置导航守卫
const router = createRouter()
router.beforeEach((to, from ,next) => {
  // 判断Cookie是否存在token
  const token = Cookie.get('token');
  // 如果token不存在， 说明当前用户是未登陆，应该跳转至登陆页
  if (!token &&  to.name !== 'login') {
    next({name:"login"})
  } else if (token && to.name === 'login') {
    // token 存在， 说明用户登陆， 此时跳转首页
    next({name:"home"})
  } else {
    next()
  }
})

// 定义一个resetRouter 方法，在退出登录时，调用即可
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

Vue.prototype.resetRouter = resetRouter


new Vue({
  //
  router,
  store,
  render: h => h(App),
  created() {store.commit('addMenu',router)
  }
}).$mount('#app')
