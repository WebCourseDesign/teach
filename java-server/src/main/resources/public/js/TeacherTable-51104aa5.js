import{d as e,b as a,_ as t,c as l,e as o,f as s,w as r,z as d,D as c,G as n,o as i,j as u,x as m,I as b,J as p}from"./index-38c7dff6.js";/* empty css                     *//* empty css                 *//* empty css                     *//* empty css            *//* empty css              *//* empty css               */import{e as h,t as f}from"./personServ-82789cd8.js";import{a as _,m as w}from"./messageBox-c604b16f.js";const g=e({data:()=>({numName:"",dataList:[]}),created(){this.doQuery()},methods:{async doQuery(){this.dataList=await h(this.numName)},addItem(){a.push({path:"/TeacherInfo"})},editItem(e){a.push({path:"/TeacherInfo",query:{teacherId:e}})},async deleteItem(e){if(!(await _("确认删除教师吗?")))return;const a=await f(this.dataList[e].teacherId);0==a.code?(w(this,"删除成功"),this.dataList.splice(e,1)):w(this,a.msg)}}}),k={class:"base_form"},y={class:"base_query_oneLine"},I={class:"query_left"},x={class:"query_right"},j={class:"table-content"};const v=t(g,[["render",function(e,a,t,h,f,_){const w=d,g=c,v=b,C=p,L=n;return i(),l("div",k,[a[8]||(a[8]=o("div",{class:"base_header"},[o("div",{class:"blue_column"}),o("div",{class:"base_title"},"教师管理")],-1)),o("div",y,[o("div",I,[s(w,{class:"commButton",type:"primary",onClick:a[0]||(a[0]=a=>e.addItem())},{default:r((()=>a[3]||(a[3]=[u("添加")]))),_:1})]),o("div",x,[s(g,{modelValue:e.numName,"onUpdate:modelValue":a[1]||(a[1]=a=>e.numName=a)},{default:r((()=>a[4]||(a[4]=[u("工号或姓名")]))),_:1},8,["modelValue"]),s(w,{class:"subButton",onClick:a[2]||(a[2]=a=>e.doQuery())},{default:r((()=>a[5]||(a[5]=[u("查询")]))),_:1})])]),o("div",j,[s(L,{data:e.dataList,"header-cell-style":{color:"#2E2E2E",fontSize:"10px",fontWeight:"400",background:"rgb(242,242,242)"},"row-style":{height:"10px"},"cell-style":{padding:"2px"},style:{width:"100%"}},{default:r((()=>[s(v,{label:"序号",fixed:"left",width:"50",color:"black"},{default:r((e=>[u(m(e.$index+1),1)])),_:1}),s(v,{label:"工号",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.person.num),1)])),_:1}),s(v,{label:"姓名",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.person.name),1)])),_:1}),s(v,{label:"院系",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.person.dept),1)])),_:1}),s(v,{label:"职称",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.title),1)])),_:1}),s(v,{label:"学位",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.degree),1)])),_:1}),s(v,{label:"证件号码",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.person.card),1)])),_:1}),s(v,{label:"性别",color:"black",align:"center",width:"100"},{default:r((e=>[u(m(e.row.person.genderName),1)])),_:1}),s(v,{label:"出生日期",color:"black",align:"center"},{default:r((e=>[u(m(e.row.person.birthday),1)])),_:1}),s(v,{label:"邮箱",color:"black",align:"center"},{default:r((e=>[u(m(e.row.person.email),1)])),_:1}),s(v,{label:"电话",color:"black",align:"center"},{default:r((e=>[u(m(e.row.person.phone),1)])),_:1}),s(v,{label:"地址",color:"black",align:"center"},{default:r((e=>[u(m(e.row.person.address),1)])),_:1}),s(v,{label:"操作",color:"black",align:"center",width:"230"},{default:r((t=>[s(C,null,{default:r((()=>[s(w,{onClick:a=>e.editItem(t.row.teacherId),type:"success"},{default:r((()=>a[6]||(a[6]=[u("编辑")]))),_:2},1032,["onClick"]),s(w,{onClick:a=>e.deleteItem(t.$index),type:"danger"},{default:r((()=>a[7]||(a[7]=[u("删除")]))),_:2},1032,["onClick"])])),_:2},1024)])),_:1})])),_:1},8,["data"])])])}]]);export{v as default};
