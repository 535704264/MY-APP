import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'

// 定义mock 请求拦截
Mock.mock('/api/home/gateData', homeApi.getStatisticalData())

// 用户列表的请求数据拦截(增删改查)
Mock.mock(/\/api\/user\/get/,user.getUserList)
Mock.mock('/api/user/add','post',user.addUser)
Mock.mock('/api/user/update','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)
