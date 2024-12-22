<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">荣誉管理</div>
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
            <el-table :data="honorList">
                <el-table-column label="id" prop="honorId" />
                <el-table-column label="名称" prop="name" />
                <el-table-column label="描述" prop="description" />
                <el-table-column label="获奖学生" prop="student.numName" />
                <el-table-column label="获取时间" prop="getTime" />
                <el-table-column label="奖励" prop="reward" />
                <el-table-column label="操作" v-if="appStore.$state.userInfo.roles.includes('ROLE_ADMIN')">
                    <template #default="scope">
                        <el-button-group>
                            <el-button @click="editItem(scope.row)" type="success">编辑</el-button>
                            <el-popconfirm title="确定要删除吗?" @confirm="deleteItem(scope.row.honorId)">
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
            <h1>荣誉添加修改对话框</h1>
        </template>
        <!-- <div class="base_title">成绩添加修改对话框</div> -->
        <!-- <div class="dialog-div" style="margin-top: 5px"> -->
        <el-form label-width="80px" :model="editedItem" ref="form">
            <el-form-item label="名称">
                <el-input v-model="editedItem.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="editedItem.description" placeholder="请输入描述" type="textarea"></el-input>
            </el-form-item>

            <el-form-item label="获奖学生">
                <el-select v-model="editedItem.student.studentId" placeholder="请选择...">
                    <el-option v-for="item in studentList" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="获奖时间">
                <el-date-picker v-model="editedItem.getTime" type="date" placeholder="选择日期" format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item label="奖励">
                <el-input v-model="editedItem.reward" placeholder="请输入奖励" type="textarea"></el-input>
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
import { OptionItem } from '~/models/general'
import { Honor } from '~/models/Honor'
import { getHonorList, addAndEditHonor, deleteHonor } from '~/services/honorServ'
import { getStudentItemOptionList } from '~/services/teachingServ'
import { useAppStore } from '~/stores/app'
import { ElMessageBox } from "element-plus";
const dialogVisible = ref(false)
const studentList = ref<OptionItem[]>([])
const studentId = ref('')
const honorList = ref([])
const editedItem = ref<Honor>({
    honorId: 0,
    name: '',
    description: '',
    student: {
        studentId: '',
        person: {
            personId: 0,
            num: '',
            name: '',
            type: '',
            dept: '',
            card: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            address: '',
            introduce: ''
        },
        major: '',
        className: ''
    },
    getTime: '',
    reward: '',

})
const initForm = () => {
    editedItem.value = {
        honorId: 0,
        name: '',
        description: '',
        student: {
            studentId: '',
            person: {
                personId: 0,
                num: '',
                name: '',
                type: '',
                dept: '',
                card: '',
                gender: '',
                birthday: '',
                email: '',
                phone: '',
                address: '',
                introduce: ''
            },
            major: '',
            className: ''
        },
        getTime: '',
        reward: '',
    }
}

const getList = () => {
    getHonorList().then(res => {
        honorList.value = res
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
const editItem = (item: Honor) => {
    editedItem.value = item
    dialogVisible.value = true
}
const confirm = () => {
    const today = new Date();
    const selectedDate = new Date(editedItem.value.getTime);
    if (selectedDate > today) {
        ElMessageBox.alert('获奖时间不能大于当天日期');
        return;
    }
    if (editedItem.value.name == '' || editedItem.value.description == '' || editedItem.value.student.studentId == '' || editedItem.value.getTime == '' || editedItem.value.reward == '') {
        ElMessageBox.alert('请填写完整信息');
        return;
    }
    addAndEditHonor(editedItem.value).then(res => {
        console.log(res)
        dialogVisible.value = false
        getList()
    })
    initForm()
}

const query = () => {
    getHonorList(studentId.value).then(res => {
        honorList.value = res
        console.log(res);
        //getList()

    })
}

const reset = () => {
    studentId.value = ''
    getList()
}

const deleteItem = (id) => {

    deleteHonor(id).then(res => {
        getList()
    })
}
const appStore = useAppStore()

onMounted(() => {
    getStudentList()
    getList()
})

</script>

<style scoped lang="scss"></style>