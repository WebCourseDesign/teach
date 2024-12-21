<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">教师信息</div>
    </div>
    <div class="form-div" style="margin-top: 5px">
      <el-form :model="form" label-width="100px" ref="form">
        <el-form-item label="工号">
          <el-input v-model="form.person.num" placeholder="工号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.person.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="form.person.dept" placeholder="学院" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form.title" placeholder="职称" />
        </el-form-item>
        <el-form-item label="学位">
          <el-input v-model="form.degree" placeholder="学位" />
        </el-form-item>
        <el-form-item label="证件号码" prop="person.card"
          :rules="[{ required: true, message: '非法参数', trigger: 'blur', validator: checkIdNum }]">
          <el-input v-model="form.person.card" placeholder="证件号码" />
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.person.gender" placeholder="请选择性别">
            <el-option v-for="item in genderList" :key="item.value" :label="item.title" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker v-model="birthday" type="date" placeholder="选择出生日期" />
        </el-form-item>
        <el-form-item label="邮箱" prop="person.email"
          :rules="[{ type: 'email', required: true, message: '非法参数', trigger: 'blur', validator: checkEmail }]">
          <el-input v-model="form.person.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="电话" prop="person.phone"
          :rules="[{ required: true, message: '非法参数', trigger: 'blur', validator: checkPhone }]">
          <el-input v-model="form.person.phone" placeholder="电话" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.person.address" placeholder="地址" />
        </el-form-item>
      </el-form>
      <el-button class="commButton" @click="submit" type="primary">提交</el-button>
      <el-button class="commButton" @click="cancel" type="default">返回</el-button>
      <!-- <table class="content">
        <tr>
          <td colspan="1" style="text-align: right">工号</td>
          <td colspan="1">
            <el-input v-model="form.person.num" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">姓名</td>
          <td colspan="1">
            <el-input v-model="form.person.name" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">学院</td>
          <td colspan="1">
            <el-input v-model="form.person.dept" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">职称</td>
          <td colspan="1">
            <el-input v-model="form.title" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">学位</td>
          <td colspan="1">
            <el-input v-model="form.degree" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">证件号码</td>
          <td colspan="1">
            <el-input v-model="form.person.card" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">性别</td>
          <td colspan="1">
            <el-select
              v-model="form.person.gender"
              placeholder="请选择性别"
              style="width: 97%"
            >
              <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.title"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">出生日期</td>
          <td colspan="1">
            <el-date-picker
              v-model="form.person.birthday"
              type="date"
              style="width: 97%"
              value-format="yyyy-MM-dd"
              placeholder="选择出生日期"
            />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">邮箱</td>
          <td colspan="1">
            <el-input v-model="form.person.email" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">电话</td>
          <td colspan="1">
            <el-input v-model="form.person.phone" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="1" style="text-align: right">地址</td>
          <td colspan="1">
            <el-input v-model="form.person.address" style="width: 97%" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="commButton" @click="submit">提交</button>
          </td>
        </tr>
      </table> -->
    </div>
  </div>
</template>
<script lang="ts">
import { getTeacherInfo, teacherEditSave } from "~/services/personServ";
import { defineComponent } from "vue";
import router from "~/router";
import { type OptionItem, type TeacherItem } from "~/models/general";
import { ElMessage, ElMessageBox } from "element-plus";
import { formatDate } from "~/tools/comMethod";

export default defineComponent({
  // 双向绑定数据
  data: () => ({
    teacherId: 0 as number,
    form: {} as TeacherItem,
    gender: {} as OptionItem,
    birthday: new Date(),
    genderList: [
      {
        value: "1",
        title: "男",
      },
      {
        value: "2",
        title: "女",
      },
    ] as OptionItem[],
  }),
  // 页面加载函数
  async created() {
    // 获取路由参数
    const res = this.$route.query.teacherId;
    if (res != null) {
      this.teacherId = parseInt(res.toString());
    }
    // 获取教师信息
    if (this.teacherId != null) {
      this.form = await getTeacherInfo(this.teacherId);
    }
  },
  methods: {
    // 提交表单
    async submit() {
      this.$refs['form'].validate(async (valid, fields) => {
        if (valid) {
          this.form.person.birthday = formatDate(this.birthday);
          const res = await teacherEditSave(this.teacherId, this.form);
          if (res.code == 0) {
            router.push({ path: "/teacher-panel" });
          } else {
            alert(res.msg);
          }
        } else {
          ElMessage.error('请检查输入项');
        }
      })

    },
    cancel() {
      router.push({ path: "/teacher-panel" });
    },
    checkIdNum() {
      // 使用正则表达式判断是不是合法的身份证号
      const idNum = this.form.person.card;
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(idNum)) {
        ElMessageBox.alert('证件号格式不正确');
        return false;
      }
      return reg.test(idNum);
    },
    checkPhone() {
      // 使用正则表达式判断是不是合法的手机号
      const phone = this.form.person.phone;
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
      const email = this.form.person.email;
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
