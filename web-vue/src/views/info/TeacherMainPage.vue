<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">教师工作台</div>
        </div>

        <div class="dashboard-container">
            <!-- 个人信息卡片 -->
            <el-card class="info-card">
                <template #header>
                    <div class="card-header">
                        <span>教师信息</span>
                        <el-button text @click="$router.push('/TeacherInfo')">编辑</el-button>
                    </div>
                </template>
                <div class="teacher-info" v-if="teacherInfo">
                    <img :src="imgStr || '/user.png'" class="avatar" alt="avatar" />
                    <div class="info-details">
                        <p><b>工号:</b> {{ teacherInfo.person?.num }}</p>
                        <p><b>姓名:</b> {{ teacherInfo.person?.name }}</p>
                        <p><b>学院:</b> {{ teacherInfo.person?.dept }}</p>
                        <p><b>职称:</b> {{ teacherInfo.title }}</p>
                        <p><b>学位:</b> {{ teacherInfo.degree }}</p>
                        <p><b>邮箱:</b> {{ teacherInfo.person?.email }}</p>
                    </div>
                </div>
            </el-card>

            <!-- 教学课程统计 -->
            <el-card class="stat-card">
                <template #header>
                    <div class="card-header">
                        <span>我的课程</span>
                        <el-button text @click="$router.push('/course-panel')">查看详情</el-button>
                    </div>
                </template>
                <div class="course-list">
                    <el-empty v-if="!courses.length" description="暂无课程" />
                    <div v-else class="course-items">
                        <div v-for="course in courses" :key="course.courseId" class="course-item">
                            <h4>{{ course.name }}</h4>
                            <p>课程编号: {{ course.num }}</p>
                            <p>学分: {{ course.credit }}</p>
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
                    <el-button type="primary" @click="$router.push('/score-table-panel')">成绩管理</el-button>
                    <el-button type="success" @click="$router.push('/task-panel')">作业管理</el-button>
                    <el-button type="warning" @click="$router.push('/absence-panel')">考勤管理</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTeacherInfo } from '~/services/personServ'
import { getCourseList } from '~/services/teachingServ'
import { getPhotoImageStr } from '~/services/infoServ'
import { useAppStore } from '~/stores/app'

const teacherInfo = ref()
const imgStr = ref('')
const courses = ref([])
const appStore = useAppStore()

onMounted(async () => {
    try {
        // 获取教师信息
        if (appStore.$state.userInfo.teacherId) {
            const teacherRes = await getTeacherInfo(appStore.$state.userInfo.teacherId)
            teacherInfo.value = teacherRes
            if (teacherInfo.value?.person?.personId) {
                const photoRes = await getPhotoImageStr(teacherInfo.value.person.personId + '.jpg')
                imgStr.value = photoRes.data
            }
        }

        // 获取教师课程列表
        const courseRes = await getCourseList()
        courses.value = courseRes.filter(c =>
            c.teacher?.teacherId === appStore.$state.userInfo.teacherId
        )
    } catch (error) {
        console.error('Error loading teacher dashboard:', error)
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
.stat-card {
    height: fit-content;
}

.quick-access {
    height: fit-content;
    width: fit-content
}

.teacher-info {
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

.course-list {
    padding: 10px;
}

.course-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.course-item {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.course-item h4 {
    margin: 0 0 10px 0;
    color: #409EFF;
}

.course-item p {
    margin: 5px 0;
    color: #666;
}

@media (max-width: 768px) {
    .teacher-info {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .button-group {
        justify-content: center;
    }
}
</style>