<template>
  <!-- 主页面框架  -->
  <div>
    <el-container>
        <!--  左导航区域     -->
      <el-aside width="auto">
        <!--  引用组件，使用小写-方式-->
        <common-aside/>
      </el-aside>

      <!--  右边主体区域  -->
      <el-container>
         <!-- 右头部 -->
        <el-header>
          <common-header/>
        </el-header>
        <!-- 右主体（路由动态）   -->
        <el-main>
          <!--  路由出口， 匹配到到组件将渲染在这里-->
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/layout/CommonAside";
import CommonHeader from "@/layout/CommonHeader";
// 主路由
export default {
  data() {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
