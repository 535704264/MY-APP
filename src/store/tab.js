export default {
    state: {
        isCollapse: false // 控制菜单的展开还是收起
    },
    mutations: {
        // 修改菜单展开还是收起
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        }
    }
}
