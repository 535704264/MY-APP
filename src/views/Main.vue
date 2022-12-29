<template>
  <div>
    <el-container>
      <el-aside width="auto">
     <!--  引用组件，使用小写-方式-->
        <common-aside/>
      </el-aside>
      <el-container>
        <el-header>
          <common-header/>
        </el-header>
        <el-main>
          <!--    路由出口-->
          <!--  匹配到到组件将渲染在这里-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "@/components/CommonAside";
import CommonHeader from "@/components/CommonHeader";
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
