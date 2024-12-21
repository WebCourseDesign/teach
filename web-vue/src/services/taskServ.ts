import { Task } from "~/models/Task";
import request from "~/utils/request";
export const getTasksByTeacher = () => {
    return request({
        url: "/api/task/getTasksByTeacher",
        method:'get'
    })
}
export const addAndEditTask = (data:Task) => {
    return request({
        url: "/api/task/task",
        method: 'post',
        data
    })
}
export const getTaskByStudent = () => {
    return request({
        url:'/api/task/getTasksByStudent',
        method:'get'
    })
}