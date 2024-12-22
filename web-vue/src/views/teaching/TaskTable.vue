<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">作业管理</div>
        </div>

        <div class="base_query_oneLine">
            <div class="query_left">
                <el-button class="commButton" type="primary" @click="addItem()"
                    v-if="appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">发布作业</el-button>
            </div>
            <div class="query_right">


            </div>
        </div>
        <!-- 这里是发布作业的记录 -->
        <div class="table_center" style="margin-top: 5px">
            <el-table :data="taskList">
                <el-table-column label="id" prop="taskId" />
                <el-table-column label="作业名称" prop="taskName" />
                <el-table-column label="作业编号" prop="taskNo" />
                <el-table-column label="上传路径" prop="taskPath" />
                <el-table-column label="课程" prop="course.name" />
                <el-table-column label="状态" prop="state">
                    <template #default="scope">
                        <el-tag v-if="scope.row.state === 0" type="warning">无人提交</el-tag>
                        <el-tag v-if="scope.row.state === 1" type="success">有提交</el-tag>
                        <el-tag v-if="scope.row.state === 2" type="danger">正在批改</el-tag>
                        <el-tag v-if="scope.row.state === 3" type="danger">批改完成</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="到期时间" prop="overTime" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button @click="editItem(scope.row)" type="success"
                                v-if="appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">编辑</el-button>
                            <el-button @click="toCorrecting()" type="warning"
                                v-if="appStore.$state.userInfo.roles.includes('ROLE_TEACHER') && scope.row.state != 0">批改</el-button>
                            <el-upload :headers="authToken"
                                :action="'http://202.194.14.120:22222/api/task/upload/' + scope.row.taskId"
                                v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT') && scope.row.state != 3"
                                :on-success="getPublicTask" :accept="'application/pdf'">
                                <template #trigger>
                                    <el-button type="primary">select file</el-button>
                                </template>
                            </el-upload>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 这里是历史作业记录和成绩 -->
        <div style="display: flex; justify-content: center; margin-top: 10px;"
            v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">

            <h2>历史作业记录</h2>
        </div>
        <div class="table_center" style="margin-top: 5px">
            <el-table :data="historyList">
                <el-table-column label="id" prop="id" />
                <el-table-column label="作业名称" prop="task.taskName" />
                <el-table-column label="作业编号" prop="task.taskNo" />
                <el-table-column label="课程" prop="task.course.name" />
                <el-table-column label="成绩">
                    <template #default="scope">
                        <span>{{ scope.row.score }}</span>
                    </template>
                </el-table-column>

            </el-table>

        </div>
    </div>
    <!-- 作业修改对话框显示 -->
    <el-dialog id="favDialog" v-model="dialogVisible" width="400px">
        <template #header>
            <h1>作业添加修改对话框</h1>
        </template>
        <!-- <div class="base_title">成绩添加修改对话框</div> -->
        <!-- <div class="dialog-div" style="margin-top: 5px"> -->
        <el-form label-width="80px" :model="editedItem" ref="form">
            <el-form-item label="作业编号">
                <el-input v-model="editedItem.taskNo"></el-input>
            </el-form-item>
            <el-form-item label="过期时间">
                <el-date-picker type="datetime" v-model="editedItem.overTime" placeholder="选择日期时间"
                    format="YYYY/MM/DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="作业名称">
                <el-input v-model="editedItem.taskName"></el-input>
            </el-form-item>
            <el-form-item label="上传路径">
                <el-input v-model="editedItem.taskPath" placeholder="上传路径"></el-input>
            </el-form-item>
            <el-form-item label="课程">
                <el-select v-model="editedItem.course.courseId">
                    <el-option v-for="item in courseList" :key="item.courseId" :label="item.name"
                        :value="item.courseId"></el-option>
                </el-select>
            </el-form-item>




            <!-- <el-form-item>
            <el-button @click="handleClose" style="margin-right: 30px">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </el-form-item> -->
        </el-form>
        <div style="display: flex; justify-content: center; margin-top: 10px">
            <el-button type="primary" @click="confirm">确认</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
        </div>
        <!-- </div> -->
    </el-dialog>

</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '~/stores/app'
import { OptionItem } from '~/models/general'
import { getStudentItemOptionList } from '~/services/teachingServ'
import { Course, TaskSubmit } from '~/models/Task';
import { Task } from '../../models/Task';
import { addAndEditTask, getTaskByStudent, getTasksByTeacher } from '../../services/taskServ';
import { getCourseByTeacher } from '../../services/teachingServ';
import { useRouter } from 'vue-router'
import { getHistoryTaskSubmit } from '~/services/taskSubmitServ'
import { cloneDeep } from 'lodash';
const dialogVisible = ref(false)
const studentList = ref<OptionItem[]>([])
const courseList = ref<Course[]>([])
const studentId = ref('')
const taskList = ref([])
const historyList = ref<TaskSubmit[]>([])
const courseId = ref('')
const authToken = ref({
    Authorization: ''
})
const editedItem = ref<Task>({
    taskId: 0,
    state: 0,
    taskNo: '',
    taskPath: '',
    taskName: '',
    overTime: '',
    course: {
        courseId: '',
        num: '',
        teacher: {
            teacherId: '',
            person: {
                personId: '',
                num: ''
            },
            course: []
        }
    },

})
const initForm = () => {
    editedItem.value = {
        taskId: 0,
        state: 0,
        taskNo: '',
        taskPath: 'D:/teach/web/2023/attach',
        taskName: '',
        overTime: '',
        course: {
            courseId: '',
            num: '',
            teacher: {
                teacherId: '',
                person: {
                    personId: '',
                    num: ''
                },
                course: []
            }
        },
    }
}
const appStore = useAppStore()

const getList = () => {
    getTasksByTeacher().then(res => {
        taskList.value = res.data.data
    })

}

const getStudentList = async () => {
    getStudentItemOptionList().then(res => {
        studentList.value = res
        console.log(studentList.value);

    })
}
const addItem = () => {
    // addAndEditHonor(editedItem.value).then(res => {
    //     console.log(res)
    // })
    console.log(editedItem.value);
    dialogVisible.value = true
    initForm()
}

const editItem = (item: Task) => {
    editedItem.value = cloneDeep(item)
    dialogVisible.value = true
}
const confirm = () => {
    if (editedItem.value.course.courseId == '' || editedItem.value.overTime == '' || editedItem.value.taskName == '' || editedItem.value.taskNo == '' || editedItem.value.taskPath == '') {
        ElMessageBox.alert('请填写完整信息')
        return
    }

    addAndEditTask(editedItem.value).then(res => {
        console.log(res)
        dialogVisible.value = false
        getList()
    })

    initForm()

}
const getCourse = () => {
    getCourseByTeacher().then(res => {
        courseList.value = res.data.data
    })
}

const getPublicTask = () => {
    getTaskByStudent().then(res => {
        taskList.value = res.data.data
    })
}
const router = useRouter()

const toCorrecting = () => {
    router.push({ path: '/correcting-panel' })
}

const getHistoryList = () => {
    getHistoryTaskSubmit().then(res => {
        historyList.value = res.data.data
    })
}



onMounted(() => {
    // getStudentList()
    if (appStore.$state.userInfo.roles.includes('ROLE_TEACHER')) {
        getList()
        getCourse()
    }
    if (appStore.$state.userInfo.roles.includes('ROLE_STUDENT')) {
        getPublicTask()
        getHistoryList()
    }
    authToken.value.Authorization = `Bearer ${useAppStore().userInfo.jwtToken}`
})

</script>

<style scoped lang="scss">
.form-inline .el-input {
    --el-input-width: 220px;
}

.form-inline .el-select {
    --el-select-width: 220px;
}
</style>