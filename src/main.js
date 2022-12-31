import Vue from 'vue'
import App from './App.vue'
// import {Row, Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "@/router"; // 引入路由规则
import store from '@/store';
import './api/mock'
import Cookie from "js-cookie";

Vue.config.productionTip = false

// 全局引入
Vue.use(ElementUI)

// 按需引入
// Vue.use(Row)
// Vue.use(Button)


// 添加全局前置导航守卫
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


new Vue({
  //
  router,
  store,
  render: h => h(App),
}).$mount('#app')
