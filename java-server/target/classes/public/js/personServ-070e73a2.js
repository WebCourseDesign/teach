import{R as t}from"./index-ebbc268c.js";async function a(a,e){return await t("/api/student/getStudentPageData",{numName:a,currentPage:e})}async function e(a){return await t("/api/student/studentDelete",{studentId:a})}async function n(a){return(await t("/api/student/getStudentInfo",{studentId:a})).data}async function r(a,e){return await t("/api/student/studentEditSave",{studentId:a,form:e})}async function i(a){return(await t("/api/student/getFamilyMemberList",{studentId:a})).data}async function s(a){return await t("/api/student/familyMemberSave",{form:a})}async function u(a){return await t("/api/student/familyMemberDelete",{memberId:a})}async function c(a){return await t("/api/teacher/getTeacherList",{numName:a})}async function d(a){return await t("/api/teacher/getTeacherInfo",{teacherId:a})}async function f(a,e){return await t("/api/teacher/teacherEditSave",{teacherId:a,form:e})}async function o(a){return await t("/api/teacher/teacherDelete",{teacherId:a})}export{n as a,r as b,i as c,u as d,c as e,s as f,a as g,d as h,f as i,e as s,o as t};
