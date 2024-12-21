<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">成绩管理</div>
    </div>

    <div class="base_query_oneLine">
      <div class="query_left">
        <el-button class="commButton" type="primary" @click="addItem()">添加</el-button>
      </div>
      <div class="query_right">
        <el-form :inline="true">
          <el-form-item label="学生">
            <el-select v-model="studentId">
              <el-option v-for="item in studentList" :label="item.title" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程">
            <el-select v-model="courseId">
              <el-option v-for="item in courseList" :label="item.title" :key="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="default" class="commButton" @click="query()">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- <span style="margin-top: 5px">学生</span>
        <select class="commInput" v-model="studentId">
          <option value="0">请选择...</option>
          <option v-for="item in studentList" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
        <span style="margin-top: 5px">课程</span>
        <select class="commInput" v-model="courseId">
          <option value="0">请选择...</option>
          <option v-for="item in courseList" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
        <button style="margin-left: 5px" class="commButton" @click="query()">
          查询
        </button> -->
      </div>
    </div>
    <div class="table_center" style="margin-top: 5px">
      <el-table :data="scoreList">
        <el-table-column label="学号" prop="studentNum" />
        <el-table-column label="姓名" prop="studentName" />
        <el-table-column label="班级" prop="className" />
        <el-table-column label="课程号" prop="courseNum" />
        <el-table-column label="课程名" prop="courseName" />
        <el-table-column label="学分" prop="credit" />
        <el-table-column label="成绩">
          <template #default="scope">
            {{ scope.row.mark == "null" ? '未打分' : scope.row.mark }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button-group>
              <el-button @click="editItem(scope.row)" type="success">编辑</el-button>
              <el-button @click="deleteItem(scope.row.scoreId)" type="danger">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- <table class="content">
        <tr class="table_th">
          <td>学号</td>
          <td>姓名</td>
          <td>班级</td>
          <td>课程号</td>
          <td>课程名</td>
          <td>学分</td>
          <td>成绩</td>
          <td>操作</td>
        </tr>
        <tr v-for="item in scoreList" :key="item.scoreId">
          <td>{{ item.studentNum }}</td>
          <td>{{ item.studentName }}</td>
          <td>{{ item.className }}</td>
          <td>{{ item.courseNum }}</td>
          <td>{{ item.courseName }}</td>
          <td>{{ item.credit }}</td>
          <td>{{ item.mark }}</td>
          <td>
            <button class="table_edit_button" @click="editItem(item)">
              编辑
            </button>
            <button
              class="table_delete_button"
              @click="deleteItem(item.scoreId)"
            >
              删除
            </button>
          </td>
        </tr>
      </table> -->
    </div>
  </div>
  <!-- 成绩修改对话框显示 -->
  <el-dialog id="favDialog" v-model="dialogVisible" :before-close="handleClose" width="400px">
    <template #header>
      <h1>成绩添加修改对话框</h1>
    </template>
    <!-- <div class="base_title">成绩添加修改对话框</div> -->
    <!-- <div class="dialog-div" style="margin-top: 5px"> -->
    <el-form label-width="80px" :model="editedItem" ref="form">
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
      <!-- <el-form-item>
        <el-button @click="handleClose" style="margin-right: 30px">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </el-form-item> -->
    </el-form>
    <div style="display: flex; justify-content: center; margin-top: 10px">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="close">取消</el-button>
    </div>
    <!-- </div> -->
  </el-dialog>
  <!-- <dialog
    id="favDialog"
    onclose="close()"
    style="
      position: absolute;
      top: 300px;
      left: 300px;
      width: 300px;
      height: 210px;
    "
  >
    <div class="base_title">成绩添加修改对话框</div>
    <div class="dialog-div" style="margin-top: 5px">
      <table class="dialog-content">
        <tr>
          <td colspan="1" style="text-align: right">课程号</td>
          <td colspan="1">
            <select class="commInput" v-model="editedItem.studentId">
              <option value="0">请选择...</option>
              <option
                v-for="item in studentList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">课程名</td>
          <td colspan="1">
            <select class="commInput" v-model="editedItem.courseId">
              <option value="0">请选择...</option>
              <option
                v-for="item in courseList"
                :key="item.id"
                :value="item.id"
              >
                {{ item.title }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">成绩</td>
          <td colspan="1">
            <input v-model="editedItem.mark" class="commInput" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button
              class="commButton"
              @click="close()"
              style="margin-right: 30px"
            >
              取消
            </button>
            <button class="commButton" @click="confirm()">确认</button>
          </td>
        </tr>
      </table>
    </div>
  </dialog> -->
</template>
<script lang="ts">
import { defineComponent } from "vue";
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
  }),
  computed: {},
  created() {
    this.initialize();
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
  },
});
</script>
