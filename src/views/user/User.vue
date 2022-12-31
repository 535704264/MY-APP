<template>
  <div class="manage">
    <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
       <!--   用户表单信息  -->
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="请选择出生日期"
              value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="summit">确 定</el-button>
      </span>
    </el-dialog>
    <!--  新增按钮   -->
    <div class="manage-header">
      <el-button @click="handleAdd()" type="primary">+ 新增</el-button>
      <!---form搜索区域-->
      <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
     <!--    表格-->
    <div class="common-table">
      <el-table
          stripe
          height="90%"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="name"
            label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column prop="oper" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :total="total"
           @current-change="handlePage">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>

import {getUser, addUser, updateUser, deleteUser} from '../../api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        form: {
          name:'',
          age:'',
          sex:'',
          birth:'',
          addr:''
        }
        },
      rules: {
        name: [
          { required: true, message: '请输入姓名' }
        ],
        age:[
          { required: true, message: '请输入年龄' }
        ],
        sex:[
          { required: true, message: '请输入性别' }
        ],
        birth:[
          { required: true, message: '请输入出生日期' }
        ],
        addr:[
          { required: true, message: '请填写地址' }
        ]
      },
      tableData:[],
      modalType: 0, // 0 表示新增， 1表示编辑,
      total: 0, // 当前总条数
      pageData: {
        page: 1,
        limit: 10
      },
      userForm: {
        name: ''
      }
    }
  },
  methods:{
    summit() {
      // 提交用户表单
      this.$refs.form.validate((valid)=>{
        //console.log(valid, 'valid')
        if (valid){
          // 后续对表单对处理
          if(this.modalType === 0) {
            // 新增
            addUser(this.form).then(()=>{
              // 重新获取列表接口
              this.getList();
            })
          } else {
            // 新增
            updateUser(this.form).then(()=>{
              // 重新获取列表接口
              this.getList();
            })
          }

          // console.log(this.form, 'form')
          // 清空表单数据
          this.$refs.form.resetFields()
          // 成功关闭弹窗，form数据清空
          this.dialogVisible = false
        }
      })
    },
    // 关闭弹窗时的处理
    handleClose(){
      // console.log(this.$refs.form)
      // 清空表单数据
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    cancel() {
      this.handleClose()
    },
    getList() {
      // 获取列表数据
      getUser({params: {...this.userForm, ...this.pageData}}).then(({data})=>{
        // console.log(data)
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({id: row.id}).then(()=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 重新获取列表
          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleEdit(row){
      this.modalType = 1
      this.dialogVisible = true
      // 需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleAdd() {
      this.modalType = 0
      this.dialogVisible = true
    },
    // 选择页码对回调函数
    handlePage(val){
      // console.log(val)
      this.pageData.page = val
      this.getList()
    },
    // 列表查询
    onSubmit() {
      this.getList()
    }


  },
  mounted() {
    // 获取列表数据
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage{
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: calc(100% - 60px);
    .pager {
      position: absolute;
      bottom: 0px;
      right: 20px;
    }
  }
}

</style>
