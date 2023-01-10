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
                                    name: 'platformAttr',
                                    icon: 'files',
                                    label: '平台属性',
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
                                            name: 'BaseAttr',
                                            icon: 'attract',
                                            label: '规格参数',
                                            url: 'product/BaseAttr.vue'
                                        },
                                        {
                                            path: '/product/SaleAttr',
                                            name: 'SaleAttr',
                                            icon: 'attract',
                                            label: '销售属性',
                                            url: 'product/SaleAttr.vue'
                                        },
                                    ]
                                },
                                {
                                    path: '/product/maintain',
                                    name: 'maintain',
                                    icon: 's-flag',
                                    label: '商品维护',
                                    children: [
                                        {
                                            path: '/product/Spu',
                                            name: 'Spu',
                                            icon: 'attract',
                                            label: 'spu管理',
                                            url: 'product/Spu.vue'
                                        },
                                        {
                                            path: '/product/SpuAdd',
                                            name: 'Publish',
                                            icon: 'attract',
                                            label: '发布商品',
                                            url: 'product/SpuAdd.vue'
                                        },
                                        {
                                            path: '/product/Manager',
                                            name: 'Manager',
                                            icon: 'attract',
                                            label: '商品管理',
                                            url: 'product/Manager.vue'
                                        },

                                    ]
                                },
                            ]
                        },
                        {
                            name: 'ware',
                            label: '库存系统',
                            icon: 's-custom',
                            children: [
                                {
                                    path: '/ware/WareInfo',
                                    name: 'WareInfo',
                                    icon: 'attract',
                                    label: '仓库维护',
                                    url: 'ware/WareInfo.vue'
                                },
                                {
                                    path: '/ware/Sku',
                                    name: 'wareSku',
                                    icon: 'attract',
                                    label: '商品库存',
                                    url: 'ware/Sku.vue'
                                },
                                {
                                    name: 'Purchase',
                                    icon: 'attract',
                                    label: '采购单维护',
                                    children: [
                                        {
                                            path: '/ware/Purchase',
                                            name: 'Purchase',
                                            icon: 'attract',
                                            label: '采购需求',
                                            url: 'ware/Purchase.vue'
                                        }
                                    ]
                                },


                            ]
                        },
                        {
                            name: 'member',
                            label: '用户系统',
                            icon: 's-custom',
                            children: [
                                // {
                                //     path: '/member/list',
                                //     name: 'MemberList',
                                //     icon: 'crop',
                                //     label: '会员列表',
                                //     url: 'member/list.vue'
                                // },
                                {
                                    path: '/member/Level',
                                    name: 'MemberLevel',
                                    icon: 'medal',
                                    label: '会员等级',
                                    url: 'member/Level.vue'
                                },
                                // {
                                //     path: '/member/change',
                                //     name: 'MemberChange',
                                //     icon: 'heavy-rain',
                                //     label: '积分变化',
                                //     url: 'member/change.vue'
                                // },{
                                //     path: '/member/stat',
                                //     name: 'MemberStat',
                                //     icon: 'files',
                                //     label: '统计信息',
                                //     url: 'member/stat.vue'
                                // },
                            ]
                        },
                        {
                            path: '/user',
                            name: 'user',
                            label: '用户管理DEMO',
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
