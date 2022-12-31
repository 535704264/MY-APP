<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <!-- user卡片 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/images/user.png">
          <div class="user-info">
            <p class="name">{{userName}}</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2022-12-29</span></p>
          <p>上次登陆地点：<span>广州</span></p>
        </div>
      </el-card>
      <!-- table卡片 -->
      <el-card style="margin-top: 20px;height: 455px;">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%">
          <el-table-column v-for="(val, key) in tableLabel" :prop="key" :label="val"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="price">¥ {{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 290px">
        <!--   折线图-->
          <div ref="echarts1" style="height: 290px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 250px">
          <div ref="echarts2" style="height:250px"></div>
        </el-card>
        <el-card style="height: 250px">
          <div ref="echarts3" style="height:250px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// 取 mockjs 中的数据
import {getData} from '../../api'
// 引入echarts
import * as echarts from 'echarts'
import Cookie from "js-cookie";

export default {
  data() {
    return {
      userName: 'Admin',
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: []
    }
  },
  methods: {
    // 异步获取mock数据（后端数据）
    async  getMockCountData() {
      try {
        const result = await getData();
        //console.log(result.data.data.countData);
        this.countData = result.data.data.countData;
      }catch (error) {
        console.log(error)
      }
    },
    async setEchartsGraphData() {
      try {
        const result = await getData()
        //console.log(result.data.data.orderData)
        // this.orderData = result.data.data.orderData
        // console.log(result.data.data.orderData)

        // -----
        // 基于准备好的dom，初始化echarts实例
        const echarts1 = echarts.init(this.$refs.echarts1)
        const echarts1Option = {}
        // var option = {}
        // 处理数据xAxis
        const { orderData, userData, videoData} = result.data.data
        const xAxis = Object.keys(orderData.data[0])
        const xAxisData = {
          data: xAxis
        }
        echarts1Option.xAxis = xAxisData
        echarts1Option.yAxis = {}
        echarts1Option.legend = xAxisData
        echarts1Option.series = []
        xAxis.forEach(key=>{
          echarts1Option.series.push({
            name: key,
            data: orderData.data.map(item=>item[key]),
            type: 'line'
          })
        })
        // console.log(echarts1Option)
        echarts1.setOption(echarts1Option)


        //
        // 柱状图
        // 柱状图
        const echarts2 = echarts.init(this.$refs.echarts2)
        var echarts2Option = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: [],
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [],
        }

        // 配置
        echarts2Option.xAxis.data = userData.map(item => item.date)
        echarts2Option.series = [
          {
            name: '新增用户',
            data: userData.map(item => item.new),
            // 类型:bar是柱状图
            type:'bar'
          }
          ,
          {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type:'bar'
          }
        ]
        echarts2.setOption(echarts2Option);



        // 饼状图
        const echarts3 = echarts.init(this.$refs.echarts3)
        var echarts3Option = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [],
        }
        echarts3Option.series = {
          data: videoData,
          type: 'pie'
        }
        echarts3.setOption(echarts3Option);



      }catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    // 获取后端请求数据
    // 方式一：
    getData().then((data) => {
      const {tableData} = data.data.data
      // console.log(tableData)
      this.tableData  =tableData;
    })
    // 方式二：
    // methods中的定义
    this.getMockCountData()

    // 设置折线图数据
    this.setEchartsGraphData()

    // 取cookies中的用户姓名
    this.userName = Cookie.get('user')

  }
}
</script>

<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }


}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}

</style>
