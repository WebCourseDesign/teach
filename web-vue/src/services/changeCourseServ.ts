import request from "~/utils/request";

export const changeCourse = () => {
    return request({
        url: `/api/course/changeCourseState`,
        method: 'get'
    })
}

export const getSelectState = () => {
    return request({
        url: '/api/course/getSelectState',
        method:'get'
    })
}