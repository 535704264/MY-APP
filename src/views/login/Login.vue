<template>
  <div>
    <el-form  class="login_container"  :model="login" status-icon :rules="rules" ref="login" label-width="70px">
      <!-- h3要放在里面:只能有一个根,且title也是表单的一部分 -->
      <h3 class="login_title">用户登录</h3>
      <!-- prop对应rules里的键 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="login.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="login.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" style="margin-left:40px;margin-top:9px">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'

import {getMenu} from '../../api/'


export default {
  data() {
    return {
      // 登陆数据
      login: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [{required: 'true', message: '请输入用户名', trigger: 'blur'}],
        password: [{required: 'true', message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submit() {
      // 示例Demo
      // 登陆
      // 获取token信息
      // const token = Mock.Random.guid()
      // // token 放在cookie中, 用于不通页面通讯
      // Cookie.set('token', token)
      // 跳转到系统的首页
      // this.$router.push('/home')


      // 生产
      // form 表单校验通过
      this.$refs.login.validate((valid)=>{
        //console.log(valid, 'valid')
        if (valid) {
          // 获取菜单
          getMenu(this.login).then(({data})=>{
            console.log(data)
            if(data.code===20000){
              // 记录cookie
              Cookie.set('token',data.data.token)
              // 跳转到首页
              this.$router.push('/home')
            } else {
              // 验证失败的弹窗
              this.$message.error(data.data.message);
            }
          }

          )
        }
      })


    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  width: 350px;
  border: 1px solid #eaeaea;

  // 居中
  margin: 180px auto;
  padding: 35px 35px 15px 35px;

  // 让padding在width里面
  box-sizing: border-box;

  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;

  .login_title {
    color: #505458;
    // 左右居中
    text-align: center;
    margin-bottom: 40px;
  }

  .el-input {
    width: 198px;
  }
}

</style>
