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
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="请选择出生日期">
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
      <el-button @click="dialogVisible=true" type="primary">+ 新增</el-button>
    </div>
  </div>
</template>
<script>
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
    }
  }
}
</script>
<style></style>
