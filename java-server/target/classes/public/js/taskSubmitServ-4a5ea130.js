import{r as t}from"./request-92812e51.js";const a=a=>t({url:"/api/taskSubmit/getTaskSubmitsByTeacher",method:"post",data:a}),s=a=>t({url:"/api/taskSubmit/openFolder/"+a,method:"get",responseType:"blob"}),e=a=>t({url:"/api/task/correntTask",method:"post",data:a}),o=()=>t({url:"/api/taskSubmit/history",method:"get"});export{a,o as g,e as m,s as o};
