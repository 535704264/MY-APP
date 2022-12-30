<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <!-- user卡片 -->
      <el-card class="box-card">
        <div class="user">
          <img src="../../assets/images/user.png">
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2022-12-29</span></p>
          <p>上次登陆地点：<span>广州</span></p>
        </div>
      </el-card>
      <!-- table卡片 -->
      <el-card style="margin-top: 20px;height: 350px;">
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
      <el-card style="height: 235px">
        <!--   折线图-->
      </el-card>
      <div class="graph">
        <el-card style="height: 195px">
        </el-card>
        <el-card style="height: 195px"></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// 取 mockjs 中的数据
import {getData} from '../../api'

export default {
  data() {
    return {
      tableData: [this.getMockTableData],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [ this.getMockCountData]
    }
  },
  methods: {
    // 异步获取mock数据（后端数据）
    async  getMockTableData() {
        try {
          const result = await getData();
          // console.log(result.data.data.tableData);
          this.tableData = result.data.data.tableData;
        }catch (error) {
          console.log(error)
        }
    },
    async  getMockCountData() {
      try {
        const result = await getData();
        //console.log(result.data.data.countData);
        this.countData = result.data.data.countData;
      }catch (error) {
        console.log(error)
      }
    }
  },
  mounted() {
    // 获取后端请求数据
    this.getMockTableData(); // methods中的定义
    this.getMockCountData();
    // getData().then((data) => {
    //   const {tableData} = data.data.data
    //   console.log(tableData)
    // })
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
