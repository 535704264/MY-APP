<template>
  <!--整个头部区域   -->
  <div class="header-container">
    <!--  头部左边边区域   -->
    <div class="l-content">
      <el-button style="margin-right: 20px" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
      <!--  面包屑区域-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path}">{{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--  头部右边区域   -->
    <div class="r-content">
      <el-dropdown @command="handleClick">
         <span class="el-dropdown-link">
           <img class="user" src="../assets/images/user.png">
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item >个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from "js-cookie";

export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
      if (command==='logout') {
        // 清楚cookie中的token
        Cookie.remove('token')
        // 清除cookie中menu
        Cookie.remove('menu')
        // 跳转登陆页面
        this.$router.push('/login')
        // console.log("执行了location.reload()11")
        // location.reload()
        // console.log("执行了location.reload()")

      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  }
}
</script>
]

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .r-content {
    .user {
      width: 40px;
      border-radius: 50%;

    }
  }

  .l-content {
    display: flex;
    // 上下居中
    align-items: center;

    .el-breadcrumb {
      margin-left: 15px;

      // deep 强制生效
      /deep/ .el-breadcrumb__item {
        .el-breadcrumb__inner {
          &.is-link {
            color: #666;
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            color: #fff;
          }
        }
      }
    }
  }

}

</style>
