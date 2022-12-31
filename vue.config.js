const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  // 解决跨域
  devServer: {
    proxy: {
      'api': {
        target: 'http://localhost:8888',  // 后端网关地址
        changeOrigin: true
      }
    }
  }

})
