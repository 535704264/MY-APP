<template>
  <div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <h3>{{ isCollapse ? '麦子' : '麦子商城后台' }}</h3>
      <!--  一级菜单没有子菜单   -->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChild" :key="item.name" :index="item.name">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!--  一级菜单有子菜单   -->
      <el-submenu v-for="item in hasChild" :key="item.label" :index="item.label">
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="subItem in item.children" >
          <!-- 判断二级菜单（没有三级菜单）-->
          <el-menu-item  @click="clickMenu(subItem)" :index="subItem.name" :key="subItem.name" v-if="!subItem.children">
            <i :class="`el-icon-${subItem.icon}`"></i>
            <span slot="title">{{ subItem.label }}</span>
          </el-menu-item>

          <!-- 判断二级菜单（有三级菜单）-->
          <el-submenu :index="subItem.label"  v-if="subItem.children">
            <template slot="title">
              <i :class="`el-icon-${subItem.icon}`"></i>
              <span slot="title">{{ subItem.label }}</span>
            </template>
            <el-menu-item @click="clickMenu(j)" :index="j.label" v-for="j in subItem.children" :key="j.path">
              <i :class="`el-icon-${j.icon}`"></i>
              <span slot="title">{{ j.label }}</span>
            </el-menu-item>
          </el-submenu>
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
      //     path: '/product',
      //     name: 'product',
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
      // 点击打开
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // 点击关闭
      // console.log(key, keyPath);
    },
    // 点击菜单方法
    clickMenu(item) {
      // console.log("当前点击菜单", item)
      // 当页面当路由和跳转的路由不一致才允许跳转
      // this.$route表示当前路由
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
        // $router当前$router实例
        // console.log("当前目标路由", item.path)
        this.$router.push(item.path)
      }
      // 面包屑
      this.$store.commit('selectMenu', item)
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
  width: 200px; // 导航宽度
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
