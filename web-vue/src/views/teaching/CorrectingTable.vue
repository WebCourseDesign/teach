<template>
    <div class="p-2">
        <h3><span><h3><RightArrow/></h3></span>批改作业</h3>
        <div>
            <el-button @click="backPage">返回</el-button>
        </div>
        <div class="query_right" style="display: flex;align-items: center;justify-content: flex-end;">
            <el-form :inline="true">
                <el-form-item label="学生">
                    <el-select v-model="params.student.studentId">
                        <el-option v-for="item in students" :key="item.studentId" :label="item.numName" :value="item.studentId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="query">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-table :data="taskSubmitList">
            <el-table-column label="作业名称" prop="task.taskName"></el-table-column>
            <el-table-column label="课程名称" prop="task.course.name"></el-table-column>
            <el-table-column label="学生" prop="student.numName"></el-table-column>
            <el-table-column label="专业名称" prop="student.major"></el-table-column>
            <el-table-column label="分数" prop="score"></el-table-column>
            <el-table-column label="作业路径" prop="submitPath"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" plain @click="handleViewTask(scope.row)">查看作业</el-button>
                    <el-button type="success" @click="openMarkDialog(scope.row)" >打分</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { Student, TaskSubmit } from '~/models/Task';
import { getTaskSubmitsByTeacher, markTask, openFolder } from '../../services/taskSubmitServ';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getAllStudents } from '~/services/studentServ';

const students = ref<Student[]>([])

const taskSubmitList = ref<TaskSubmit[]>([])

const studentId = ref('')

const getTaskSubmitByTeacher = () => {
    
    // TODO: get task submit by teacher
    getTaskSubmitsByTeacher(params.value).then(res => {
        taskSubmitList.value = res.data.data
        console.log(taskSubmitList.value);
        
    })
}
const router = useRouter()
const handleViewTask = (taskSub) => {
    openFolder(taskSub.id).then(res => {
        console.log(res);
        
        if (!res.data) {
            ElMessage.error("没有该文件")
        }else{
            download(`${taskSub.task.taskName}-${taskSub.student.numName}.pdf`,res.data)
            
        }

    })
}

const openMarkDialog = (data:TaskSubmit) => {
    ElMessageBox.prompt(`为${data.student.numName}的${data.task.taskName}作业打分`, '打分', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'number'
    }).then(({ value }) => {
        console.log(value);
        mark(data,Number(value))
    })
}
const mark = (data:TaskSubmit,value:number) => {
    console.log(data,value);
    console.log(data);
    if(value < 0 || value > 100){
        ElMessageBox.alert('分数范围应为0-100')
        return;
    }
    data.score = value;
    markTask(data).then(res => {
        if (res.data.code !=0) {
            ElMessage.error(res.data.msg)
        }else{
            ElMessage.success('打分成功')
        }
        getTaskSubmitByTeacher()
    })

    
}

const getStudents = () => {
    getAllStudents().then(res => {
        students.value = res.data.data
        console.log(students.value);
        
    })
}

const params = ref<TaskSubmit>({
    student:{
        studentId:''
    }
})

const query = () => {
    getTaskSubmitsByTeacher(params.value).then(res => {
        taskSubmitList.value = res.data.data
        console.log(taskSubmitList.value);
        
    })
}

const backPage = () => {
    router.push('/task-panel')
}
const download = (fileanme: string, file:Blob) => {
      const blob = new Blob([file]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileanme;
      document.body.appendChild(link);
      link.click();
      document.removeChild(link);
      window.URL.revokeObjectURL(link);
}



onMounted(() => {
    getTaskSubmitByTeacher()
    getStudents()
})

</script>
<style scoped lang="scss"></style>