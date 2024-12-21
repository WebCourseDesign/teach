<template>
    <div>
        <el-form :inline="true" v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')"
            :disabled="isSelect == 0">
            <el-form-item label="课程列表">
                <el-cascader v-model="selectCourse" :options="cListOptions" :props="props" clearable
                    style="width: 400px;" collapse-tags collapse-tags-tooltip show-all-levels="false" />
            </el-form-item>
            <el-form-item>
                <el-button @click="submitList">选课</el-button>
            </el-form-item>
        </el-form>
        <el-table v-if="appStore.$state.userInfo.roles.includes('ROLE_TEACHER')">

        </el-table>
        <el-text>
            <h2>待抽签课程</h2>
            <div style="color: #930e14;text-align: center;font-weight: bold">
                待教务关闭选课，待抽签课程中被抽中的将进入选中课程列表，选课人数小于等于课程容量的课程将直接进入选中课程列表
            </div>
        </el-text>
        <el-table :data="attemptToSelectCourses" v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
            <el-table-column label="id" prop="courseId"></el-table-column>
            <el-table-column label="课程名称" prop="name"></el-table-column>
            <el-table-column label="课程代码" prop="num"></el-table-column>
            <el-table-column label="学分" prop="credit"></el-table-column>
            <el-table-column label="前序课" prop="preCourse.name"></el-table-column>
            <el-table-column label="老师" prop="teacher.person.name"></el-table-column>
            <el-table-column label="教材" prop="coursePath"></el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="danger" @click="cancelCourse(scope.row)">取消选课</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-text>
            <h2>已选中课程</h2>
        </el-text>
        <el-table :data="selectedCourseList" v-if="appStore.$state.userInfo.roles.includes('ROLE_STUDENT')">
            <el-table-column label="id" prop="courseId"></el-table-column>
            <el-table-column label="课程名称" prop="name"></el-table-column>
            <el-table-column label="课程代码" prop="num"></el-table-column>
            <el-table-column label="学分" prop="credit"></el-table-column>
            <el-table-column label="前序课" prop="preCourse.name"></el-table-column>
            <el-table-column label="老师" prop="teacher.person.name"></el-table-column>
            <el-table-column label="教材" prop="coursePath"></el-table-column>
        </el-table>

    </div>
</template>
<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue'
import { getCourseList } from '~/services/teachingServ';
import { CourseItem } from '../../models/general';
import { useAppStore } from '../../stores/app';
import { getAttemptToSelectCourses, getSelectedCourse, submitSelectCourse, cancelSelectCourse } from '../../services/studentServ';
import { getSelectState } from '../../services/changeCourseServ';
const appStore = useAppStore()
const courseList = ref<CourseItem[]>([])
interface CourseListOption {
    course: CourseItem,
    label: string,
    value: number,
    children: CourseListOption[]
}
const props = {
    multiple: true,
    checkStrictly: true

}
const getSelectedCourseList = () => {
    getSelectedCourse().then((result) => {
        //console.log(result);
        selectedCourseList.value = result.data.data

    }).catch((err) => {

    });
}

const getAttemptToSelectCoursesList = () => {
    getAttemptToSelectCourses().then((result) => {
        console.log(result);
        attemptToSelectCourses.value = result.data.data
    }).catch((err) => {
        //console.log("获取失败" + err);
    });
}

const attemptToSelectCourses = ref<CourseItem[]>([])

const selectedCourseList = ref<CourseItem[]>([])
const selectCourse = ref()
const cListOptions = ref<CourseListOption[]>([])
const getCourse = () => {
    getCourseList().then((res) => {
        courseList.value = res
        if (checkList()) {
            courseList.value.forEach((item) => {
                cListOptions.value = changeCourseListStruct(0)
            })
        }


    }).catch((err) => {

    });
}
// 获取选课状态
const isSelect = ref()
const getState = () => {
    getSelectState().then(res => {
        isSelect.value = res.data.data
    })
}
const changeCourseListStruct = (courseId): CourseListOption[] => {
    if (!courseId || courseId == 0) {
        let list = courseList.value.filter((item) => !item.preCourse)
        ////console.log(list);

        let l: CourseListOption[] = []
        list.forEach((item) => {
            let c: CourseListOption = {
                course: item,
                label: item.name,
                value: item.courseId,
                children: []
            }
            c.children.push(...changeCourseListStruct(c.course.courseId))
            l.push(c)
            //console.log(l);

        })

        return l;
    } else {
        let list = courseList.value.filter((item) => {
            if (item.preCourse) {
                return item.preCourse.courseId == courseId
            }
            return false
        })
        let l: CourseListOption[] = []
        list.forEach((item) => {
            let c: CourseListOption = {
                course: item,
                label: item.name,
                value: item.courseId,
                children: []
            }
            c.children.push(...changeCourseListStruct(c.course.courseId))
            l.push(c)
            //console.log(l);


        })

        return l
    }
}

const submitList = () => {
    ////console.log(selectCourse.value);

    selectCourse.value.forEach(element => {
        let array = []
        array.push(...element)
        submitSelectCourse(array).then((res) => {
            if (res.data.code != 0) {
                ElMessage.error(res.data.msg)
            }
        }).catch((err) => {
            ElMessage.error('选课失败')
        });
        getAttemptToSelectCoursesList()
    });

    //isSelect.value = 0
    getAttemptToSelectCoursesList()
    getAttemptToSelectCoursesList() //写两遍是有意为之，千万别删
    //清空selectCourse
    selectCourse.value = []
    //getSelectedCourseList()
}
const changCourseList = () => { }
const unionList = ref([])
const unionFindSet = (currentNode) => {
    // //console.log('进入递归');

    if (currentNode.preCourseId) {
        // let result = unionList.value.find((item) => {item.courseId === currentNode.courseId})
        let result = undefined
        unionList.value.forEach(item => {

            if (item.courseId == currentNode.courseId) {
                result = item
            }
        })


        if (result) {
            return result
        } else {
            unionList.value.push(currentNode)
            // let node = courseList.value.find((item) => {item.courseId === currentNode.preCourseId})
            let node = undefined
            courseList.value.forEach(item => {
                if (item.courseId == currentNode.preCourseId) {
                    node = item
                }
            })
            if (node) {
                return unionFindSet(node)
            } else {
                return false
            }

        }


    }
}

const checkList = (): boolean => {
    let s = true
    courseList.value.forEach((item) => {

        let result = unionFindSet(item)
        if (result) {
            ElMessage.error({
                message: `存在有向环图,课程${result.name}依赖于课程${result.preCourse}`
            })
            s = false
        }
        unionList.value = []

    })
    return s
}

const cancelCourse = (course: CourseItem) => {
    cancelSelectCourse([course.courseId.toString()])
        .then((res) => {
            if (res.data.code === 0) {
                ElMessage.success('取消选课成功');
                getAttemptToSelectCoursesList();
            } else {
                ElMessage.error(res.data.msg || '取消选课失败');
            }
        })
        .catch((err) => {
            ElMessage.error('取消选课失败');
        });
}

onMounted(() => {
    getCourse()
    getSelectedCourseList()
    getAttemptToSelectCoursesList()
    getState()


})
</script>
<style lang="scss" scoped></style>