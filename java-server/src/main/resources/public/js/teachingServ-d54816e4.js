import{R as e}from"./index-38c7dff6.js";import{r as t}from"./request-3dbfa108.js";async function a(t){return(await e("/api/course/getCourseList",{numName:t})).data}async function s(t){return await e("/api/course/courseDelete",{courseId:t})}const r=e=>t({url:"/api/course/courseSave",method:"post",data:{data:e}});async function o(){return(await e("/api/score/getStudentItemOptionList",null)).itemList}async function n(){return(await e("/api/score/getCourseItemOptionList",null)).itemList}async function c(t,a){return(await e("/api/score/getScoreList",{studentId:t,courseId:a})).data}async function i(t,a,s,r){return await e("/api/score/scoreSave",{scoreId:t,studentId:a,courseId:s,mark:r})}async function u(t){return await e("/api/score/scoreDelete",{scoreId:t})}const d=()=>t({url:"/api/course/getCourseByTeacherGET",method:"get"});async function p(){return(await e("/api/course/getCourseByTeacher",null)).itemList}const m=()=>t({url:"/api/teacher/getTeacherIdList",method:"get"});export{a,s as b,r as c,c as d,o as e,n as f,m as g,p as h,u as i,d as j,i as s};