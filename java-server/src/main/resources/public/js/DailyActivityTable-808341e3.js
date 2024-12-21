import{R as e,d as a,X as l,u as t,Y as u,c as s,e as d,Z as o,O as n,w as r,k as i,f as m,F as p,z as v,N as c,G as f,V as _,o as y,j as b,y as C,x as T,M as A,E as h,m as V,P as Y,I as j,$ as I,J as R,Q as D}from"./index-e2669943.js";/* empty css                *//* empty css                    *//* empty css              *//* empty css               *//* empty css                     *//* empty css                 *//* empty css                     *//* empty css                *//* empty css            *//* empty css                  *//* empty css               */import{r as k}from"./request-92812e51.js";import{e as E}from"./teachingServ-141feadd.js";import{l as H}from"./lodash-3fff7ea4.js";const M=async a=>(await e("/api/dailyActivity/list",{studentId:a})).data;var U=(e=>(e.ACT_SPORT="运动",e.ACT_CULTURE="文化",e.ACT_TOUR="旅游",e.ACT_OTHER="其他",e.ACT_PARTY="聚会",e))(U||{});const O={class:"base_form"},x={class:"base_query_oneLine"},g={class:"query_left"},w={key:0,class:"query_right"},L={class:"table_center",style:{"margin-top":"5px"}},$={style:{display:"flex","justify-content":"center","margin-top":"10px"}},N=a({__name:"DailyActivityTable",setup(e){const a=l(!1),N=l([]),P=l(""),q=l([]),B=t(),S=l({id:0,start:"",end:"",student:{studentId:"",person:{personId:"",num:""}},name:""}),F=()=>{S.value={id:0,start:"",end:"",student:{studentId:"",person:{personId:"",num:""}},name:""}},G=()=>{M().then((e=>{q.value=e}))},J=()=>{var e;S.value.start>S.value.end?A.alert("开始时间不能大于结束时间"):""!=S.value.start&&""!=S.value.end&&""!=S.value.student.studentId&&""!=S.value.name?((e=S.value,k({url:"/api/dailyActivity",method:"post",data:e})).then((e=>{a.value=!1,G()})),F()):A.alert("请填写完整信息")},z=e=>{(e=>k({url:`/api/dailyActivity/${e}`,method:"delete"}))(e).then((e=>{G()}))};return u((()=>{(async()=>{E().then((e=>{N.value=e}))})(),G()})),(e,l)=>{const t=v,u=h,A=V,k=Y,E=c,G=j,K=I,Q=R,X=f,Z=D,W=_;return y(),s(p,null,[d("div",O,[l[13]||(l[13]=d("div",{class:"base_header"},[d("div",{class:"blue_column"}),d("div",{class:"base_title"},"日常活动管理")],-1)),d("div",x,[d("div",g,[o(B).$state.userInfo.roles.includes("ROLE_ADMIN")?(y(),n(t,{key:0,class:"commButton",type:"primary",onClick:l[0]||(l[0]=e=>(a.value=!0,void F()))},{default:r((()=>l[9]||(l[9]=[b("添加")]))),_:1})):i("",!0)]),o(B).$state.userInfo.roles.includes("ROLE_ADMIN")||o(B).$state.userInfo.roles.includes("ROLE_TEACHER")?(y(),s("div",w,[m(E,{inline:!0},{default:r((()=>[m(k,{label:"学生"},{default:r((()=>[m(A,{modelValue:P.value,"onUpdate:modelValue":l[1]||(l[1]=e=>P.value=e)},{default:r((()=>[(y(!0),s(p,null,C(N.value,(e=>(y(),n(u,{label:e.title,key:e.id,value:e.id},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(k,null,{default:r((()=>[m(t,{type:"default",class:"commButton",onClick:l[2]||(l[2]=e=>{M(P.value).then((e=>{q.value=e}))})},{default:r((()=>l[10]||(l[10]=[b("查询")]))),_:1})])),_:1})])),_:1})])):i("",!0)]),d("div",L,[m(X,{data:q.value},{default:r((()=>[m(G,{label:"id",prop:"id"}),m(G,{label:"名称",prop:"name"},{default:r((e=>[b(T(o(U)[e.row.name]),1)])),_:1}),m(G,{label:"学生",prop:"student.numName"}),m(G,{label:"开始时间",prop:"start"}),m(G,{label:"结束时间",prop:"end"}),o(B).$state.userInfo.roles.includes("ROLE_ADMIN")?(y(),n(G,{key:0,label:"操作"},{default:r((e=>[m(Q,null,{default:r((()=>[m(t,{onClick:l=>{return t=e.row,S.value=H.cloneDeep(t),void(a.value=!0);var t},type:"success"},{default:r((()=>l[11]||(l[11]=[b("编辑")]))),_:2},1032,["onClick"]),m(K,{title:"确定要删除吗?",onConfirm:a=>z(e.row.id)},{reference:r((()=>[m(t,{type:"danger"},{default:r((()=>l[12]||(l[12]=[b("删除")]))),_:1})])),_:2},1032,["onConfirm"])])),_:2},1024)])),_:1})):i("",!0)])),_:1},8,["data"])])]),m(W,{id:"favDialog",modelValue:a.value,"onUpdate:modelValue":l[8]||(l[8]=e=>a.value=e),width:"400px"},{header:r((()=>l[14]||(l[14]=[d("h1",null,"日常活动添加修改对话框",-1)]))),default:r((()=>[m(E,{"label-width":"80px",model:S.value,ref:"form"},{default:r((()=>[m(k,{label:"名称"},{default:r((()=>[m(A,{modelValue:S.value.name,"onUpdate:modelValue":l[3]||(l[3]=e=>S.value.name=e),placeholder:"请选择..."},{default:r((()=>[m(u,{value:"ACT_SPORT",label:"运动"}),m(u,{value:"ACT_TOUR",label:"旅游"}),m(u,{value:"ACT_CULTURE",label:"文化"}),m(u,{value:"ACT_PARTY",label:"聚会"}),m(u,{value:"ACT_OTHER",label:"其他"})])),_:1},8,["modelValue"])])),_:1}),m(k,{label:"学生"},{default:r((()=>[m(A,{modelValue:S.value.student.studentId,"onUpdate:modelValue":l[4]||(l[4]=e=>S.value.student.studentId=e),placeholder:"请选择..."},{default:r((()=>[(y(!0),s(p,null,C(N.value,(e=>(y(),n(u,{label:e.title,value:e.id},null,8,["label","value"])))),256))])),_:1},8,["modelValue"])])),_:1}),m(k,{label:"开始时间"},{default:r((()=>[m(Z,{modelValue:S.value.start,"onUpdate:modelValue":l[5]||(l[5]=e=>S.value.start=e),type:"datetime",placeholder:"选择日期",format:"YYYY/MM/DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])),_:1}),m(k,{label:"结束时间"},{default:r((()=>[m(Z,{modelValue:S.value.end,"onUpdate:modelValue":l[6]||(l[6]=e=>S.value.end=e),type:"datetime",placeholder:"选择日期",format:"YYYY/MM/DD HH:mm:ss","value-format":"YYYY-MM-DD HH:mm:ss"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),d("div",$,[m(t,{type:"primary",onClick:J},{default:r((()=>l[15]||(l[15]=[b("确认")]))),_:1}),m(t,{onClick:l[7]||(l[7]=e=>a.value=!1)},{default:r((()=>l[16]||(l[16]=[b("取消")]))),_:1})])])),_:1},8,["modelValue"])],64)}}});export{N as default};
