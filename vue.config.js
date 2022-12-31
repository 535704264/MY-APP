const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  // 解决跨域
  devServer: {
    proxy: {
      'api': {
        target: 'http://localhost:8108',
        changeOrigin: true
      }
    }
  }

})
