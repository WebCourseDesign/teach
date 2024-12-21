<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">课程管理
        <el-form>
          <el-form-item label="·是否选课">
            <el-switch active-text="开始选课" inactive-text="停止选课" :active-value="1" :inactive-value="0" v-model="isSelect"
              @change="submitChange"></el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="base_query_oneLine">
      <div class="query_left">
        <el-button class="commButton" type="primary" @click="addItem()">添加</el-button>

      </div>
      <div class="query_right">
        <!-- <span style="margin-top: 5px">课程号或课程名</span>
        <input type="text" v-model="numName" style="margin-left: 10px; width: 230px" />
        <button style="margin-left: 5px" class="commButton" @click="query()">查询</button> -->
        <el-form>
          <el-form-item label="课程号或课程名">
            <div class="query_input">
              <el-input v-model="numName"></el-input>
              <el-button class="subButton" type="default" @click="query()">查询</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="color: #930e14;text-align: center;font-weight: bold">
      ps：课序号格式只能为“sduxxxx”，其中x为整数
    </div>
    <div class="table_center" style="margin-top: 5px">

      <el-table :data="courseList" style="width: 100%" label-width="80px">
        <el-table-column prop="num" label="课程号"></el-table-column>
        <el-table-column prop="name" label="课程名"></el-table-column>
        <el-table-column prop="credit" label="学分"></el-table-column>
        <el-table-column prop="coursePath" label="教材"></el-table-column>
        <el-table-column prop="teacher.person.name" label="教师"></el-table-column>
        <el-table-column prop="preCourse.name" label="前序课"></el-table-column>
        <el-table-column prop="maxCount" label="课容量"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button-group>
              <el-button type="success" @click="editItem(scope.row)">编辑</el-button>
              <el-button type="danger" @click="deleteItem(scope.row.courseId)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- <table class="content">
        <tr class="table_th">
          <td>课程号</td>
          <td>课程名</td>
          <td>学分</td>
          <td>材料路径</td>
          <td>前序课</td>
          <td>操作</td>
        </tr>
        <tr v-for="item in courseList" :key="item.courseId">
          <td>{{ item.num }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.credit }}</td>
          <td>{{ item.coursePath }}</td>
          <td>{{ item.preCourse }}</td>
          <td>
            <button class="table_edit_button" @click="editItem(item)">编辑</button>
            <button class="table_delete_button" @click="deleteItem(item.courseId)">删除</button>
          </td>
        </tr>
      </table> -->
    </div>
  </div>
  <!-- 对话框显示 -->
  <el-dialog v-model="dialogVisible" width="300px">
    <!-- <div class="base_title">课程添加修改对话框</div> -->
    <!-- <div class="dialog-div" style="margin-top: 5px"> -->
    <template #header>
      <h1>课程添加修改对话框</h1>
    </template>
    <el-form :model="form" label-width="80px">
      <el-form-item label="课程号">
        <el-input v-model="form.num" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="课程名">
        <el-input v-model="form.name" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="学分">
        <el-input v-model="form.credit" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="教材">
        <el-input v-model="form.coursePath" style="width: 100%"></el-input>
      </el-form-item>
      <el-form-item label="课容量">
        <el-input v-model="form.maxCount" style="width: 100%" type="number"></el-input>
      </el-form-item>
      <el-form-item label="教师">
        <el-select v-model="form.teacher.teacherId">
          <el-option v-for="item in teacherList" :key="item.teacherId" :label="item.person.name"
            :value="item.teacherId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前序课">
        <el-select v-model="form.preCourseId" placeholder="请选择...">
          <el-option v-for="item in courseSelectList" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="dialogVisible = false" style="margin-right: 30px">取消</el-button>
      </div>
    </el-form>
    <!-- </div> -->
  </el-dialog>
  <!-- <dialog
    id="favDialog"
    onclose="close()"
    style="position: absolute; top: 300px; left: 300px; width: 300px; height: 310px"
  >
    <div class="base_title">课程添加修改对话框</div>
    <div class="dialog-div" style="margin-top: 5px">
      <table class="content">
        <tr>
          <td colspan="1" style="text-align: right">课程号</td>
          <td colspan="1"><input v-model="form.num" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">课程名</td>
          <td colspan="1"><input v-model="form.name" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">学分</td>
          <td colspan="1">
            <input v-model="form.credit" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">资料路径</td>
          <td colspan="1">
            <input v-model="form.coursePath" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">前序课</td>
          <td colspan="1">
            <select class="commInput" v-model="form.preCourseId">
              <option v-for="item in courseSelectList" :key="item.id" :value="item.id">
                {{ item.title }}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td colspan="2">
            <button class="commButton" @click="close()" style="margin-right: 30px">取消</button>
            <button class="commButton" @click="confirm()">确认</button>
          </td>
        </tr>
      </table>
    </div>
  </dialog> -->
</template>

<script lang="ts">
import { type CourseItem, type OptionItem } from '~/models/general'
import { defineComponent } from 'vue'
import { getCourseList, courseDelete, courseSave, getTeacherList } from '~/services/teachingServ'
import { message, messageConform } from '~/tools/messageBox'
import { changeCourse, getSelectState } from '~/services/changeCourseServ';
import { ElMessage, ElMessageBox } from "element-plus";
import { cloneDeep } from 'lodash';
export default defineComponent({
  // 双向绑定数据
  data: () => ({
    numName: '',
    courseList: [] as CourseItem[],
    courseSelectList: [] as OptionItem[],
    deleteId: -1,
    form: {} as CourseItem,
    dialogVisible: false,
    isSelect: 0,
    teacherList: [],
    tempCourse: {} as CourseItem
  }),
  //初始加载一次,直接获取教师列表
  created() {
    this.query()
    this.getState()
    this.getTeachers()
  },

  methods: {
    //设置课程选择列表
    refresh() {
      this.query()
      this.getState()
      this.getTeachers()
    },
    makeSelectCourseList() {
      this.courseSelectList = []
      for (let i = 0; i < this.courseList.length; i++) {
        const item = this.courseList[i]
        this.courseSelectList.push({
          id: item.courseId,
          value: item.num,
          title: item.num + '-' + item.name
        })
      }
    },
    //查询课程列表
    async query() {
      this.courseList = await getCourseList(this.numName)

      this.makeSelectCourseList()
      console.log(this.courseList);

    },
    //添加课程,显示对话框
    addItem() {
      this.form = {
        teacher: {
          teacherId: ''
        }
      }

      // getDialog('favDialog').show()
      this.dialogVisible = true
    },
    //编辑课程,显示对话框
    editItem(item) {
      if (!item.teacher) {
        item.teacher = {
          teacherId: ''
        }
      }
      this.form = cloneDeep(item);
      if (item.preCourse != null) this.form.preCourseId = item.preCourse.courseId

      console.log(this.form);
      // getDialog('favDialog').show()
      this.dialogVisible = true
    },
    //关闭对话框
    close() {
      // getDialog('favDialog').close()
      this.dialogVisible = false;
    },

    //确认对话框
    async confirm() {

      const courseNumRegex = /^sdu\d{4}$/;
      if (!courseNumRegex.test(this.form.num)) {
        ElMessageBox.alert('课程号格式不正确,请以sdu开头加4位数字');
        return;
      }
      if (!this.form.name) {
        ElMessageBox.alert('课程名不能为空');
        return;
      }
      const maxCountRegex = /^\d{1,3}$/;
      if (!this.form.maxCount || !maxCountRegex.test(this.form.maxCount.toString())) {
        ElMessageBox.alert('课容量格式不正确,只能为1-3位整数');
        return;
      }
      if (this.form.maxCount < 10) {
        ElMessageBox.alert('课容量小于10,无法开课');
        return;
      }
      const creditRegex = /^([1-9]?\d|100)(\.\d{1})?$/;
      if (!this.form.credit || !creditRegex.test(this.form.credit.toString())) {
        ElMessageBox.alert('学分格式不正确,只能为一位小数或两位数以内的整数');
        return;
      }
      if (this.form.teacher.teacherId == '') {
        ElMessageBox.alert('请选择教师');
        return;
      }
      this.close()
      const res = await courseSave(this.form)
      if (res.data.code == 0) {
        message(this, '保存成功')
        this.query()
      } else {
        ElMessageBox.alert(res.data.msg)
      }
      this.refresh();
    },
    //删除课程
    async deleteItem(courseId: number) {
      const result = await messageConform('确认删除吗?')
      if (!result) {
        return
      }
      const res = await courseDelete(courseId)
      if (res.code == 0) {
        message(this, '删除成功')
        this.query()
      } else {
        ElMessageBox.alert(res.msg)
      }
    },
    submitChange() {
      console.log(this.isSelect);
      changeCourse().then(res => {
        console.log(res);
        this.isSelect = res.data.data
        this.getState()
      })

    },
    getState() {
      getSelectState().then(res => {
        this.isSelect = res.data.data
      })
    },
    getTeachers() {
      getTeacherList().then(res => {
        this.teacherList = res.data.data
      })
    }
  }
})
</script>
<style></style>
