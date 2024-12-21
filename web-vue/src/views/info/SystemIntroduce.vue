<template>
  <div class="base_form">
    <div class="table_center" style="margin-top: 5px">
      <table class="content">
        <tr>
          <td>
            <h1>系统介绍</h1>
            <p>欢迎使用我们的管理系统。本系统旨在提供一个高效、便捷的管理平台，帮助用户轻松管理各种信息。</p>
            <h2>主要功能</h2>
            <ul>
              <li><strong>用户管理：</strong>包括学生和教师的基本信息管理、家庭成员管理等。</li>
              <li><strong>课程管理：</strong>课程的添加、编辑和删除。</li>
              <li><strong>成绩管理：</strong>学生成绩的添加、编辑和查询。</li>
              <li><strong>作业管理：</strong>作业的发布、提交和批改。</li>
              <li><strong>考勤管理：</strong>学生请假和考勤记录管理。</li>
              <li><strong>创新实践管理：</strong>学生的创新实践活动管理。</li>
            </ul>
            <h2>技术栈</h2>
            <p>本系统基于以下技术构建：</p>
            <ul>
              <li>Vue 3</li>
              <li>Element Plus</li>
              <li>Vite</li>
              <li>Pinia</li>
              <li>TypeScript</li>
              <li>Axios</li>
            </ul>
            <p>我们希望本系统能够帮助您更高效地管理信息，提升工作效率。</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style scoped>
.base_form {
  padding: 20px;
}

.table_center {
  display: flex;
  justify-content: center;
}

.content {
  width: 80%;
  border-collapse: collapse;
}

.content h1,
.content h2 {
  margin: 10px 0;
}

.content p,
.content ul {
  margin: 10px 0;
}

.content ul {
  list-style-type: disc;
  padding-left: 20px;
}
</style>
