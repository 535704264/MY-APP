<template>
  <div class="tabs">
    <el-tag
        v-for="(item, index) in tags"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' :'plain'"
        @click="changeMenu(item)"
        @close="handleClose(item, index)"
    size="small">
      {{item.label}}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  mounted() {
    // console.log(this.$route, this.tags)
    // 点击tag跳转

  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMenu(item) {
      // console.log(item)
      this.$router.push({name: item.name})
    },
    handleClose(item,index) {
      // console.log(item, index)
      // 调用store 中的mutations
      this.closeTag(item)
      const length = this.tags.length
      // 删除之后的跳转逻辑
      if(item.name !== this.$route.name) {
        return
      }
      // 表示删除的是最后一项
      if (index === length) {
        this.$router.push({
          name: this.tags[index-1].name
        })
      } else {
        // 如果删除的是中间位置的
        this.$router.push({
          name: this.tags[index].name
        })
      }


    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
      margin-right: 15px;
    cursor: pointer;
  }
}
</style>
