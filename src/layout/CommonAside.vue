<template>
  <div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <h3>{{ isCollapse ? 'Demo':'管理系统Demo'}}</h3>
      <!--  菜单   -->
      <el-menu-item  @click="clickMenu(item)" v-for="item in noChild" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!--  子菜单   -->
      <el-submenu v-for="item in hasChild" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      // isCollapse: false,
      // menuData: [
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: 'MallManage/MallManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/page1',
      //         name: 'page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/page2',
      //         name: 'page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      //
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单方法
    clickMenu(item) {
      // console.log(item)
      // 当页面当路由和跳转的路由不一致才允许跳转
      // this.$route表示当前路由
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        // $router当前$router实例
        this.$router.push(item.path)
      }
      // 面包屑
      this.$store.commit('selectMenu',item)
      //

    }
  },
  computed: {
    // 后端数据过滤
    // 没有子菜单
    noChild() {
      return this.menuData.filter(item => !item.children)
    },
    // 有子菜单
    hasChild() {
      return this.menuData.filter(item => item.children)
    },
    menuData() {
      // 判断当前数据
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    },
    isCollapse() {
      // 菜单折叠
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>


<!--使用less-->
<style lang="less" scoped>
//
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;  // 导航宽度
  min-height: 400px; // 最小高度
}
//
.el-menu {
  height: 100vh; //vh与浏览器高度一致
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
  border-right: none;
}

</style>
