import Mock from 'mockjs'
import homeApi from './mockServeData/home'

// 定义mock 请求拦截
Mock.mock('/api/home/gateData', homeApi.getStatisticalData())
