# my-app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```


### 学习资料
1、https://www.bilibili.com/video/BV1QU4y1E7qo?p=9&vd_source=a41cd2a53e509e4e0f74559bf48d2468
2、https://blog.csdn.net/karshey/article/details/127652862
3、https://www.bilibili.com/video/BV1rK4y1C7fv?p=60&vd_source=a41cd2a53e509e4e0f74559bf48d2468

### 
```vue
页面布局跳转
访问/ -> 路由 router/index.js -> 引入组件 Main.vue == 包含主体布局， 左布局+右布局（上+下）
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 遗留问题记录
1、A用户登出，再次登陆会报路由重复
2、A用户登出，B用户登入还保留着A用户的面包屑
3、改为三级菜单后，定义的二级菜单url和path去不掉，面包屑层级也不对
