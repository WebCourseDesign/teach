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
                        <el-button text @click="$router.push('/StudentIntroduce')">查看详情</el-button>
                    </div>
                </template>
                <div class="student-info" v-if="studentInfo">
                    <img :src="imgStr || '/user.png'" class="avatar" alt="avatar" />
                    <div class="info-details">
                        <p><b>学号:</b> {{ studentInfo.person?.num }}</p>
                        <p><b>姓名:</b> {{ studentInfo.person?.name }}</p>
                        <p><b>学院:</b> {{ studentInfo.person?.dept }}</p>
                        <p><b>专业:</b> {{ studentInfo.major }}</p>
                        <p><b>班级:</b> {{ studentInfo.className }}</p>
                        <p><b>邮箱:</b> {{ studentInfo.person?.email }}</p>
                    </div>
                </div>
            </el-card>

            <!-- 近期作业 -->
            <el-card class="task-card">
                <template #header>
                    <div class="card-header">
                        <span>近期作业</span>
                        <el-button text @click="$router.push('/homework-panel')">全部作业</el-button>
                    </div>
                </template>
                <div class="task-list">
                    <el-empty v-if="!recentTasks.length" description="暂无待交作业" />
                    <div v-else class="task-items">
                        <div v-for="task in recentTasks" :key="task.id" class="task-item">
                            <h4>{{ task.name }}</h4>
                            <p>课程: {{ task.courseName }}</p>
                            <p>截止时间: {{ task.endTime }}</p>
                            <el-tag :type="getTaskStatus(task).type">
                                {{ getTaskStatus(task).text }}
                            </el-tag>
                        </div>
                    </div>
                </div>
            </el-card>

            <!-- 快速入口 -->
            <el-card class="quick-access">
                <template #header>
                    <div class="card-header">
                        <span>快速入口</span>
                    </div>
                </template>
                <div class="button-group">
                    <el-button type="primary" @click="$router.push('/select-course')">选课管理</el-button>
                    <el-button type="success" @click="$router.push('/score-panel')">成绩查询</el-button>
                    <el-button type="warning" @click="$router.push('/absence-panel')">请假管理</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getStudentInfo } from '~/services/personServ'
import { getStudentHomeworkList } from '~/services/studentServ' // Changed import
import { getPhotoImageStr } from '~/services/infoServ'
import { useAppStore } from '~/stores/app'

const studentInfo = ref()
const imgStr = ref('')
const recentTasks = ref([])
const appStore = useAppStore()

const getTaskStatus = (task) => {
    const now = new Date().getTime()
    const end = new Date(task.endTime).getTime()

    if (task.submitted) {
        return { type: 'success', text: '已提交' }
    } else if (now > end) {
        return { type: 'danger', text: '已截止' }
    } else {
        return { type: 'warning', text: '未提交' }
    }
}

onMounted(async () => {
    try {
        // 获取学生信息
        if (appStore.$state.userInfo.studentId) {
            const studentRes = await getStudentInfo(appStore.$state.userInfo.studentId)
            studentInfo.value = studentRes
            if (studentInfo.value?.person?.personId) {
                const photoRes = await getPhotoImageStr(studentInfo.value.person.personId + '.jpg')
                imgStr.value = photoRes.data
            }
        }

        // 获取近期作业列表
        const homeworkRes = await getStudentHomeworkList() // Changed function call
        recentTasks.value = homeworkRes.slice(0, 5) // 只显示最近5个作业
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
.task-card {
    height: fit-content;
}

.quick-access {
    height: fit-content;
    width: fit-content;
}

.student-info {
    display: flex;
    gap: 20px;
    padding: 10px;
}

.avatar {
    width: 120px;
    height: 120px;
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

.task-list {
    padding: 10px;
}

.task-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.task-item {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.task-item h4 {
    margin: 0 0 10px 0;
    color: #409EFF;
}

.task-item p {
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
