// Composables
import path from "path";
import { createRouter, createWebHistory } from "vue-router";
//路由表
const routes = [
  //当路由为空时，重定向到登录页面
  {
    path: "/",
    redirect: "/Login",
  },
  //登录页面
  {
    path: "/Login",
    name: "Login",
    component: () => import("~/Login.vue"),
  },
  //主页面
  {
    path: "/MainPage",
    name: "MainPage",
    component: () => import("~/views/MainPage.vue"),
  },
  {
    path: "/SystemIntroduce",
    name: "SystemIntroduce",
    component: () => import("~/views/info/SystemIntroduce.vue"),
  },
  {
    path: "/Password",
    name: "Password",
    component: () => import("~/views/info/Password.vue"),
  },
  {
    path: "/StudentIntroduce",
    name: "StudentIntroduce",
    component: () => import("~/views/info/StudentIntroduce.vue"),
  },
  {
    path: "/StudentMainPage",
    name: "StudentMainPage",
    component: () => import("~/views/info/StudentMainPage.vue"),
  },
  {
    path: "/TeacherIntroduce",
    name: "TeacherIntroduce",
    component: () => import("~/views/info/TeacherIntroduce.vue"),
  },
  {
    path: "/TeacherMainPage",
    name: "TeacherMainPage",
    component: () => import("~/views/info/TeacherMainPage.vue"),
  },
  {
    path: "/menu-manage-panel",
    name: "MenuManage",
    component: () => import("~/views/system/MenuManage.vue"),
  },
  {
    path: "/dictionary-manage-panel",
    name: "DictionaryManage",
    component: () => import("~/views/system/DictionaryManage.vue"),
  },

  {
    path: "/student-panel",
    name: "StudentTable",
    component: () => import("~/views/person/StudentTable.vue"),
  },
  {
    path: "/StudentInfo",
    name: "StudentInfo",
    component: () => import("~/views/person/StudentInfo.vue"),
  },
  {
    path: "/FamilyMember",
    name: "FamilyMember",
    component: () => import("~/views/person/FamilyMember.vue"),
  },
  {
    path: "/teacher-panel",
    name: "teacherTable",
    component: () => import("~/views/person/TeacherTable.vue"),
  },
  {
    path: "/TeacherInfo",
    name: "TeacherInfo",
    component: () => import("~/views/person/TeacherInfo.vue"),
  },

  {
    path: "/course-panel",
    name: "CourseTable",
    component: () => import("~/views/teaching/CourseTable.vue"),
  },
  {
    path: "/score-table-panel",
    name: "ScoreTable",
    component: () => import("~/views/teaching/ScoreTable.vue"),
  },
  {
    path: "/honor-panel",
    name: "HonorTable",
    component: () => import("~/views/teaching/HonorTable.vue"),
  },
  {
    path: "/daily-activity-panel",
    name: "DailyActivityTable",
    component: () => import("~/views/teaching/DailyActivityTable.vue"),
  },
  {
    path: "/innovation-panel",
    name: "InnovationTable",
    component: () => import("~/views/teaching/InnovationTable.vue"),
  },
  {
    path: "/absence-panel",
    name: "AbsenceTable",
    component: () => import("~/views/teaching/AbsenceTable.vue"),
  },
  {
    path: "/select-course-panel",
    name: "SelectCourseTable",
    component: () => import("~/views/teaching/SelectCourseTable.vue"),
  },
  {
    path: "/task-panel",
    name: "TaskTable",
    component: () => import("~/views/teaching/TaskTable.vue"),
  },
  {
    path: "/correcting-panel",
    name: "CorrectingTable",
    component: () => import("~/views/teaching/CorrectingTable.vue"),
  },
];
//路由创建
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
//路由导出
export default router;
