<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">考勤管理</div>
        </div>

        <div class="base_query_oneLine">
            <div class="query_left">
                <el-button class="commButton" type="primary" @click="addItem()"
                    v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">添加</el-button>
            </div>
            <div class="query_right" v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN')||appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">
                <el-form :inline="true">
                    <el-form-item label="学生">
                        <el-select v-model="studentId">
                            <el-option v-for="item in studentList" :label="item.title" :key="item.id"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="default" class="commButton" @click="query()">查询</el-button>
                      <el-button type="default" class="commButton" @click="reset()">重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
        </div>
        <div class="table_center" style="margin-top: 5px">
            <el-table :data="absenceList">
                <el-table-column label="id" prop="id" />
                <el-table-column label="学生" prop="student.numName" />
                <!-- <el-table-column label="原因" prop="reason" /> -->
                <!-- <el-table-column label="开始时间" prop="start" />
                <el-table-column label="结束时间" prop="end" /> -->
                <el-table-column label="审批状态" prop="approved" >
                    <template #default="scope">
                        <el-tag v-if="scope.row.approved === 0" type="warning">未审批</el-tag>
                        <el-tag v-if="scope.row.approved === 1" type="success">已通过</el-tag>
                        <el-tag v-if="scope.row.approved === 2" type="danger">不同意</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="审批人" prop="approver.name" />
                <el-table-column label="审批时间" prop="approvedTime" />
                <el-table-column label="操作" >
                    <template #default="scope">
                        <el-button-group>
                          <el-button
                              @click="editItem(scope.row)"
                              type="success"
                              v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')"
                              :disabled="scope.row.approved === 1 || scope.row.approved === 2"
                          >编辑</el-button>
                          <el-button @click="editItem(scope.row)" type="success" v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN')||appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">查看学生请假信息</el-button>
<!--                            <el-popconfirm title="确定要审批吗?" confirm-button-text="同意" cancel-button-text="不同意" @confirm="approvedAbsence(scope.row)" @cancel="disagreeAbsence(scope.row)" v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN') || appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">-->
<!--                                <template #reference>-->
<!--                                    <el-button type="danger" :disabled="scope.row.approved !== 0">审批</el-button>-->
<!--                                </template>-->
<!--                                &lt;!&ndash; <template #actions="{ approvedAbsence, disagreeAbsence }">-->
<!--                                    <el-button size="small" @click="disagreeAbsence(scope.row)">不同意</el-button>-->
<!--                                    <el-button-->
<!--                                      type="danger"-->
<!--                                      size="small"-->
<!--                                      @click="approvedAbsence(scope.row)"-->
<!--                                    >-->
<!--                                      同意-->
<!--                                    </el-button>-->
<!--                                  </template> &ndash;&gt;-->
<!--                            </el-popconfirm>-->

                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
    <!-- 成绩修改对话框显示 -->
    <el-dialog id="favDialog" v-model="dialogVisible" width="400px">
        <template #header>
            <h1>学生请假表单</h1>
        </template>
        <!-- <div class="base_title">成绩添加修改对话框</div> -->
        <!-- <div class="dialog-div" style="margin-top: 5px"> -->
      <el-form label-width="80px" :model="editedItem" ref="form">
        <el-form-item label="请假原因">
          <el-input v-model="editedItem.reason" type="textarea" :rows="5" :disabled="isAdminOrTeacher"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker type="datetime" v-model="editedItem.start" placeholder="选择日期时间" format="YYYY/MM/DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss" :disabled="isAdminOrTeacher"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker type="datetime" v-model="editedItem.end" placeholder="选择日期时间" format="YYYY/MM/DD HH:mm:ss"
                          value-format="YYYY-MM-DD HH:mm:ss" :disabled="isAdminOrTeacher"></el-date-picker>
        </el-form-item>
      </el-form>
            



            <!-- <el-form-item>
            <el-button @click="handleClose" style="margin-right: 30px">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
          </el-form-item> -->

      <div style="display: flex; justify-content: center; margin-top: 10px">
        <el-button type="primary" @click="confirm" v-if="!isAdminOrTeacher">确认</el-button>
        <el-button type="success" @click="approvedAbsence(editedItem)" v-if="isAdminOrTeacher">同意</el-button>
        <el-button type="danger" @click="disagreeAbsence(editedItem)" v-if="isAdminOrTeacher">不同意</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
        <!-- </div> -->
    </el-dialog>

</template>
<script lang="ts" setup>
import {ElMessage, ElMessageBox} from 'element-plus'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '~/stores/app'
import { OptionItem } from '~/models/general'
import { getStudentItemOptionList } from '~/services/teachingServ'
import { getAbsenceList, addAndEditAbsence, approved, disagree } from '~/services/absenceServ'
import { Absence } from '~/models/Absence'
const isAdminOrTeacher = computed(() => {
  return appStore.$state.userInfo.roles.includes('ROLE_ADMIN') || appStore.$state.userInfo.roles.includes('ROLE_TEACHER');
});
const dialogVisible = ref(false)
const studentList = ref<OptionItem[]>([])
const studentId = ref('')
const absenceList = ref([])
const editedItem = ref<Absence>({
    id: 0,
    student: {
        studentId: '',
        person: {
            personId: '',
            num: ''
        }
    },
    reason: '',
    start: undefined,
    end: undefined,
    approved: 0,
    approver: {
        personId: '',
        num: ''
    },
    approvedTime: undefined
})
const initForm = () => {
    editedItem.value = {
        id: 0,
        student: {
            studentId: '',
            person: {
                personId: '',
                num: ''
            }
        },
        reason: '',
        start: undefined,
        end: undefined,
        approved: 0,
        approver: {
            personId: '',
            num: ''
        },
        approvedTime: undefined
    }
}
const appStore = useAppStore()

const getList = () => {
    getAbsenceList().then(res => {
        absenceList.value = res
        console.log(res);


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

const editItem = (item: Absence) => {
    editedItem.value = item
    dialogVisible.value = true
}
const confirm = () => {
  //请假开始时间>请假结束时间
  if (editedItem.value.start > editedItem.value.end) {
    ElMessageBox.alert('请假开始时间不能大于请假结束时间');
    return;
  }

    addAndEditAbsence(editedItem.value).then(res => {
            console.log(res)
            dialogVisible.value = false
            getList()
    })
        
    initForm()

}

const query = () => {
    getAbsenceList(studentId.value).then(res => {
        absenceList.value = res
        console.log(res);

    })
}

const reset = () => {
    studentId.value = ''
    getList()
}


const approvedAbsence = (data: Absence) => {

    approved(data).then(res => {
        getList()
      dialogVisible.value = false
    })
}
const disagreeAbsence = (data: Absence) =>{
    disagree(data).then(res => {
        getList()
      dialogVisible.value = false
    })
}
onMounted(() => {
    getStudentList()
    getList()
})

</script>

<style scoped lang="scss"></style>