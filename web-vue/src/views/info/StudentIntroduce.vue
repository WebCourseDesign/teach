<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">个人画像</div>
    </div>
    <div class="table_center" style="margin-top: 5px;">
      <table class="content">
        <tr>
          <td>学号</td>
          <td>
            {{ info.num }}
          </td>
          <td>姓名</td>
          <td>
            {{ info.name }}
          </td>
          <td>学院</td>
          <td>
            {{ info.dept }}
          </td>
          <td rowspan="3">
            <img :src="imgStr" alt="个人照片" width="200" />
          </td>
        </tr>
        <tr>
          <td>专业</td>
          <td>
            {{ info.major }}
          </td>
          <td>班级</td>
          <td>
            {{ info.className }}
          </td>
          <td>证件号码</td>
          <td>
            {{ info.card }}
          </td>
        </tr>
        <tr>
          <td>性别</td>
          <td>
            {{ info.genderName }}
          </td>
          <td>出生日期</td>
          <td>
            {{ info.birthday }}
          </td>
          <td>邮箱</td>
          <td>
            {{ info.email }}
          </td>
        </tr>
        <tr>
          <td>电话</td>
          <td>
            {{ info.phone }}
          </td>
          <td>地址</td>
          <td colspan="3">
            {{ info.address }}
          </td>
          <td>
            <input style="margin-left: 10px" type="file" id="file" accept="image/jpeg" />
            <input type="button" value="图片上传" @click="uploadFile()" />
          </td>
        </tr>
      </table>
    </div>
    <div class="table_center" style="margin-top: 5px">
      <div style="color: #930e14;font-weight: bold;text-align: center">
        您本学期目前GPA为：{{ gpa }}
      </div>
      <table class="content">
        <tr>
          <td width="5%">课程号</td>
          <td width="5%">课程名</td>
          <td width="5%">学分</td>
          <td width="5%">成绩</td>
          <td width="5%">排名</td>

        </tr>
        <tr v-for="item in scoreList" :key="item.studentId">
          <td>{{ item.courseNum }}</td>
          <td>{{ item.courseName }}</td>
          <td>{{ item.credit }}</td>
          <td>{{ item.mark }}</td>
          <td>{{ item.ranking }}</td>
        </tr>
      </table>
    </div>
    <div class="chart-container">
      <div id="myChartBar" :style="{ width: '300px', height: '350px' }"></div>
      <div id="myChartPie" :style="{ width: '300px', height: '350px' }"></div>
      <div id="myChartLine" :style="{ width: '300px', height: '350px' }"></div>
    </div>
  </div>
  <div>
    <el-upload style="display: inline-block; margin-left: 5px" :headers="authHeader"
      :action="'/api/student/importFeeDataWeb'" :data="{ studentId: studentId }" accept=".xlsx,.xls"
      :show-file-list="true" :limit="1" :multiple="false" :on-success="onSuccess">
      <el-button class="spacial">消费记录上传</el-button>
    </el-upload>

    <el-button style="margin-left: 5px" class="spacial" @click="downloadPdf()">个人画像下载</el-button>
    <el-button style="margin-left: 5px" class="spacial" @click="exportPersonIntro()">个人简历下载</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import * as echarts from "echarts";
import {
  type OptionItem,
  type StudentItem,
  type ScoreItem,
} from "~/models/general";
import { downloadPost, getAuthHeader } from "~/services/genServ";
import {
  getStudentIntroduceData,
  getPhotoImageStr,
  uploadPhoto,
} from "~/services/infoServ";
import { message } from "~/tools/messageBox";
import { exportPerson } from '../../services/studentServ';
import {ElMessage} from "element-plus";
const echart = echarts;

export default defineComponent({
  data: () => ({
    authHeader: getAuthHeader(),
    valid: false,
    uploadIsLoading: false,
    studentId: null as number | null,
    imgStr: "",
    info: {} as StudentItem,
    feeList: [] as OptionItem[],
    markList: [] as OptionItem[],
    scoreList: [] as ScoreItem[],
    nameRules: [],
    emailRules: [],
    echartBar: null as any,
    echartLine: null as any,
    echartPie: null as any,
    gpa: 0
  }),
  async created() {
    let res = await getStudentIntroduceData(this.studentId);
    this.info = res.data.info;
    this.studentId = this.info.studentId;
    this.feeList = res.data.feeList;
    this.markList = res.data.markList;
    this.scoreList = res.data.scoreList;
    let gpaSum = 0.0;
    let sumCredit = 0.0;

    for (let i = 0; i < this.scoreList.length; i++) {
      if (this.scoreList[i].mark == null) {
        continue;
      }
      const gpaPart = ((this.scoreList[i].mark - 50) / 10 > 0 ? (this.scoreList[i].mark - 50) / 10 : 0) * this.scoreList[i].credit;
      gpaSum += gpaPart;
    }

    for (let i = 0; i < this.scoreList.length; i++) {
      if (this.scoreList[i].mark == null) {
        continue;
      }
      sumCredit += this.scoreList[i].credit;
    }

    this.gpa = Math.ceil(gpaSum / sumCredit * 100) / 100;
    res = await getPhotoImageStr(this.info.personId + ".jpg");
    this.imgStr = res.data;
    this.drawEcharts();
  },
  mounted() { },

  methods: {
    drawEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.echartBar = echart.init(
        document.getElementById("myChartBar") as any
      );
      //绘制图表
      this.echartBar.setOption({
        title: { text: "日常消费" },
        tooltip: {},
        xAxis: {
          data: this.feeList.map((item) => item.title),
        },
        yAxis: {},
        series: [
          {
            name: "消费",
            type: "bar",
            data: this.feeList.map((item) => item.value),
          },
        ],
      });
      this.echartLine = echart.init(
        document.getElementById("myChartLine") as any
      );
      // 绘制图表
      this.echartLine.setOption({
        title: { text: "日常消费" },
        tooltip: {},
        xAxis: {
          data: this.feeList.map((item) => item.title),
        },
        yAxis: {},
        series: [
          {
            name: "消费",
            type: "line",
            data: this.feeList.map((item) => item.value),
          },
        ],
      });
      this.echartPie = echart.init(
        document.getElementById("myChartPie") as any
      );
      // 绘制图表
      this.echartPie.setOption({
        title: { text: "成绩分布" },
        tooltip: {},
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          data: this.markList.map((item) => item.title),
        },
        series: [
          {
            type: "pie",
            data: this.markList,
          },
        ],
      });
    },
    // 上传图片
    async uploadFile() {
      const file = document.querySelector("#file") as any;
      if (file.files == null || file.files.length == 0) {
        message(this, "请选择文件！");
        return;
      }
      if (file.type !== 'image/jpeg') {
        ElMessage.error('只能上传图片格式的文件')
        return
      }
      const res = await uploadPhoto(
        this.info.personId + ".jpg",
        file.files[0]
      );

      if (res.code === 0) {
        message(this, "上传成功");
        let result = await getPhotoImageStr(this.info.personId + ".jpg");
        this.imgStr = result.data;
      } else {
        message(this, "上传失败");
      }
    },
    // 下载pdf
    downloadPdf() {
      const res = downloadPost(
        "/api/student/getStudentIntroduceItextPdf",
        this.info.num + ".pdf",
        {
          studentId: this.studentId,
          barBase64: this.echartBar.getDataURL(),
          lineBase64: this.echartLine.getDataURL(),
          pieBase64: this.echartPie.getDataURL(),
        }
      );
      console.log(res);

      var picBase64 = this.echartBar.getDataURL()
      console.log(picBase64);

    },
    // 上传成功回调函数
    onSuccess(res: any) {
      if (res.code == 0) {
        message(this, "上传成功！");
      } else {
        message(this, res.msg);
      }
    },
    exportPersonIntro() {

      // downloadPost('/api/student/exportPersonImage',this.info.num+".pdf",{
      //   barBase64: this.echartBar.getDataURL(),
      //   lineBase64: this.echartLine.getDataURL(),
      //   pieBase64: this.echartPie.getDataURL(),

      // })

      exportPerson().then(res => {
        console.log(res);
        this.download(this.info.num + ".pdf", res.data)


      })
    },
    download(fileanme: string, file: Blob) {
      const blob = new Blob([file]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileanme;
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
      window.URL.revokeObjectURL(link);
    }
  },
});
</script>
<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 150px;
  /* 设置两个 div 之间的间距 */
}

.content {
  border: 1px;
  border-color: #202020;
}
</style>
