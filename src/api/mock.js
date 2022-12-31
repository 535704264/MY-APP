import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 定义mock 请求拦截
Mock.mock('/api/home/gateData', homeApi.getStatisticalData())

// 用户列表的请求数据拦截(增删改查)
// 如果不走mock就注释
Mock.mock(/\/api\/user\/get/,user.getUserList)


Mock.mock('/api/user/add','post',user.addUser)
Mock.mock('/api/user/update','post',user.updateUser)
Mock.mock('/api/user/del','post',user.deleteUser)

// 权限
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)


