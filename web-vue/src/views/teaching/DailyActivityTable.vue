<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">日常活动管理</div>
        </div>

        <div class="base_query_oneLine">
            <div class="query_left">
                <el-button class="commButton" type="primary" @click="addItem()"
                    v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN')">添加</el-button>
            </div>
            <div class="query_right"
                v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN') || appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">
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
            <el-table :data="dailyActList">
                <el-table-column label="id" prop="id" />
                <el-table-column label="名称" prop="name">
                    <template #default="scope">
                        {{ ActType[scope.row.name] }}
                    </template>
                </el-table-column>
                <el-table-column label="学生" prop="student.numName" />
                <el-table-column label="开始时间" prop="start" />
                <el-table-column label="结束时间" prop="end" />
                <el-table-column label="操作" v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN')">
                    <template #default="scope">
                        <el-button-group>
                            <el-button @click="editItem(scope.row)" type="success">编辑</el-button>
                            <el-popconfirm title="确定要删除吗?" @confirm="deleteItem(scope.row.id)">
                                <template #reference>
                                    <el-button type="danger">删除</el-button>
                                </template>

                            </el-popconfirm>

                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
    <!-- 成绩修改对话框显示 -->
    <el-dialog id="favDialog" v-model="dialogVisible" width="400px">
        <template #header>
            <h1>日常活动添加修改对话框</h1>
        </template>
        <!-- <div class="base_title">成绩添加修改对话框</div> -->
        <!-- <div class="dialog-div" style="margin-top: 5px"> -->
        <el-form label-width="80px" :model="editedItem" ref="form">
            <el-form-item label="名称">
                <!-- <el-input v-model="editedItem.name" placeholder="请输入名称"></el-input> -->
                <el-select v-model="editedItem.name" placeholder="请选择...">
                    <el-option :value="'ACT_SPORT'" label="运动"></el-option>
                    <el-option :value="'ACT_TOUR'" label="旅游"></el-option>
                    <el-option :value="'ACT_CULTURE'" label="文化"></el-option>
                    <el-option :value="'ACT_PARTY'" label="聚会"></el-option>
                    <el-option :value="'ACT_OTHER'" label="其他"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="学生">
                <el-select v-model="editedItem.student.studentId" placeholder="请选择...">
                    <el-option v-for="item in studentList" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker v-model="editedItem.start" type="datetime" placeholder="选择日期"
                    format="YYYY/MM/DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker v-model="editedItem.end" type="datetime" placeholder="选择日期" format="YYYY/MM/DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { DailyActivity } from '~/models/DailyActivity'
import { OptionItem } from '~/models/general'
import { getDailyActList, addAndEditDailyAct, deleteDailyAct } from '~/services/dailyActServ'
import { getStudentItemOptionList } from '~/services/teachingServ'
import { ActType } from '~/models/DailyActivity';
import { useAppStore } from '~/stores/app'
import { ElMessageBox } from 'element-plus'
import { cloneDeep } from 'lodash';
const dialogVisible = ref(false)
const studentList = ref<OptionItem[]>([])
const studentId = ref('')
const dailyActList = ref<[]>([])
const appStore = useAppStore()
const editedItem = ref<DailyActivity>({
    id: 0,
    start: '',
    end: '',
    student: {
        studentId: '',
        person: {
            personId: '',
            num: ''
        }
    },
    name: ''
})
const initForm = () => {
    editedItem.value = {
        id: 0,
        start: '',
        end: '',
        student: {
            studentId: '',
            person: {
                personId: '',
                num: ''
            }
        },
        name: ''
    }
}

const getList = () => {
    getDailyActList().then(res => {
        dailyActList.value = res
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
const editItem = (item: DailyActivity) => {

    editedItem.value = cloneDeep(item)
    dialogVisible.value = true
}
const confirm = () => {
    console.log(editedItem.value);
    if (editedItem.value.start > editedItem.value.end) {
        ElMessageBox.alert('开始时间不能大于结束时间');
        return;
    }
    if (editedItem.value.start == '' || editedItem.value.end == '' || editedItem.value.student.studentId == '' || editedItem.value.name == '') {
        ElMessageBox.alert('请填写完整信息');
        return;
    }
    addAndEditDailyAct(editedItem.value).then(res => {

        console.log(res)
        dialogVisible.value = false
        getList()
    })
    initForm()
}

const query = () => {
    getDailyActList(studentId.value).then(res => {
        dailyActList.value = res
        console.log(res);

    })
}

const reset = () => {
    studentId.value = ''
    getList()
}

const deleteItem = (id) => {

    deleteDailyAct(id).then(res => {
        getList()
    })
}
const changeName = (name: string) => {
    return ActType[name]
}
onMounted(() => {
    getStudentList()
    getList()
})

</script>
<style scoped></style>