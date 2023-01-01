import http from '../utils/request'
// import axios from "axios";
// import Vue from 'vue'

// 请求首页数据
// vue->mockjs 定义获取的方法
export const getData = () => {
    // 返回一个promise对象
    return http.get('/home/gateData')
}

// 下面四个:用户管理-后端-网络请求接口
export const getUser = (params) => {
    // 全称地址为/api/user/get
    // todo 需要去掉前缀 /api/user/get 改为   /auth/user/get
    // http.defaults.baseURL = '/auth'
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

export const getMenu = (data) => {
    return http.post('/permission/getMenu/', data)
}



export const getMallCategory = (params) => {
    return http.get('/mall/category/list/tree',params)
}

export const removeMallCategory = (params) => {
    return http.post('/mall/category/delete',params)
}


export const addMallCategory = (data) => {
    return http.post('/mall/category/save',data)
}


export const findMallCategory = (id) => {
    return http.get(`/mall/category/info/${id}`)
}

export const editMallCategory = (data) => {
    return http.post('/mall/category/update',data)
}

export const sortMallCategory = (data) => {
    return http.post('/mall/category/update/sort',data)
}

