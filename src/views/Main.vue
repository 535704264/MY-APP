<template>
  <div>
    <el-container>
      <el-aside width="200px"><common-aside/></el-aside>
      <el-container>
        <el-header>Header</el-header>
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
// 主路由
export default {
  data() {
    return{}
  },
  components: {
    CommonAside
  }
}
</script>

<style>
</style>
