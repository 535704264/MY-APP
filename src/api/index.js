import http from '../utils/request'
// import axios from "axios";
// import Vue from 'vue'

// 请求首页数据，登录相关
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
    // permission.js 下的getMenu
    // 此时请求的是Mock数据，非真实数据
    return http.post('/permission/getMenu/', data)
}


export const getProductCategory = (params) => {
    return http.get('/product/category/list/tree',params)
}

export const removeProductCategory = (params) => {
    return http.post('/product/category/delete',params)
}


export const addProductCategory = (data) => {
    return http.post('/product/category/save',data)
}


export const findProductCategory = (id) => {
    return http.get(`/product/category/info/${id}`)
}

export const editProductCategory = (data) => {
    return http.post('/product/category/update',data)
}

export const sortProductCategory = (data) => {
    return http.post('/product/category/update/sort',data)
}

