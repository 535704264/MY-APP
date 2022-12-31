import http from '../utils/request'

// 请求首页数据
// vue->mockjs 定义获取的方法
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/gateData')
}

// 下面四个:用户管理-后端-网络请求接口
export const getUser = (params) => {
    return http.get('/user/get/', params)
}

export const addUser = (data) => {
    return http.post('/user/add', data)
}

export const deleteUser = (data) => {
    return http.post('/user/del', data)
}

export const updateUser = (data) => {
    return http.post('/user/update', data)
}
