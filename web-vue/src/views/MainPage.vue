<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">系统主页</div>
    </div>

    <div class="dashboard-container">
      <!-- 活跃用户卡片 -->
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>用户活跃度分析</span>
          </div>
        </template>
        <div id="onlineUserChart" class="chart-container"></div>
      </el-card>

      <!-- 用户分类卡片 -->
      <el-card class="chart-card">
        <template #header>
          <div class="card-header">
            <span>用户角色分布</span>
          </div>
        </template>
        <div id="userTypeChart" class="chart-container"></div>
      </el-card>
    </div>
    <div class="dashboard-container">
      <!-- 快速入口 -->
      <el-card class="quick-access">
        <template #header>
          <div class="card-header">
            <span>快速入口</span>
          </div>
        </template>
        <div class="button-group">

        </div>
      </el-card>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";
import { getMainPageData } from "~/services/mainServ";
import { type ChartItem, type UserOnlineItem } from "~/models/general";
var echart = echarts;
var onlineUserChart: any;
var userTypeChart: any;
var requestChart: any;

export default defineComponent({
  //数据
  data: () => ({
    onlineUser: {} as UserOnlineItem,
    userTypeList: [],
    requestData: {} as ChartItem,
    timeRange: 'day',
  }),
  async created() {
    await this.doQuery();
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    //请求后台页面显示的所有数据
    async doQuery() {
      const res = await getMainPageData();
      this.onlineUser = res.data.onlineUser;
      this.userTypeList = res.data.userTypeList;
      this.requestData = res.data.requestData;

      this.drawEcharts();
    },
    //绘制echarts
    drawEcharts() {
      //绘制用户活跃图表
      if (
        onlineUserChart != null &&
        onlineUserChart != "" &&
        onlineUserChart != undefined
      ) {
        onlineUserChart.dispose(); //解决echarts dom已经加载的报错
      }
      if (
        userTypeChart != null &&
        userTypeChart != "" &&
        userTypeChart != undefined
      ) {
        userTypeChart.dispose(); //解决echarts dom已经加载的报错
      }
      if (
        requestChart != null &&
        requestChart != "" &&
        requestChart != undefined
      ) {
        requestChart.dispose(); //解决echarts dom已经加载的报错
      }
      onlineUserChart = echart.init(
        document.getElementById("onlineUserChart") as any
      );
      onlineUserChart.setOption({
        title: { text: "用户活跃度分析", left: "center" },
        xAxis: {
          type: "value",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: '{b}: {c}人'
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "category",
          data: ["总用户", "本月活动用户", "当日活动用户"],
          axisTick: {
            alignWithLabel: true,
          },
        },
        series: [
          {
            itemStyle: {
              label: {
                show: true, //开启显示
                position: "right", //在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 14,
                },
              },
            },
            barWidth: "50%",
            data: [
              {
                value: this.onlineUser.total,
                itemStyle: {
                  color: "#1E90FF",
                },
              },
              {
                value: this.onlineUser.monthCount,
                itemStyle: {
                  color: "#FF6347",
                },
              },
              {
                value: this.onlineUser.dayCount,
                itemStyle: {
                  color: "#FFD700",
                },
              },
            ],
            type: "bar",
          },
        ],
      });
      //      绘制用户分类图表
      userTypeChart = echart.init(
        document.getElementById("userTypeChart") as any
      );
      userTypeChart.setOption({
        title: {
          text: "用户角色分布",
          subtext: `总用户数: ${this.onlineUser.total}人`,
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}人 ({d}%)"
        },
        legend: {
          bottom: 10,
          left: 'center'
        },
        series: [{
          name: "用户角色",
          type: "pie",
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {c}人'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          data: this.userTypeList
        }]
      });
      //绘制请求图表
      requestChart = echart.init(
        document.getElementById("requestChart") as any
      );
      requestChart.setOption({
        title: { text: "系统访问趋势", left: "center" },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "line" }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.requestData.value
        },
        yAxis: {
          type: "value",
          splitLine: { show: false }
        },
        series: [{
          name: "访问量",
          type: "line",
          smooth: true,
          lineStyle: {
            width: 3,
            shadowColor: 'rgba(0,0,0,0.3)',
            shadowBlur: 10,
            shadowOffsetY: 8
          },
          areaStyle: {
            opacity: 0.3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(128, 255, 165)'
            }, {
              offset: 1,
              color: 'rgb(1, 191, 236)'
            }])
          },
          data: this.requestData.label1
        }]
      });
    },
    handleResize() {
      onlineUserChart?.resize();
      userTypeChart?.resize();
      requestChart?.resize();
    },
    handleTimeRangeChange() {
      // 这里添加切换时间范围的逻辑
      this.doQuery();
    },
  },
});
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
}

.chart-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  width: 100% !important;
  height: 350px !important;
}

@media screen and (max-width: 768px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }

  .chart-container {
    height: 300px !important;
  }
}

.full-width {
  grid-column: 1 / -1;
}

.el-radio-group {
  margin-left: 20px;
}
</style>
