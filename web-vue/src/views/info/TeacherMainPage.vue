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
                        <el-button text @click="triggerFileInput()">上传头像</el-button>
                    </div>
                </template>
                <div class="teacher-info" v-if="teacherInfo">
                    <input type="file" id="file" accept="image/jpeg" style="display: none;" @change="uploadFile" />
                    <img :src="imgStr || '/user.png'" class="avatar" alt="avatar" />
                    <div class="info-details">
                        <p><b>工号:</b> {{ teacherInfo?.num }}</p>
                        <p><b>姓名:</b> {{ teacherInfo?.name }}</p>
                        <p><b>学院:</b> {{ teacherInfo?.dept }}</p>
                        <p><b>职称:</b> {{ teacherInfo?.title }}</p>
                        <p><b>学位:</b> {{ teacherInfo?.degree }}</p>
                        <p><b>邮箱:</b> {{ teacherInfo?.email }}</p>
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
                        <div v-for="(course, index) in courses.slice(0, 3)" :key="course.courseId" class="course-item">
                            <span>{{ course.name }}</span>
                            <br />
                            <span> 课程号: {{ course.num }}</span>
                            <span> 学分: {{ course.credit }}</span>
                        </div>
                        <div v-if="courses.length > 4" class="more-courses">
                            <button @click="$router.push('/course-panel')">更多</button>
                        </div>
                    </div>
                </div>
            </el-card>

            <!-- 新请假申请 -->
            <el-card class="stat-card">
                <template #header>
                    <div class="card-header">
                        <span>新请假申请</span>
                        <el-button text @click="$router.push('/absence-panel')">查看详情</el-button>
                    </div>
                </template>
                <div class="absence-list">
                    <el-empty v-if="!newAbsences.length" description="暂无新请假申请" />
                    <div v-else class="absence-items">
                        <div v-for="absence in newAbsences" :key="absence.id" class="absence-item">
                            <div class="absence-content">
                                <div class="absence-info">
                                    <p><b>学生:</b> {{ absence.student.numName }}</p>
                                    <p><b>开始时间:</b> {{ absence.start }}</p>
                                    <p><b>结束时间:</b> {{ absence.end }}</p>
                                    <p><b>原因:</b> {{ absence.reason }}</p>
                                </div>
                                <div class="absence-actions">
                                    <el-button type="success" size="small" class="vertical-text"
                                        @click="handleApprove(absence)">通过</el-button>
                                    <el-button type="danger" size="small" class="vertical-text"
                                        @click="handleReject(absence)">驳回</el-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="newAbsences.length === 4" class="more-absences">
                            <span>...</span>
                        </div>
                    </div>
                </div>
            </el-card>


        </div>
        <div class="dashboard-container">
            <!-- 快速入口 -->
            <el-card class="quick-access">
                <template #header>
                    <div class="card-header">
                        <span>快速入口</span>
                    </div>
                </template>
                <div class="button-group">
                    <el-button type="warning" @click="$router.push('/course-panel')">课程管理</el-button>
                    <el-button type="primary" @click="$router.push('/score-table-panel')">成绩管理</el-button>
                    <el-button type="success" @click="$router.push('/task-panel')">作业管理</el-button>
                    <el-button type="danger" @click="$router.push('/absence-panel')">考勤管理</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { getTeacherInfo } from '~/services/personServ'
import { getCourseByTeacher, getCourseItemOptionListByTeacher, getCourseList } from '~/services/teachingServ'
import { getPhotoImageStr, uploadPhoto } from '~/services/infoServ'
import { useAppStore } from '~/stores/app'
import { generalRequest } from "~/services/genServ";
import { message } from "~/tools/messageBox";
import { ElMessage } from "element-plus";
import { CourseItem } from "~/models/general";
import { getAbsenceList, approved, disagree } from '~/services/absenceServ'

const teacherInfo = ref()
const imgStr = ref('')
const course2 = ref()
const courses = ref<CourseItem[]>([])
const newAbsences = ref([])
const appStore = useAppStore()
const triggerFileInput = () => {
    const fileInput = document.querySelector('#file') as HTMLInputElement
    if (fileInput) {
        fileInput.click()
    }
}
const uploadFile = async () => {
    const fileInput = document.querySelector('#file') as HTMLInputElement;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        ElMessage.error('请选择文件');
        return;
    }
    const file = fileInput.files[0];
    /* if (file.type != 'image/jpeg') {
        ElMessage.error('只能上传图片格式的文件')
        return
    } */
    const res = await uploadPhoto(teacherInfo.value.personId + ".jpg", file);
    if (res.code === 0) {
        ElMessage.success('上传成功');
        const result = await getPhotoImageStr(teacherInfo.value.personId + ".jpg");
        imgStr.value = result.data;
    } else {
        ElMessage.error('上传失败');
    }
};

const handleApprove = async (absence) => {
    try {
        await approved(absence)
        ElMessage.success('已通过请假申请')
        // Refresh absence list
        const absenceRes = await getAbsenceList()
        newAbsences.value = absenceRes.filter(item => item.approved === 0).slice(0, 4)
    } catch (error) {
        ElMessage.error('操作失败')
    }
}

const handleReject = async (absence) => {
    try {
        await disagree(absence)
        ElMessage.success('已拒绝请假申请')
        // Refresh absence list
        const absenceRes = await getAbsenceList()
        newAbsences.value = absenceRes.filter(item => item.approved === 0).slice(0, 4)
    } catch (error) {
        ElMessage.error('操作失败')
    }
}

onMounted(async () => {
    try {
        // 获取教师信息
        if (appStore.$state.userInfo.username) {
            const teacherRes = await generalRequest("/api/base/getByUsername", { username: appStore.$state.userInfo.username });
            console.log(teacherRes)
            teacherInfo.value = teacherRes.data
            if (teacherInfo.value.personId) {
                const photoRes = await getPhotoImageStr(teacherInfo.value.personId + '.jpg')
                imgStr.value = photoRes.data
                if (imgStr != null) imgStr.value = imgStr.value.replace('data:image/png;base64', 'data:image/jpeg;base64')
            }
        }
        // 获取教师课程列表
        const courseList = await getCourseByTeacher();
        courses.value = courseList.data.data;

        // 获取新请假申请
        const absenceRes = await getAbsenceList()
        newAbsences.value = absenceRes.filter(item => item.approved === 0).slice(0, 2)
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
    height: inherit;
}

.quick-access {
    height: fit-content;
}

.teacher-info {
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

.absence-items {
    display: grid;
    gap: 15px;
}

.absence-item {
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
}

.absence-item p {
    margin: 5px 0;
    color: #666;
}

.more-absences {
    text-align: center;
    color: #909399;
    padding: 10px;
}

.absence-content {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.absence-info {
    flex: 1;
}

.absence-actions {
    display: block;
    gap: 5px;
    justify-content: center;
}

.absence-actions button {
    width: 20px;
    height: fit-content;
    padding: 8px 0;
}

.vertical-text {
    writing-mode: vertical-lr;
    text-orientation: upright;
    letter-spacing: 2px;
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