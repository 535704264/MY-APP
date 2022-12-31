import Cookie from "js-cookie";
export default {
    state: {
        isCollapse: false, // 控制菜单的展开还是收起
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],//面包屑的数据:点了哪个路由,首页是一定有的
        menu: []

    },
    mutations: {
        // 修改菜单展开还是收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑的数据
        selectMenu(state, item) {
            // 如果点击的不在面包屑数据中,则添加
            const index = state.tabList.findIndex(val => val.name === item.name)
            if (index === -1) {
                state.tabList.push(item)
            }
        },
        // 点击tag删除功能
        closeTag(state, item) {
            const index = state.tabList.findIndex(val=>val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置menu的数据
        setMenu(state, val) {
            this.menu = val
            Cookie.set('menu', JSON.stringify(val))
        }
    }
}
