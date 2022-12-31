<template>
  <div>
    <el-tree
        show-checkbox
        node-key="catId"
        :data="menus"
        :props="defaultProps"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKey">

      <!-- 新增/删除节点-->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
              v-if="node.level <=2"
              type="text"
              size="mini"
              @click="() => append(data)">
            Append
          </el-button>
          <el-button
              v-if="node.childNodes.length==0"
              type="text"
              size="mini"
              @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>

  </div>
</template>

<script>
// 获取后端数据定义
import {getMallCategory, removeMallCategory} from '../../api'

export default {
  data() {
    return {
      menus: [],
      expandedKey: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    }
  },
  methods: {

    getMenus() {
      getMallCategory({params: {}}).then(({data}) => {
        // console.log(data)
        // 打印完整返回str
        // console.log(JSON.stringify(data))
        // 渲染数据
        this.menus = data.data
      })
    },
    append(data) {
      console.log("append", data)
    },

    remove(node, data) {
      this.$confirm(`是否删除当前【${data.name}】菜单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //
        var ids = [data.catId]
        removeMallCategory(ids).then(({data}) => {
          console.log(data)
          this.$message({
            type: 'success',
            message: '菜单删除成功!'
          });

          // 刷新菜单
          this.getMenus();
          // 设置默认需要展开的菜单
          this.expandedKey = [node.parent.data.catId]
        })

      }).catch(() => {
      });
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
