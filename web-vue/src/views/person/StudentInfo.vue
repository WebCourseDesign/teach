<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">学生信息</div>
    </div>
    <div class="form-div" style="margin-top: 5px">
      <div class="form-body">

        <el-form :model="form" label-width="auto" style="max-width: 400px;" ref="form">
          <el-form-item prop="num" label="学号">
            <el-input v-model="form.num" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="dept" label="学院">
            <el-input v-model="form.dept" placeholder="请输入学院"></el-input>
          </el-form-item>
          <el-form-item prop="major" label="专业">
            <el-input v-model="form.major" placeholder="请输入专业"></el-input>
          </el-form-item>
          <el-form-item prop="className" label="班级">
            <el-input v-model="form.className" placeholder="请输入班级"></el-input>
          </el-form-item>
          <el-form-item prop="card" label="证件号码"
            :rules="[{ required: true, message: '非法参数', trigger: 'blur', validator: checkIdNum }]">
            <el-input v-model="form.card" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item prop="gender" label="性别">
            <el-select v-model="form.gender" placeholder="请输入性别">
              <el-option v-for="item in genderList" :key="item.value" :value="item.value"
                :label="item.title"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="birthday" label="出生日期">
            <el-date-picker v-model="birthday" type="date" style="width: 100%" placeholder="选择出生日期" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱"
            :rules="[{ type: 'email', required: true, message: '非法参数', trigger: 'blur' }]">
            <el-input v-model="form.email" placeholder="请输入邮箱" type="email"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="电话"
            :rules="[{ required: true, message: '非法参数', trigger: 'blur', validator: checkPhone }]">
            <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item prop="address" label="地址">
            <el-input v-model="form.address" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-left: 20px;">
          <img :src="imgStr" style="width: 100px;height: 100px" />
        </div>
      </div>
      <el-button size="large" type="primary" @click="submit">提交</el-button>
      <el-button size="large" @click="backPage">取消</el-button>
      <!-- <table> -->
      <!-- <tr>
          <td colspan="1" style="text-align: right">学号</td>
          <td colspan="1"><input v-model="form.num" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">姓名</td>
          <td colspan="1"><input v-model="form.name" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">学院</td>
          <td colspan="1"><input v-model="form.dept" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">专业</td>
          <td colspan="1"><input v-model="form.major" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">班级</td>
          <td colspan="1">
            <input v-model="form.className" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">证件号码</td>
          <td colspan="1"><input v-model="form.card" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">性别</td>
          <td colspan="1">
            <select class="commInput" v-model="form.gender" style="width: 97%">
              <option value="0">请选择...</option>
              <option
                v-for="item in genderList"
                :key="item.value"
                :value="item.value"
              >
                {{ item.title }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">出生日期</td>
          <td colspan="1">
            <el-date-picker
              v-model="birthday"
              type="date"
              style="width: 100%"
              placeholder="选择出生日期"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">邮箱</td>
          <td colspan="1"><input v-model="form.email" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">电话</td>
          <td colspan="1"><input v-model="form.phone" style="width: 97%" /></td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">地址</td>
          <td colspan="1">
            <input v-model="form.address" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="commButton" @click="submit">提交</button>
          </td>
        </tr> -->
      <!-- </table> -->
    </div>
  </div>
</template>
<script lang="ts">
import { getDictionaryOptionItemList } from "~/services/systemServ";
import { getStudentInfo, studentEditSave } from "~/services/personServ";
import { defineComponent } from "vue";
import router from "~/router";
import { type OptionItem, type StudentItem } from "~/models/general";
import { getOptionItem } from "~/tools/comMethod";
import { formatDate } from "~/tools/comMethod";
import { getPhotoImageStr } from "~/services/infoServ";
import { getTeacherList } from '~/services/teachingServ';
import { ElMessageBox } from "element-plus";

export default defineComponent({
  //数据
  data: () => ({
    valid: false,
    studentId: null as number | null,
    form: {} as StudentItem,
    birthday: new Date(),
    gender: {} as OptionItem,
    genderList: [] as OptionItem[],
    nameRules: [],
    emailRules: [],
    imgStr: '',
    teacherList: []
  }),
  //页面加载方法, 获取性别选择列表,获取学生信息,注意async和await的使用
  async created() {
    //获取获取路由参数,上一个页面传过来的学生id
    const res = this.$route.query.studentId;
    if (res != null) {
      this.studentId = parseInt(res.toString());
    }
    this.genderList = await getDictionaryOptionItemList("XBM");
    if (this.studentId != null) {
      this.form = await getStudentInfo(this.studentId);
      this.birthday = new Date(this.form.birthday);
      this.gender = getOptionItem(this.genderList, this.form.gender);
      let ress = await getPhotoImageStr(this.form.personId + ".jpg");
      console.log(ress);

      this.imgStr = ress.data;
      this.imgStr = this.imgStr.replace('data:image/png;base64', 'data:image/jpeg;base64')
      console.log(this.imgStr);

    }

  },
  methods: {
    //提交表单
    async submit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          this.form.birthday = formatDate(this.birthday);
          const res = await studentEditSave(this.studentId, this.form);
          if (res.code == 0) {
            router.push({ path: "/student-panel" });
          } else {
            alert(res.msg);
          }
        } else {
          ElMessageBox.alert('请检查输入项');
        }
      })
      //      this.form.gender = this.gender.value;

    },
    getImage() {
      // todo； 获取头像
    },
    backPage() {
      router.push({ path: "/student-panel" });
    },
    getTeachers() {
      getTeacherList().then(res => {
        this.teacherList = res.data.data;
      })
    },
    checkIdNum() {
      // 使用正则表达式判断是不是合法的身份证号
      const idNum = this.form.card;
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(idNum)) {
        ElMessageBox.alert('证件号格式不正确');
        return false;
      }
      return reg.test(idNum);
    },
    checkPhone() {
      // 使用正则表达式判断是不是合法的手机号
      const phone = this.form.phone;
      console.log('进入校验');

      const reg = /^1[34578]\d{9}$/;
      if (!reg.test(phone)) {
        ElMessageBox.alert('手机号码格式不正确');
        return false;
      }
      return reg.test(phone);

    },
    checkEmail() {
      // 使用正则表达式判断是不是合法的邮箱
      const email = this.form.email;
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(email)) {
        ElMessageBox.alert('邮箱格式不正确');
        return false;
      }
      return reg.test(email);
    }

  },
});
</script>
<style lang="scss" scoped>
.form-body {
  display: flex;
  justify-content: flex-start;
  margin: 20px;
}
</style>
