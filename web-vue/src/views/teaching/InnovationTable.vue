<template>
    <div class="base_form">
        <div class="base_header">
            <div class="blue_column"></div>
            <div class="base_title">创新实践管理</div>
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
            <el-table :data="innovationList">
                <el-table-column label="id" prop="id" />
                <el-table-column label="学生" prop="student.numName" />
                <el-table-column label="社会实践" prop="socialPractice" />
                <el-table-column label="学科竞赛" prop="competition" />
                <el-table-column label="科技成果" prop="technology" />
                <el-table-column label="培训讲座" prop="lecture" />
                <el-table-column label="创新项目" prop="project" />
                <el-table-column label="校外实习" prop="internship" />
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
            <h1>荣誉添加修改对话框</h1>
        </template>
        <!-- <div class="base_title">成绩添加修改对话框</div> -->
        <!-- <div class="dialog-div" style="margin-top: 5px"> -->
        <el-form label-width="80px" :model="editedItem" ref="form">
            <el-form-item label="学生">
                <el-select :disabled="editType" v-model="editedItem.student.studentId" placeholder="请选择..."
                    @change="checkStudent(editedItem.student.studentId)">
                    <el-option v-for="item in studentList" :label="item.title" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="社会实践">
                <el-input v-model="editedItem.socialPractice" type="textarea" placeholder="社会实践"></el-input>
            </el-form-item>
            <el-form-item label="学科竞赛">
                <el-input v-model="editedItem.competition" type="textarea" placeholder="学科竞赛"></el-input>
            </el-form-item>
            <el-form-item label="科技成果">
                <el-input v-model="editedItem.technology" type="textarea" placeholder="科技成果"></el-input>
            </el-form-item>
            <el-form-item label="培训讲座">
                <el-input v-model="editedItem.lecture" type="textarea" placeholder="培训讲座"></el-input>
            </el-form-item>
            <el-form-item label="创新项目">
                <el-input v-model="editedItem.project" type="textarea" placeholder="创新项目"></el-input>
            </el-form-item>
            <el-form-item label="校外实习">
                <el-input v-model="editedItem.internship" type="textarea" placeholder="校外实习"></el-input>
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
import { ElMessage } from 'element-plus'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAppStore } from '~/stores/app'
import { OptionItem } from '~/models/general'
import { Innovation } from '~/models/Innovation'
import { getInnovationList, addAndEditInnovation, deleteInnovation } from '~/services/innovationServ'
import { getStudentItemOptionList } from '~/services/teachingServ'
import {cloneDeep} from "lodash";
const dialogVisible = ref(false)
const studentList = ref<OptionItem[]>([])
const studentId = ref('')
const innovationList = ref([])
const editedItem = ref<Innovation>({
    id: 0,
    student: {
        studentId: '',
        person: {
            personId: '',
            num: ''
        }
    },
    socialPractice: '',
    competition: '',
    technology: '',
    lecture: '',
    project: '',
    internship: ''
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
        socialPractice: '',
        competition: '',
        technology: '',
        lecture: '',
        project: '',
        internship: ''
    }
}
const appStore = useAppStore()

const getList = () => {
    getInnovationList().then(res => {
        innovationList.value = res
        console.log(res);
        let roles = appStore.$state.userInfo.roles
        console.log(roles);


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
    editType.value = false
}

const editType = ref(false)
const editItem = (item: Innovation) => {

    editedItem.value = cloneDeep(item)
    editType.value = true
    dialogVisible.value = true
}
const confirm = () => {
    let result = checkStudent(editedItem.value.student.studentId)
    console.log(result);

    if (result) {
        addAndEditInnovation(editedItem.value).then(res => {
            console.log(res)
            dialogVisible.value = false
            getList()
        })
    } else {
        ElMessage.error({
            message: '该学生已存在'
        })
    }
    initForm()
    editType.value = false

}

const query = () => {
    getInnovationList(studentId.value).then(res => {
        innovationList.value = res
        console.log(res);
    })
}

const reset = () => {
    studentId.value = ''
    getList()
}

const checkStudent = async (studentId): boolean => {
    console.log(studentId);
    let result = false
    const res = await getInnovationList(studentId)
    console.log(res);

    console.log(res.length);

    if (res.length === 1) {
        editedItem.value = res[0]
        console.log(editedItem.value);

        result = true
    }
    if (res.length > 1) {

        result = false
    }
    if (!res || res.length === 0) {
        initForm()
        editedItem.value.student.studentId = studentId
        result = true
    }

    console.log(result);

    return result

}
const deleteItem = (id) => {

    deleteInnovation(id).then(res => {
        getList()
    })
}
onMounted(() => {
    getStudentList()
    getList()
})

</script>

<style scoped lang="scss"></style>