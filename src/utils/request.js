import axios from 'axios'
import merge from 'lodash/merge'
import qs from 'qs'


const http = axios.create({
    // 通用请求的地址前缀
    baseURL: '/api',
    timeout: 10000, // 10s,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
})

// 添加请求拦截器
axios.interceptors.request.use(function (req) {
    // 在发送请求之前做些什么
    const headers = req.headers;
    console.log(headers)
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + 'token XXXXX'

    return req;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (req) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么


    return req;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});




/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    //
    return  actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}




export default http
