import { TaskSubmit } from "~/models/Task";
import request from "~/utils/request";

export const getTaskSubmitsByTeacher = (data?:TaskSubmit) => {
    return request({
        url :'/api/taskSubmit/getTaskSubmitsByTeacher',
        method : 'post',
        data:data
    })
}

export const openFolder = (id) => {
    return request({
        url :'/api/taskSubmit/openFolder/'+id,
        method : 'get',
        responseType:"blob"
    })
}

export const markTask = (data) => {
    return request({
        url: `/api/task/correntTask`,
        method: 'post',
        data
    })
}

export const getHistoryTaskSubmit = () => {
    return request({
        url: `/api/taskSubmit/history`,
        method: 'get',
    })
}