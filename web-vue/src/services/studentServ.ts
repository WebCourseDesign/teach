import request from "~/utils/request";
import { SelectCourse } from '../models/SelectCourse';

export const getSelectedCourse = () => {
    return request({
        url: "/api/score/selectedCourse",
        method: "get"
    })
}

export const getAttemptToSelectCourses = () => {
    return request({
        url: "/api/score/attemptToSelectCourses",
        method: "get"
    })
}

export const submitSelectCourse = (courseIds: []) => {
    return request({
        url: "/api/score/selectCourse",
        method: "post",
        data: courseIds
    })
}

export const cancelSelectCourse = (courseIds: string[]) => {
    return request({
        url: '/api/score/cancelSelectCourse',
        method: 'post',
        data: courseIds
    });
}

export const getAllStudents = () => {
    return request({
        url: "/api/student/getAllStudents",
        method: "get"
    })
}

export const exportPerson = () => {
    return request({
        url: "/api/student/exportPersonIntro",
        method: "post",
        responseType: "blob"
    })
}

export const getStudentById = (id) => {
    return request({
        url: "/api/student/getStudentById",
        method: "get",
    })
}