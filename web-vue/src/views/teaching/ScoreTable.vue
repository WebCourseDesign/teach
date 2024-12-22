<template>
  <div class="score-management">
    <!-- Header -->
    <div class="page-header">
      <div class="blue-bar"></div>
      <h2 class="page-title">成绩管理</h2>
    </div>

    <!-- Control Panel -->
    <div class="control-panel">
      <!-- Action Buttons -->
      <div class="action-buttons">

      </div>

      <!-- Search Form -->
      <div class="search-form">
        <el-form :inline="true" @submit.prevent="query">
          <el-form-item>
            <el-button type="primary" @click="addItem()"
              v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
              添加成绩
            </el-button>
          </el-form-item>
          <el-form-item label="学生" v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
            <el-select v-model="studentId" placeholder="选择学生" clearable style="min-width: 150px;">
              <el-option v-for="item in studentList" :label="item.title" :key="item.id" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="courseId" placeholder="选择课程" clearable style="min-width: 150px;">
              <el-option v-for="item in courseList" :label="item.title" :key="item.id" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" @click="query">
                查询
              </el-button>
              <el-button @click="reset">
                重置
              </el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Radar Chart for Students -->
      <el-row :gutter="20">
        <el-col :span="appStore.$state.userInfo.roles.includes('ROLE_STUDENT') ? 8 : 0"
          v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
          <el-card class="chart-card">
            <template #header>
              <div class="card-header">
                <span>成绩分析</span>
              </div>
            </template>
            <div id="scoreRadarChart" class="radar-chart"></div>
          </el-card>
        </el-col>

        <!-- Score Table -->
        <el-col :span="appStore.$state.userInfo.roles.includes('ROLE_STUDENT') ? 16 : 24">
          <el-card class="table-card">
            <el-table :data="scoreList" stripe border>
              <el-table-column label="学号" prop="studentNum"
                v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')" />
              <el-table-column label="姓名" prop="studentName"
                v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')" />
              <el-table-column label="班级" prop="className"
                v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')" />
              <el-table-column label="课程号" prop="courseNum" />
              <el-table-column label="课程名" prop="courseName" />
              <el-table-column label="学分" prop="credit" />
              <el-table-column label="成绩">
                <template #default="scope">
                  {{ scope.row.mark == "null" ? '未打分' : scope.row.mark }}
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if="!appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
                <template #default="scope">
                  <el-button-group>
                    <el-button @click="editItem(scope.row)" type="success">编辑</el-button>
                    <el-button @click="deleteItem(scope.row.scoreId)" type="danger">删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Dialog Form -->
    <el-dialog v-model="dialogVisible" :title="editedItem.scoreId ? '修改成绩' : '添加成绩'" width="500px" destroy-on-close>
      <el-form :model="editedItem" label-position="right" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="学生">
          <el-select v-model="editedItem.studentId" placeholder="请选择...">
            <el-option v-for="item in studentList" :label="item.title" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名">
          <el-select v-model="editedItem.courseId" placeholder="请选择...">
            <el-option v-for="item in courseList" :label="item.title" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成绩" prop="mark"
          :rules="[{ required: true, message: '成绩从0-100', trigger: 'blur', validator: checkMark }]">
          <el-input v-model.number="editedItem.mark" style="width: 100%;"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";
import {
  getScoreList,
  getStudentItemOptionList,
  getCourseItemOptionList,
  scoreSave,
  scoreDelete,
  getCourseByTeacher,
  getCourseItemOptionListByTeacher,
} from "~/services/teachingServ";
import { DataResponse, type OptionItem, type ScoreItem } from "~/models/general";
import { message, messageConform } from "~/tools/messageBox";
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from 'lodash';
import { mapState } from "pinia";
import { useAppStore } from "~/stores/app";
import { getTeacherByNum, getTeacherInfo } from "~/services/personServ";
import { generalRequest } from "~/services/genServ";
import { getPhotoImageStr } from "~/services/infoServ";
export default defineComponent({
  data: () => ({
    scoreList: [] as ScoreItem[],
    studentId: null,
    courseId: null,
    editedItem: {
    } as ScoreItem,
    studentList: [] as OptionItem[],
    courseList: [] as OptionItem[],
    deleteId: -1,
    dialogVisible: false,
    appStore: useAppStore(),
    radarChart: null as any,
    gpa: 0
  }),
  computed: {},
  async created() {
    this.initialize();

    if (this.appStore.$state.userInfo.roles == "ROLE_STUDENT") {
      const studentRes = await generalRequest("/api/base/getByUsername", {
        username: this.appStore.$state.userInfo.username,
      })
      this.studentId = studentRes.data.studentId;
      console.log(this.studentId);
      this.query();

    }
  },

  methods: {
    // 初始化,获取学生选择项列表和课程选择项列表
    async initialize() {
      this.scoreList = await getScoreList(this.studentId, this.courseId);
      this.studentList = await getStudentItemOptionList();
      this.courseList = await getCourseItemOptionList();
      const appStore = useAppStore();
      //console.log(appStore.userInfo);

      if (appStore.userInfo.roles == "ROLE_TEACHER") {
        //const res = await getTeacherByNum(appStore.userInfo.username);
        const courses = await getCourseItemOptionListByTeacher();
        console.log(courses);
        this.courseList = courses;
      }

      console.log(this.studentList, this.courseList);
    },
    async refresh() {
      await this.query();
    },
    // 查询
    async query() {
      this.scoreList = await getScoreList(this.studentId, this.courseId);
      if (this.appStore.$state.userInfo.roles.includes('ROLE_STUDENT')) {
        this.drawRadarChart();
      }
    },

    // 重置
    reset() {
      if (this.appStore.$state.userInfo.roles !== "ROLE_STUDENT") this.studentId = null;
      this.courseId = null;
      this.query();
    },

    checkMark() {
      if (this.editedItem.mark < 0 || this.editedItem.mark > 100) {
        return false;
      } else {
        return true;
      }
    },
    // 添加成绩,显示成绩修改对画框
    addItem() {
      this.editedItem = {} as ScoreItem;
      // const dialog = document.getElementById("favDialog") as HTMLDialogElement;
      // dialog.show();
      this.dialogVisible = true;
    },
    // 编辑成绩,显示成绩修改对画框
    editItem(item: ScoreItem) {
      //this.editedItem = item;
      console.log(item);
      this.editedItem = cloneDeep(item);

      this.dialogVisible = true;
    },
    // 关闭成绩修改对话框
    close() {
      // const dialog = document.getElementById("favDialog") as HTMLDialogElement;
      // dialog.close();
      this.dialogVisible = false;
    },
    // 确认成绩修改对话框
    async confirm() {
      this.close();
      console.log(this.editedItem);
      if (this.editedItem.studentId == null || this.editedItem.courseId == null) {
        ElMessageBox.alert("学生和课程不能为空");
        return;
      }
      if (!this.editedItem.mark || isNaN(this.editedItem.mark) || this.editedItem.mark < 0 || this.editedItem.mark > 100) {
        ElMessageBox.alert("成绩数据非法");
        return;
      }
      const res = await scoreSave(
        this.editedItem.scoreId,
        this.editedItem.studentId,
        this.editedItem.courseId,
        this.editedItem.mark
      );
      if (res.code == 0) {
        message(this, "保存成功");
        this.query();
      }
      else {
        ElMessageBox.alert(res.msg);
      }
      this.refresh();
    },
    // 删除成绩
    async deleteItem(scoreId: number) {
      const result = await messageConform("确认删除吗?");
      if (!result) {
        return;
      }
      const res = await scoreDelete(scoreId);
      if (res.code == 0) {
        message(this, "删除成功");
        this.query();
      } else {
        message(this, res.msg);
      }
    },
    drawRadarChart() {
      if (this.radarChart) {
        this.radarChart.dispose();
      }

      const chartDom = document.getElementById('scoreRadarChart');
      if (!chartDom) return;

      this.radarChart = echarts.init(chartDom);

      const indicators = this.scoreList.map(score => ({
        name: score.courseName,
        max: 100
      }));

      const data = this.scoreList.map(score =>
        score.mark === 'null' ? 0 : parseFloat(score.mark)
      );

      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['成绩分布'],
          bottom: 0
        },
        radar: {
          center: ['50%', '50%'],
          radius: '65%',
          indicator: indicators,
          shape: 'circle',
          splitNumber: 5,
          name: {
            textStyle: {
              color: '#333',
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
              ].reverse()
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(238, 197, 102, 0.5)'
            }
          }
        },
        series: [{
          name: '成绩分布',
          type: 'radar',
          data: [{
            value: data,
            name: '成绩分布',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(128, 255, 165, 0.5)' },
                { offset: 1, color: 'rgba(1, 191, 236, 0.5)' }
              ])
            },
            lineStyle: {
              width: 2,
              color: '#409EFF'
            },
            symbol: 'circle',
            symbolSize: 6
          }]
        }]
      };

      this.radarChart.setOption(option);
    },

    handleResize() {
      this.radarChart?.resize();
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
});
</script>

<style scoped>
.score-management {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.blue-bar {
  width: 4px;
  height: 20px;
  background-color: #409EFF;
  margin-right: 12px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.control-panel {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  margin-top: 20px;
}

.chart-card,
.table-card {
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.radar-chart {
  height: 400px;
}

.table-card {
  background-color: #fff;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  gap: 12px;
}

@media screen and (max-width: 768px) {
  .score-management {
    padding: 10px;
  }

  .control-panel {
    padding: 15px;
  }

  .el-form--inline .el-form-item {
    margin-right: 0;
    width: 100%;
  }
}
</style>
