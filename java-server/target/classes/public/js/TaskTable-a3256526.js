import{d as e,K as a,u as l,L as t,c as s,f as o,ak as u,N as r,w as d,l as n,e as p,H as i,x as c,Y as m,af as v,ap as f,o as k,k as _,G as h,I as y,a5 as b,$ as I,O as N,J as T,a0 as g,X as j,a7 as E,a8 as V,n as w,p as x,a6 as D,_ as R}from"./index-ed299ca2.js";/* empty css                *//* empty css                  *//* empty css            *//* empty css               *//* empty css                    *//* empty css              *//* empty css                     *//* empty css                 *//* empty css                 */import{a as C}from"./teachingServ-8a53b20e.js";import{a as H,g as L,b as U}from"./taskServ-2b72b6f9.js";import{g as Y}from"./taskSubmitServ-a685ddae.js";import{l as $}from"./lodash-8a6fac22.js";import"./request-1673f500.js";const O={class:"base_form"},S={class:"base_query_oneLine"},A={class:"query_left"},P={class:"table_center",style:{"margin-top":"5px"}},q={key:0,style:{display:"flex","justify-content":"center","margin-top":"10px"}},M={class:"table_center",style:{"margin-top":"5px"}},z={style:{display:"flex","justify-content":"center","margin-top":"10px"}},B=R(e({__name:"TaskTable",setup(e){const R=a(!1);a([]);const B=a([]);a("");const G=a([]),J=a([]);a("");const F=a({Authorization:""}),K=a({taskId:0,state:0,taskNo:"",taskPath:"",taskName:"",overTime:"",course:{courseId:"",num:"",teacher:{teacherId:"",person:{personId:"",num:""},course:[]}}}),X=()=>{K.value={taskId:0,state:0,taskNo:"",taskPath:"D:/teach/web/2023/attach",taskName:"",overTime:"",course:{courseId:"",num:"",teacher:{teacherId:"",person:{personId:"",num:""},course:[]}}}},Q=l(),W=()=>{H().then((e=>{G.value=e.data.data}))},Z=()=>{""!=K.value.course.courseId&&""!=K.value.overTime&&""!=K.value.taskName&&""!=K.value.taskNo&&""!=K.value.taskPath?(U(K.value).then((e=>{R.value=!1,W()})),X()):b.alert("请填写完整信息")},ee=()=>{L().then((e=>{G.value=e.data.data}))},ae=f();return t((()=>{Q.$state.userInfo.roles.includes("ROLE_TEACHER")&&(W(),C().then((e=>{B.value=e.data.data}))),Q.$state.userInfo.roles.includes("ROLE_STUDENT")&&(ee(),Y().then((e=>{J.value=e.data.data}))),F.value.Authorization=`Bearer ${l().userInfo.jwtToken}`})),(e,a)=>{const l=c,t=I,f=N,b=T,C=g,H=m,L=j,U=E,Y=V,W=w,le=x,te=D,se=v;return k(),s(i,null,[o("div",O,[a[19]||(a[19]=o("div",{class:"base_header"},[o("div",{class:"blue_column"}),o("div",{class:"base_title"},"作业管理")],-1)),o("div",S,[o("div",A,[u(Q).$state.userInfo.roles.includes("ROLE_TEACHER")?(k(),r(l,{key:0,class:"commButton",type:"primary",onClick:a[0]||(a[0]=e=>(R.value=!0,void X()))},{default:d((()=>a[9]||(a[9]=[_("发布作业")]))),_:1})):n("",!0)]),a[10]||(a[10]=o("div",{class:"query_right"},null,-1))]),o("div",P,[p(H,{data:G.value},{default:d((()=>[p(t,{label:"id",prop:"taskId"}),p(t,{label:"作业名称",prop:"taskName"}),p(t,{label:"作业编号",prop:"taskNo"}),p(t,{label:"上传路径",prop:"taskPath"}),p(t,{label:"课程",prop:"course.name"}),p(t,{label:"状态",prop:"state"},{default:d((e=>[0===e.row.state?(k(),r(f,{key:0,type:"warning"},{default:d((()=>a[11]||(a[11]=[_("无人提交")]))),_:1})):n("",!0),1===e.row.state?(k(),r(f,{key:1,type:"success"},{default:d((()=>a[12]||(a[12]=[_("有提交")]))),_:1})):n("",!0),2===e.row.state?(k(),r(f,{key:2,type:"danger"},{default:d((()=>a[13]||(a[13]=[_("正在批改")]))),_:1})):n("",!0),3===e.row.state?(k(),r(f,{key:3,type:"danger"},{default:d((()=>a[14]||(a[14]=[_("批改完成")]))),_:1})):n("",!0)])),_:1}),p(t,{label:"到期时间",prop:"overTime"}),p(t,{label:"操作"},{default:d((e=>[p(C,null,{default:d((()=>[u(Q).$state.userInfo.roles.includes("ROLE_TEACHER")?(k(),r(l,{key:0,onClick:a=>{return l=e.row,K.value=$.cloneDeep(l),void(R.value=!0);var l},type:"success"},{default:d((()=>a[15]||(a[15]=[_("编辑")]))),_:2},1032,["onClick"])):n("",!0),u(Q).$state.userInfo.roles.includes("ROLE_TEACHER")&&0!=e.row.state?(k(),r(l,{key:1,onClick:a[1]||(a[1]=e=>{ae.push({path:"/correcting-panel"})}),type:"warning"},{default:d((()=>a[16]||(a[16]=[_("批改")]))),_:1})):n("",!0),u(Q).$state.userInfo.roles.includes("ROLE_STUDENT")&&3!=e.row.state?(k(),r(b,{key:2,headers:F.value,action:"http://202.194.14.120:22222/api/task/upload/"+e.row.taskId,"on-success":ee,accept:"application/pdf"},{trigger:d((()=>[p(l,{type:"primary"},{default:d((()=>a[17]||(a[17]=[_("select file")]))),_:1})])),_:2},1032,["headers","action"])):n("",!0)])),_:2},1024)])),_:1})])),_:1},8,["data"])]),u(Q).$state.userInfo.roles.includes("ROLE_STUDENT")?(k(),s("div",q,a[18]||(a[18]=[o("h2",null,"历史作业记录",-1)]))):n("",!0),o("div",M,[p(H,{data:J.value},{default:d((()=>[p(t,{label:"id",prop:"id"}),p(t,{label:"作业名称",prop:"task.taskName"}),p(t,{label:"作业编号",prop:"task.taskNo"}),p(t,{label:"课程",prop:"task.course.name"}),p(t,{label:"成绩"},{default:d((e=>[o("span",null,h(e.row.score),1)])),_:1})])),_:1},8,["data"])])]),p(se,{id:"favDialog",modelValue:R.value,"onUpdate:modelValue":a[8]||(a[8]=e=>R.value=e),width:"400px"},{header:d((()=>a[20]||(a[20]=[o("h1",null,"作业添加修改对话框",-1)]))),default:d((()=>[p(te,{"label-width":"80px",model:K.value,ref:"form"},{default:d((()=>[p(U,{label:"作业编号"},{default:d((()=>[p(L,{modelValue:K.value.taskNo,"onUpdate:modelValue":a[2]||(a[2]=e=>K.value.taskNo=e)},null,8,["modelValue"])])),_:1}),p(U,{label:"过期时间"},{default:d((()=>[p(Y,{type:"datetime",modelValue:K.value.overTime,"onUpdate:modelValue":a[3]||(a[3]=e=>K.value.overTime=e),placeholder:"选择日期时间",format:"YYYY/MM/DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])),_:1}),p(U,{label:"作业名称"},{default:d((()=>[p(L,{modelValue:K.value.taskName,"onUpdate:modelValue":a[4]||(a[4]=e=>K.value.taskName=e)},null,8,["modelValue"])])),_:1}),p(U,{label:"上传路径"},{default:d((()=>[p(L,{modelValue:K.value.taskPath,"onUpdate:modelValue":a[5]||(a[5]=e=>K.value.taskPath=e),placeholder:"上传路径"},null,8,["modelValue"])])),_:1}),p(U,{label:"课程"},{default:d((()=>[p(le,{modelValue:K.value.course.courseId,"onUpdate:modelValue":a[6]||(a[6]=e=>K.value.course.courseId=e)},{default:d((()=>[(k(!0),s(i,null,y(B.value,(e=>(k(),r(W,{key:e.courseId,label:e.name,value:e.courseId},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1},8,["model"]),o("div",z,[p(l,{type:"primary",onClick:Z},{default:d((()=>a[21]||(a[21]=[_("确认")]))),_:1}),p(l,{onClick:a[7]||(a[7]=e=>R.value=!1)},{default:d((()=>a[22]||(a[22]=[_("取消")]))),_:1})])])),_:1},8,["modelValue"])],64)}}}),[["__scopeId","data-v-2d3871ff"]]);export{B as default};