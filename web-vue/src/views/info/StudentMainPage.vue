<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">学生工作台</div>
        </div>

        <div class="dashboard-container">
            <!-- 个人信息卡片 -->
            <el-card class="info-card">
                <template #header>
                    <div class="card-header">
                        <span>学生信息</span>
                        <el-button text @click="$router.push('/StudentIntroduce')">详细信息</el-button>
                    </div>
                </template>
                <div class="student-info" v-if="studentInfo">
                    <img :src="imgStr || defaultAvatar" class="avatar" alt="avatar" />
                    <div class="info-details">
                        <p><b>学号:</b> {{ studentInfo.num }}</p>
                        <p><b>姓名:</b> {{ studentInfo.name }}</p>
                        <p><b>学院:</b> {{ studentInfo.dept }}</p>
                        <p><b>专业:</b> {{ studentInfo.major }}</p>
                        <p><b>班级:</b> {{ studentInfo.className }}</p>
                        <p><b>邮箱:</b> {{ studentInfo.email }}</p>
                    </div>
                </div>
            </el-card>

            <!-- 近期作业卡片 -->
            <el-card class="task-card">
                <template #header>
                    <div class="card-header">
                        <span>近期作业</span>
                        <el-button text @click="$router.push('/task-panel')">查看全部</el-button>
                    </div>
                </template>
                <div class="task-list">
                    <el-empty v-if="!recentTasks.length" description="暂无待交作业" />
                    <div v-else class="task-items">
                        <div v-for="task in recentTasks" :key="task.taskId" class="task-item">
                            <h4>{{ task.taskName }}</h4>
                            <p>课程: {{ task.course?.name }}</p>
                            <p>截止时间: {{ task.overTime }}</p>
                            <el-tag :type="getTaskStatusType(task.state)">{{ getTaskStatusText(task.state) }}</el-tag>
                        </div>
                    </div>
                </div>
            </el-card>

            <!-- 请假信息卡片 -->
            <el-card class="absence-card">
                <template #header>
                    <div class="card-header">
                        <span>请假记录</span>
                        <el-button text @click="$router.push('/absence-panel')">查看全部</el-button>
                    </div>
                </template>
                <div class="absence-list">
                    <el-empty v-if="!absenceList.length" description="暂无请假记录" />
                    <div v-else class="absence-items">
                        <div v-for="absence in absenceList" :key="absence.id" class="absence-item">
                            <p>开始时间: {{ absence.start }}</p>
                            <p>结束时间: {{ absence.end }}</p>
                            <el-tag :type="getAbsenceStatusType(absence.approved)">
                                {{ getAbsenceStatusText(absence.approved) }}
                            </el-tag>
                        </div>
                    </div>
                </div>
            </el-card>


        </div>
        <!-- 快速入口 -->
        <div class="dashboard-container">
            <el-card class="quick-access">
                <template #header>
                    <div class="card-header">
                        <span>快速入口</span>
                    </div>
                </template>
                <div class="button-group">
                    <el-button type="primary" @click="$router.push('/score-table-panel')">成绩查询</el-button>
                    <el-button type="success" @click="$router.push('/select-course-panel')">选课系统</el-button>
                    <el-button type="warning" @click="$router.push('/StudentIntroduce')">个人画像</el-button>
                    <el-button type="danger" @click="$router.push('/daily-activity-panel')">日常活动管理</el-button>
                    <el-button type="primary" @click="$router.push('/honor-panel')">荣誉管理</el-button>
                    <el-button type="success" @click="$router.push('/innovation-panel')">创新实践管理</el-button>
                    <el-button type="warning" @click="$router.push('/absence-panel')">考勤管理</el-button>
                </div>
            </el-card>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getStudentInfo } from '~/services/personServ'
import { getTaskByStudent } from '~/services/taskServ'
import { getAbsenceList } from '~/services/absenceServ'
import { useAppStore } from '~/stores/app'

import {
    getStudentIntroduceData,
    getPhotoImageStr,
    uploadPhoto,
} from "~/services/infoServ";
import { generalRequest, getPersonByUserId } from '~/services/genServ'

const studentInfo = ref()
const imgStr = ref('') // 改为 ref 声明
const defaultAvatar = '/user.png' // 添加默认头像路径
const recentTasks = ref([])
const absenceList = ref([])
const appStore = useAppStore()

const getTaskStatusType = (state: number) => {
    switch (state) {
        case 0: return 'warning'  // 未提交
        case 1: return 'success'  // 已提交
        case 2: return 'info'     // 批改中
        case 3: return ''         // 已批改
        default: return ''
    }
}

const getTaskStatusText = (state: number) => {
    switch (state) {
        case 0: return '未提交'
        case 1: return '已提交'
        case 2: return '批改中'
        case 3: return '已批改'
        default: return '未知状态'
    }
}

const getAbsenceStatusType = (status: number) => {
    switch (status) {
        case 0: return 'warning'  // 未审批
        case 1: return 'success'  // 已通过
        case 2: return 'danger'   // 不通过
        default: return ''
    }
}

const getAbsenceStatusText = (status: number) => {
    switch (status) {
        case 0: return '待审批'
        case 1: return '已通过'
        case 2: return '未通过'
        default: return '未知状态'
    }
}

onMounted(async () => {
    try {
        // 获取学生信息
        if (appStore.$state.userInfo.username) {
            const studentRes = await generalRequest("/api/base/getByUsername", {
                username: appStore.$state.userInfo.username,
            })
            studentInfo.value = studentRes.data;
            //console.log(studentRes)
            //console.log(studentInfo.value.personId)
            if (studentInfo.value.personId) {
                const photoRes = await getPhotoImageStr(studentInfo.value.personId + '.jpg')
                imgStr.value = photoRes.data // 使用 .value 赋值
                if (imgStr.value != null) imgStr.value = imgStr.value.replace('data:image/png;base64', 'data:image/jpeg;base64')
                //console.log(imgStr.value)
            }
        }

        // 获取近期作业
        const taskRes = await getTaskByStudent()
        recentTasks.value = taskRes.data.data.slice(0, 2) // 只显示最近2个作业

        // 获取请假记录
        const absenceRes = await getAbsenceList()
        absenceList.value = absenceRes.slice(0, 2) // 只显示最近2条记录
    } catch (error) {
        console.error('Error loading student dashboard:', error)
    }
})
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.info-card,
.task-card,
.absence-card {
    height: inherit;

}

.quick-access {
    height: fit-content;
}

.student-info {
    display: flex;
    gap: 20px;
    padding: 10px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}

.info-details p {
    margin: 8px 0;
    line-height: 1.4;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    padding: 10px;
}

.task-items,
.absence-items {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.task-item,
.absence-item {
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.task-item h4 {
    margin: 0 0 10px 0;
    color: #409EFF;
}

.task-item p,
.absence-item p {
    margin: 5px 0;
    color: #666;
}

@media (max-width: 768px) {
    .student-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .button-group {
        justify-content: center;
    }
}
</style>
