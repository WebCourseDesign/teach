import{M as e,d as a,K as l,u as t,L as u,c as s,f as d,ak as o,N as n,w as r,l as i,e as m,H as v,x as p,a6 as c,Y as f,af as _,o as y,k as b,I as C,G as T,a5 as h,n as A,p as Y,a7 as V,$ as I,al as k,a0 as D,a8 as R}from"./index-be5cb234.js";/* empty css                *//* empty css                    *//* empty css              *//* empty css                     *//* empty css                 *//* empty css                *//* empty css            *//* empty css                  *//* empty css               */import{r as j}from"./request-9dd860e1.js";import{f as H}from"./teachingServ-654619e3.js";import{l as M}from"./lodash-fb205422.js";const U=async a=>(await e("/api/dailyActivity/list",{studentId:a})).data;var x=(e=>(e.ACT_SPORT="运动",e.ACT_CULTURE="文化",e.ACT_TOUR="旅游",e.ACT_OTHER="其他",e.ACT_PARTY="聚会",e))(x||{});const E={class:"base_form"},O={class:"base_query_oneLine"},L={class:"query_left"},g={key:0,class:"query_right"},w={class:"table_center",style:{"margin-top":"5px"}},$={style:{display:"flex","justify-content":"center","margin-top":"10px"}},q=a({__name:"DailyActivityTable",setup(e){const a=l(!1),q=l([]),N=l(""),B=l([]),P=t(),S=l({id:0,start:"",end:"",student:{studentId:"",person:{personId:"",num:""}},name:""}),G=()=>{S.value={id:0,start:"",end:"",student:{studentId:"",person:{personId:"",num:""}},name:""}},F=()=>{U().then((e=>{B.value=e}))},J=()=>{var e;S.value.start>S.value.end?h.alert("开始时间不能大于结束时间"):""!=S.value.start&&""!=S.value.end&&""!=S.value.student.studentId&&""!=S.value.name?((e=S.value,j({url:"/api/dailyActivity",method:"post",data:e})).then((e=>{a.value=!1,F()})),G()):h.alert("请填写完整信息")},K=e=>{(e=>j({url:`/api/dailyActivity/${e}`,method:"delete"}))(e).then((e=>{F()}))};return u((()=>{(async()=>{H().then((e=>{q.value=e}))})(),F()})),(e,l)=>{const t=p,u=A,h=Y,j=V,H=c,z=I,Q=k,W=D,X=f,Z=R,ee=_;return y(),s(v,null,[d("div",E,[l[15]||(l[15]=d("div",{class:"base_header"},[d("div",{class:"blue_column"}),d("div",{class:"base_title"},"日常活动管理")],-1)),d("div",O,[d("div",L,[o(P).$state.userInfo.roles.includes("ROLE_ADMIN")?(y(),n(t,{key:0,class:"commButton",type:"primary",onClick:l[0]||(l[0]=e=>(a.value=!0,void G()))},{default:r((()=>l[10]||(l[10]=[b("添加")]))),_:1})):i("",!0)]),o(P).$state.userInfo.roles.includes("ROLE_ADMIN")||o(P).$state.userInfo.roles.includes("ROLE_TEACHER")?(y(),s("div",g,[m(H,{inline:!0},{default:r((()=>[m(j,{label:"学生"},{default:r((()=>[m(h,{modelValue:N.value,"onUpdate:modelValue":l[1]||(l[1]=e=>N.value=e)},{default:r((()=>[(y(!0),s(v,null,C(q.value,(e=>(y(),n(u,{label:e.title,key:e.id,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(j,null,{default:r((()=>[m(t,{type:"default",class:"commButton",onClick:l[2]||(l[2]=e=>{U(N.value).then((e=>{B.value=e}))})},{default:r((()=>l[11]||(l[11]=[b("查询")]))),_:1}),m(t,{type:"default",class:"commButton",onClick:l[3]||(l[3]=e=>(N.value="",void F()))},{default:r((()=>l[12]||(l[12]=[b("重置")]))),_:1})])),_:1})])),_:1})])):i("",!0)]),d("div",w,[m(X,{data:B.value},{default:r((()=>[m(z,{label:"id",prop:"id"}),m(z,{label:"名称",prop:"name"},{default:r((e=>[b(T(o(x)[e.row.name]),1)])),_:1}),m(z,{label:"学生",prop:"student.numName"}),m(z,{label:"开始时间",prop:"start"}),m(z,{label:"结束时间",prop:"end"}),o(P).$state.userInfo.roles.includes("ROLE_ADMIN")?(y(),n(z,{key:0,label:"操作"},{default:r((e=>[m(W,null,{default:r((()=>[m(t,{onClick:l=>{return t=e.row,S.value=M.cloneDeep(t),void(a.value=!0);var t},type:"success"},{default:r((()=>l[13]||(l[13]=[b("编辑")]))),_:2},1032,["onClick"]),m(Q,{title:"确定要删除吗?",onConfirm:a=>K(e.row.id)},{reference:r((()=>[m(t,{type:"danger"},{default:r((()=>l[14]||(l[14]=[b("删除")]))),_:1})])),_:2},1032,["onConfirm"])])),_:2},1024)])),_:1})):i("",!0)])),_:1},8,["data"])])]),m(ee,{id:"favDialog",modelValue:a.value,"onUpdate:modelValue":l[9]||(l[9]=e=>a.value=e),width:"400px"},{header:r((()=>l[16]||(l[16]=[d("h1",null,"日常活动添加修改对话框",-1)]))),default:r((()=>[m(H,{"label-width":"80px",model:S.value,ref:"form"},{default:r((()=>[m(j,{label:"名称"},{default:r((()=>[m(h,{modelValue:S.value.name,"onUpdate:modelValue":l[4]||(l[4]=e=>S.value.name=e),placeholder:"请选择..."},{default:r((()=>[m(u,{value:"ACT_SPORT",label:"运动"}),m(u,{value:"ACT_TOUR",label:"旅游"}),m(u,{value:"ACT_CULTURE",label:"文化"}),m(u,{value:"ACT_PARTY",label:"聚会"}),m(u,{value:"ACT_OTHER",label:"其他"})])),_:1},8,["modelValue"])])),_:1}),m(j,{label:"学生"},{default:r((()=>[m(h,{modelValue:S.value.student.studentId,"onUpdate:modelValue":l[5]||(l[5]=e=>S.value.student.studentId=e),placeholder:"请选择..."},{default:r((()=>[(y(!0),s(v,null,C(q.value,(e=>(y(),n(u,{label:e.title,value:e.id},null,8,["label","value"])))),256))])),_:1},8,["modelValue"])])),_:1}),m(j,{label:"开始时间"},{default:r((()=>[m(Z,{modelValue:S.value.start,"onUpdate:modelValue":l[6]||(l[6]=e=>S.value.start=e),type:"datetime",placeholder:"选择日期",format:"YYYY/MM/DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])),_:1}),m(j,{label:"结束时间"},{default:r((()=>[m(Z,{modelValue:S.value.end,"onUpdate:modelValue":l[7]||(l[7]=e=>S.value.end=e),type:"datetime",placeholder:"选择日期",format:"YYYY/MM/DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),d("div",$,[m(t,{type:"primary",onClick:J},{default:r((()=>l[17]||(l[17]=[b("确认")]))),_:1}),m(t,{onClick:l[8]||(l[8]=e=>a.value=!1)},{default:r((()=>l[18]||(l[18]=[b("取消")]))),_:1})])])),_:1},8,["modelValue"])],64)}}});export{q as default};