import{a7 as e,u as t}from"./index-ebbc268c.js";const o=e.create({baseURL:"http://localhost:22222/",timeout:5e3});o.interceptors.request.use((e=>(e.headers.Authorization=`Bearer ${t().userInfo.jwtToken}`,e)));const r=o;export{r};
