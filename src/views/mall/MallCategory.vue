<template>
  <div>
    <el-tree
        :data="menus"
        :props="defaultProps"
        @node-click	="handleNodeClick"
    >
    </el-tree>

  </div>
</template>

<script>
// 获取后端数据定义
import {getMallCategory} from '../../api'
export default {
  data(){
    return {
      menus: [],
      defaultProps: {
        children: "children",
        label:"name"
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      // 点击节点时后触发
      console.log(data)
    },
    getMenus(){
      getMallCategory({params: {}}).then(({data})=>{
        // console.log(data)
        // 打印完整返回str
        // console.log(JSON.stringify(data))
        // 渲染数据
        this.menus = data.data
      })

    }
  },
  mounted() {
    // 挂载数据
    this.getMenus()
  }
}
</script>

<style lang="less" scoped>

</style>
