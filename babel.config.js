module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',["@babel/preset-env", { "modules": false }]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
  compact: false // 解决某个js文件的大小超过限制
}
