<template>
  <div>
    <el-tree
        show-checkbox
        node-key="catId"
        :data="menus"
        :props="defaultProps"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedKey"
        :draggable="true"
        :allow-drop="allowDrop">

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
              type="text"
              size="mini"
              @click="() => edit(data)">
            Edit
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

    <el-dialog v-bind:title="title" :visible.sync="dialogFormVisible" width="30%" :close-on-click-modal="false">
      <el-form  :model="category" >
        <el-form-item label="分类名称">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form  :model="category" >
        <el-form-item label="图标">
          <el-input v-model="category.icon" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form  :model="category" >
        <el-form-item label="计量单位">
          <el-input v-model="category.productUnit" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 获取后端数据定义
import {addMallCategory, editMallCategory, findMallCategory, getMallCategory, removeMallCategory} from '../../api'

export default {
  data() {
    return {
      maxLevel: 0,
      title:"",
      dialogFormVisible: false,
      menus: [],
      expandedKey: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      dialogType:"", //edit, add
      category:{name: "",
        parentCid: 0,
        catLevel: 0,
        showStatus: 1,
        sort: 0,
        productUnit: "",
        icon: "",
        catId: null}
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
      this.dialogFormVisible = true;
      this.dialogType = "add";
      this.title = "添加分类";
      this.dialogVisible = true;
      this.category.parentCid = data.catId;
      this.category.catLevel = data.catLevel * 1 + 1;
      this.category.catId = null;
      this.category.name = "";
      this.category.icon = "";
      this.category.productUnit = "";
      this.category.sort = 0;
      this.category.showStatus = 1;
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
    },
    //  添加三级分类
    addCategory() {
      // 提交三级表单分类数据
      console.log("提交三级表单分类数据", this.category)
      addMallCategory(this.category).then(()=>{
        this.$message({
          type: 'success',
          message: '菜单保存成功!'
        });
        // 关闭对话框
        this.dialogFormVisible = false;
        // 刷新菜单
        this.getMenus();
        // 设置默认需要展开的菜单
        this.expandedKey = [this.category.parentCid]
      })
    },
    // 修改三级分类数据
    editCategory() {
      // 修改部分数据
      var {catId,name,icon, productUnit} = this.category;
      var data = {catId: catId, name: name, icon: icon, productUnit: productUnit}
      // 修改全量数据
      // var data = this.category
      editMallCategory(data).then((data)=>{
        console.log(data)
        this.$message({
          type: 'success',
          message: '菜单修改成功!'
        });
        // 关闭对话框
        this.dialogFormVisible = false;
        // 刷新菜单
        this.getMenus();
        // 设置默认需要展开的菜单
        this.expandedKey = [this.category.parentCid]
      })
    },
    edit(data){
      console.log("修改分类数据", data)
      this.title = "修改分类";
      this.dialogType = "edit"
      this.dialogFormVisible = true

      // 发送请求获取当前节点最新数据
      findMallCategory(data.catId).then((_data)=>{
        console.log(_data)
        this.category.name = _data.data.data.name
        this.category.catId = _data.data.data.catId
        this.category.icon = _data.data.data.icon
        this.category.productUnit = _data.data.data.productUnit
        this.category.parentCid = _data.data.data.parentCid
        this.category.catLevel = _data.data.data.parentCid
        this.category.showStatus = _data.data.data.showStatus
        this.category.sort = _data.data.data.sort
        // this.$message({
        //   type: 'success',
        //   message: '菜单保存成功!'
        // });
        // // 关闭对话框
        // this.dialogFormVisible = false;
        // // 刷新菜单
        // this.getMenus();
        // // 设置默认需要展开的菜单
        // this.expandedKey = [this.category.parentCid]
      })

    },
    submitData(){
      if (this.dialogType =="add") {
        this.addCategory()
      } else if (this.dialogType == "edit") {
        this.editCategory()
      }
    },
    countNodeLevel(node){
      //找到所有子节点，求出最大深度
      if (node.childNodes != null && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          if (node.childNodes[i].level > this.maxLevel) {
            this.maxLevel = node.childNodes[i].level;
          }
          this.countNodeLevel(node.childNodes[i]);
        }
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      //1、被拖动的当前节点以及所在的父节点总层数不能大于3

      //1）、被拖动的当前节点总层数
      console.log("allowDrop:", draggingNode, dropNode, type);
      //
      this.countNodeLevel(draggingNode);
      //当前正在拖动的节点+父节点所在的深度不大于3即可
      let deep = Math.abs(this.maxLevel - draggingNode.level) + 1;
      console.log("深度：", deep);

      //   this.maxLevel
      if (type == "inner") {
        // console.log(
        //   `this.maxLevel：${this.maxLevel}；draggingNode.data.catLevel：${draggingNode.data.catLevel}；dropNode.level：${dropNode.level}`
        // );
        return deep + dropNode.level <= 3;
      } else {
        return deep + dropNode.parent.level <= 3;
      }
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
