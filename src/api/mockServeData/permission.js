import Mock from 'mockjs'
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if (username === 'admin' && password === '1') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/Home.vue'
                        },
                        {
                            // path: '/product',
                            name: 'product',
                            label: '商品系统',
                            icon: 'goods',
                            // url: 'product/Mall.vue',
                            children: [
                                {
                                    path: '/product/category',
                                    name: 'category',
                                    icon: 'files',
                                    label: '分类维护',
                                    url: 'product/Category.vue',
                                },
                                {
                                    path: '/product/brand',
                                    name: 'brand',
                                    icon: 's-flag',
                                    label: '品牌管理',
                                    url: 'product/Brand.vue'
                                },
                                {
                                    // todo 有子菜单去掉 path和url
                                    path: '/product/platformAttr',
                                    name: 'platformAttr',
                                    icon: 'files',
                                    label: '平台属性',
                                    url: 'product/Attrgroup.vue',
                                    children: [
                                        {
                                            path: '/product/Attrgroup',
                                            name: 'Attrgroup',
                                            icon: 'attract',
                                            label: '属性分组',
                                            url: 'product/Attrgroup.vue'
                                        },
                                        {
                                            path: '/product/BaseAttr',
                                            name: 'Attrgroup',
                                            icon: 'attract',
                                            label: '规格参数',
                                            url: 'product/BaseAttr.vue'
                                        },
                                    ]
                                },
                            ]
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理',
                            icon: 'user',
                            url: 'user/User.vue'
                        },
                        {
                            label: '其他',
                            icon: 'location',
                            children: [
                                {
                                    path: '/page1',
                                    name: 'page1',
                                    label: '页面1',
                                    icon: 'setting',
                                    url: 'pageOne/PageOne.vue',
                                    children: [
                                        {
                                            path: '/page1-2',
                                            name: 'page1-2',
                                            label: '页面1-2',
                                            icon: 'setting',
                                            url: 'pageTwo/PageTwo.vue'
                                        }
                                    ]
                                },
                                {
                                    path: '/page2',
                                    name: 'page2',
                                    label: '页面2',
                                    icon: 'setting',
                                    url: 'pageTwo/PageTwo.vue'
                                }
                            ]
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === '1') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                            url: 'home/Home.vue'
                        },
                        {
                            path: '/product',
                            name: 'product',
                            label: '商品管理',
                            icon: 'video-play',
                            url: 'mall/Mall.vue'
                        }
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }

    }
}
