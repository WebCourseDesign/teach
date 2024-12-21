<template>
  <div class="login-page flex-col">
    <!-- Header Area -->
    <el-header class="header" height="70px">
      <div class="logo-container">
        <img src="/logo.png" alt="Logo" class="logo" />
        <span class="welcome-text">教学管理系统</span>
      </div>
    </el-header>

    <!-- Main Content Area -->
    <main class="main-content flex-col align-center justify-center">
      <div class="card">
        <transition name="slide-fade" mode="out-in">
          <div :key="pageType" class="form-section">
            <!-- Login Form -->
            <div v-if="pageType == 1">
              <h2 class="form-title">用户登录</h2>
              <div class="form-group">
                <label for="username">账号</label>
                <input id="username" class="form-input" v-model="username" placeholder="请输入账号" />
              </div>
              <div class="form-group">
                <label for="password">密码</label>
                <input id="password" class="form-input" v-model="password" type="password" placeholder="请输入密码" />
              </div>
              <div class="form-group captcha">
                <label for="valiCode">验证码</label>
                <div class="captcha-container">
                  <input id="valiCode" class="form-input captcha-input" v-model="valiCode" placeholder="请输入验证码" />
                  <img @click="changeValiCode()" :src="img" alt="Captcha" class="captcha-image" />
                </div>
              </div>
              <div class="form-group">
                <el-select @change="changeUser" v-model="username" placeholder="填入示例账户">
                  <el-option label="管理员示例账号" value="admin"></el-option>
                  <el-option label="教师示例账号" value="200799013517"></el-option>
                  <el-option label="学生示例账号" value="2022030001"></el-option>
                </el-select>
              </div>
              <div class="form-options">
                <label>
                  <input type="checkbox" v-model="remember" /> 记住密码
                </label>
                <span @click="forgetPass()" class="forgot-password">忘记密码</span>
              </div>
              <div class="action-buttons">
                <button @click="loginSubmit()" class="btn btn-primary">登录</button>
                <button @click="pageRegister()" class="btn btn-secondary">新用户注册</button>
              </div>
            </div>

            <!-- Password Reset Form -->
            <div v-if="pageType == 2">
              <h2 class="form-title">密码重置</h2>
              <div class="form-group">
                <label for="reset-username">登录账号</label>
                <input id="reset-username" class="form-input" v-model="username" placeholder="填写教师号/学号" />
              </div>
              <div class="form-group">
                <label for="email">电子邮箱</label>
                <input id="email" class="form-input" v-model="email" placeholder="请输入邮箱" />
              </div>
              <div class="form-group captcha">
                <label for="reset-valiCode">验证码</label>
                <div class="captcha-container">
                  <input id="reset-valiCode" class="form-input captcha-input" v-model="valiCode" placeholder="请输入验证码" />
                  <img @click="changeValiCode()" :src="img" alt="Captcha" class="captcha-image" />
                </div>
              </div>
              <div class="form-actions">
                <button @click="initPassword()" class="btn btn-primary">初始密码</button>
                <button @click="backLogin()" class="btn btn-secondary">返回登录</button>
              </div>
            </div>

            <!-- Register Form -->
            <div v-if="pageType == 3">
              <h2 class="form-title">用户注册</h2>
              <div class="form-group">
                <label for="register-username">账号</label>
                <input id="register-username" class="form-input" v-model="username" placeholder="填写账号" />
              </div>
              <div class="form-group">
                <label for="perName">姓名</label>
                <input id="perName" class="form-input" v-model="perName" placeholder="请输入姓名" />
              </div>
              <div class="form-group">
                <label for="register-password">密码</label>
                <input id="register-password" class="form-input" v-model="password" type="password" />
              </div>
              <div class="form-group">
                <label for="register-email">邮箱</label>
                <input id="register-email" class="form-input" v-model="email" placeholder="请输入邮箱" />
              </div>
              <div class="form-group">
                <label for="role">角色</label>
                <select id="role" class="form-input" v-model="role">
                  <option value="ADMIN">管理员</option>
                  <option value="STUDENT">学生</option>
                  <option value="TEACHER">教师</option>
                </select>
              </div>
              <div class="form-group captcha">
                <label for="register-valiCode">验证码</label>
                <div class="captcha-container">
                  <input id="register-valiCode" class="form-input captcha-input" v-model="valiCode"
                    placeholder="请输入验证码" />
                  <img @click="changeValiCode()" :src="img" alt="Captcha" class="captcha-image" />
                </div>
              </div>
              <div class="form-actions">
                <button @click="register()" class="btn btn-primary">注册提交</button>
                <button @click="backLogin()" class="btn btn-secondary">返回登录</button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </main>

    <!-- Footer Area -->
    <footer class="footer">
      <p class="footer-text">Copyright © 山东大学软件学院</p>
    </footer>
  </div>
</template>

<style scoped>
.flex-col {
  display: flex;
  flex-direction: column;
}


body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  background-image: url('/backgroud.png');
  background-position-x: center;
  /* background color: #333; */
}

.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background: #930e14;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
}

.welcome-text {
  font-size: 16px;
}

.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 500px;
  width: 100%;
  opacity: 0.9;
}

.form-section {
  display: flex;
  flex-direction: column;
}

.form-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #930e14;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.captcha-container {
  display: flex;
  align-items: center;
}

.captcha-input {
  flex: 1;
  margin-right: 10px;
}

.captcha-image {
  width: 100px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.forgot-password {
  color: #930e14;
  cursor: pointer;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.btn-primary {
  background: #930e14;
  color: white;
}

.btn-secondary {
  background: #f8f9fa;
  color: #930e14;
  border: 1px solid #930e14;
}

.footer {
  background: #930e14;
  color: white;
  text-align: center;
  padding: 10px 20px;
}

.footer-text {
  margin: 0;
}

.form-group label {
  white-space: nowrap;
  align-content: center;
  padding-right: 1%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active in <2.1.8 */
  {
  transform: translateX(10px);
  opacity: 0;
}

.login-page {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  /* Ensure the div covers the viewport height */
  background: linear-gradient(to bottom right, #f8f9fa, #e9ecef);
  background-image: url('/backgroud.png');
  background-position: center;
  background-size: cover;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppStore } from "./stores/app";
import {
  getValidateCode,
  testValidateInfo,
  resetPassWord,
  registerUser,
} from "./services/mainServ";
import { message } from "./tools/messageBox";
import router from "./router";
import { Base64 } from "js-base64";
function checkNotEmpty(value: string): boolean | string {
  if (value) return true;

  return "您必须输入用户名密码";
}
const USER_KEY = "UserKey";
export default defineComponent({
  //返回的数据，templte中使用的数据
  data: () => ({
    // username: '2022030001',
    // username: 'admin',
    // password: '123456',
    username: "",
    password: "",
    valiCode: "",
    pageType: 1,
    id: 0,
    jwt: "",
    img: "",
    funId: "",
    vueName: "",
    loginCode: "",
    email: "",
    messageCode: "",
    showSlider: false,
    remember: true,
    role: "STUDENT",
    perName: "",
    rules: [checkNotEmpty],
  }),
  //页面加载前执行的函数 设置初始为登录界面
  beforeMount() {
    this.pageType = 1;
  },
  //页面加载后执行的函数， 执行性一次， 从后台请求验证码，从浏览器获取上次登录的用户信息作为用户和密码的初始值
  async created() {
    const res = await getValidateCode();
    this.id = res.validateCodeId;
    this.img = res.img;
    const store = useAppStore();
    if (store.remember) {
      this.username = Base64.decode(store.usernameSave);
      this.password = Base64.decode(store.passwordSave);
      this.remember = true;
    } else {
      this.username = "";
      this.password = "";
      this.remember = false;
    }
  },
  //页面加载后执行的函数， 执行性多次
  methods: {
    //刷新验证码
    async changeValiCode() {
      const res = await getValidateCode();
      this.id = res.validateCodeId;
      this.img = res.img;
      this.valiCode = "";
    },
    changeUser() {
      this.password = '123456'
    },
    //返回登录界面
    backLogin() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 1;
    },
    //忘记密码 显示密码设置表单显示
    forgetPass() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 2;
    },
    //用户注册 显示用户注册表单
    pageRegister() {
      this.username = "";
      this.password = "";
      this.valiCode = "";
      this.pageType = 3;
    },
    // 初始密码 请求后台服务，将发送初始密码到邮箱
    async initPassword() {
      let res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "账号为空,请填写账号");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        message(this, "邮箱为空,请填写邮箱");
        return;
      }
      res = await resetPassWord({
        username: this.username,
        email: this.email,
      });
      if (res.code == 0) {
        message(this, "初始密码已发送至您的邮箱，请注意查收");
        this.changeValiCode();
        this.pageType = 1;
      } else {
        message(this, res.msg);
      }
    },
    //用户注册 请求后台服务，将用户注册信息发送到后台，后台添加账户人员教师或学生信息
    async register() {
      let res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "账号为空,请填写账号");
        return;
      }
      if (this.password == "" || this.password == undefined) {
        message(this, "账号为空,请填写密码");
        return;
      }
      if (this.perName == "" || this.perName == undefined) {
        message(this, "姓名为空,请填写姓名");
        return;
      }
      if (this.email == "" || this.email == undefined) {
        message(this, "邮箱为空,请填写邮箱");
        return;
      }
      if (this.role == "" || this.role == undefined) {
        message(this, "角色为空,请选择角色");
        return;
      }
      res = await registerUser({
        username: this.username,
        password: this.password,
        perName: this.perName,
        email: this.email,
        role: this.role,
      });
      if (res.code == 0) {
        message(this, "已注册成功！");
        this.changeValiCode();
        this.pageType = 1;
      } else {
        message(this, res.msg);
      }
    },
    //登录请求后台服务，将用户登录信息发送到后台，后台验证用户信息，返回jwt
    async loginSubmit() {
      const res = await testValidateInfo({
        validateCodeId: this.id,
        validateCode: this.valiCode,
      });
      if (res.code != 0) {
        message(this, res.msg);
        this.changeValiCode();
        return;
      }
      if (this.username == "" || this.username == undefined) {
        message(this, "用户名为空");
      } else if (this.password == "" || this.password == undefined) {
        message(this, "密码为空");
      } else {
        const store = useAppStore();
        try {
          //登录成功后，将用户信息保存到store中，将用户信息保存到浏览器中
          await store.login(this.username, this.password);
          await store.setNavi();
          if (this.remember) {
            store.saveAccount(
              Base64.encode(this.username),
              Base64.encode(this.password)
            );
          } else {
            store.removeAccount();
          }
          if (store.userInfo.roles == "ROLE_STUDENT") {
            router.push({ path: "/StudentIntroduce" });
          }
          else router.push({ path: "/MainPage" });
          //router.push({ path: "/MainPage" });
        } catch (err) {
          message(this, "登录失败!");
        }
      }
    },
  },
});
</script>
