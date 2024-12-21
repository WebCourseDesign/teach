<template>
  <div class="base_form">
    <div class="base_header">
      <div class="blue_column"></div>
      <div class="base_title">修改密码</div>
    </div>
    <div class="base_prompt">
      密码强度要求三种字符类型（大小写、数字、特殊字符）及以上且密码长度为8位及以上！
    </div>
    <div class="form-container">
      <div class="form-group">
        <div class="label">旧密码</div>
        <div class="input-wrapper">
          <input v-model="oldPassword" type="password" />
        </div>
      </div>

      <div class="form-group">
        <div class="label">请输入新密码</div>
        <div class="input-wrapper">
          <input v-model="newPassword" type="password" />
          <div class="alarm">*密码长度最大为20位</div>
        </div>
      </div>

      <div class="form-group">
        <div class="label">再次输入新密码</div>
        <div class="input-wrapper">
          <input v-model="checkPassword" type="password" />
          <div class="alarm">*密码长度最大为20位</div>
        </div>
      </div>

      <div class="button-group">
        <button class="submit-btn" @click="submitPassword()">修改</button>
        <button class="reset-btn">重置</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { updatePassword } from "~/services/infoServ";
import { message } from "~/tools/messageBox";
export default defineComponent({
  data: () => ({
    passw: "password",
    oldPassword: "",
    newPassword: "",
    checkPassword: "",
    msg: "",
  }),
  methods: {
    // 提交密码
    submitPassword() {
      var msg = "";
      if (this.oldPassword === undefined || this.oldPassword === "") {
        msg = "旧密码为空不能修改";
      } else if (this.newPassword === undefined || this.newPassword === "") {
        msg = "新密码为空不能修改";
      } else if (this.oldPassword === this.newPassword) {
        msg = "新密码和旧密码相同，不能修改";
      } else if (this.checkPassword !== this.newPassword) {
        msg = "新密码和确认密码不相同，不能修改";
      } else {
        var c;
        var ch = false;
        var num = false;
        var other = false;
        for (var i = 0; i < this.newPassword.length; i++) {
          c = this.newPassword.charAt(i);
          if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            ch = true;
          } else if (c >= "0" && c <= "9") {
            num = true;
          } else {
            other = true;
          }
        }
        if (!ch || !num || !other) {
          msg =
            "密码至少包含大写字母、小写字母、数字和符号两种以上的类型，请重新输入！";
        } else if (this.newPassword.length < 8) {
          msg = "密码长度必须大于等于8个字符，请重新输入！";
        }
      }
      if (msg !== "") {
        message(this, msg);
      } else {
        updatePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        }).then((response) => {
          if (response.code == 0) {
            message(this, "提交成功");
          } else {
            message(this, response.msg);
          }
        });
      }
    },
  },
});
</script>
<style scoped>
.base_form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .form-group {
    flex-direction: row;
    align-items: center;
  }
}

.label {
  width: 100%;
  max-width: 150px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #202020;
}

@media (min-width: 768px) {
  .label {
    margin-bottom: 0;
    margin-right: 20px;
  }
}

.input-wrapper {
  flex: 1;
}

input {
  width: 100%;
  height: 42px;
  line-height: 42px;
  border: 1px solid #ddd;
  padding: 0 10px;
  box-sizing: border-box;
}

.alarm {
  font-size: 12px;
  color: #930e14;
  margin-top: 8px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
}

@media (min-width: 768px) {
  .button-group {
    flex-direction: row;
    justify-content: center;
    gap: 20px;
  }
}

.submit-btn,
.reset-btn {
  width: 100%;
  height: 42px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

@media (min-width: 768px) {

  .submit-btn,
  .reset-btn {
    width: 200px;
  }
}

.submit-btn {
  background-color: rgba(147, 14, 20, 1);
  color: white;
}

.reset-btn {
  background-color: rgba(226, 227, 228, 1);
  color: rgba(131, 131, 131, 1);
}

.base_prompt {
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
  padding: 0 20px;
}
</style>
