import{d as e,ac as a,b as l,ad as t,_ as o,c as s,f as r,e as d,w as c,x as n,X as i,Y as u,o as b,k as m,G as h,$ as f,a0 as p}from"./index-be5cb234.js";/* empty css                     *//* empty css                 *//* empty css            *//* empty css              */import{a as _,m as w}from"./messageBox-168aaa44.js";const g=e({data:()=>({numName:"",dataList:[]}),created(){this.doQuery()},methods:{async doQuery(){this.dataList=await a(this.numName)},addItem(){l.push({path:"/TeacherInfo"})},editItem(e){l.push({path:"/TeacherInfo",query:{teacherId:e}})},async deleteItem(e){if(!(await _("确认删除教师吗?")))return;const a=await t(this.dataList[e].teacherId);0==a.code?(w(this,"删除成功"),this.dataList.splice(e,1)):w(this,a.msg)}}}),k={class:"base_form"},y={class:"base_query_oneLine"},x={class:"query_left"},I={class:"query_right"},v={class:"table-content"};const j=o(g,[["render",function(e,a,l,t,o,_){const w=n,g=i,j=f,C=p,L=u;return b(),s("div",k,[a[8]||(a[8]=r("div",{class:"base_header"},[r("div",{class:"blue_column"}),r("div",{class:"base_title"},"教师管理")],-1)),r("div",y,[r("div",x,[d(w,{class:"commButton",type:"primary",onClick:a[0]||(a[0]=a=>e.addItem())},{default:c((()=>a[3]||(a[3]=[m("添加")]))),_:1})]),r("div",I,[d(g,{modelValue:e.numName,"onUpdate:modelValue":a[1]||(a[1]=a=>e.numName=a)},{default:c((()=>a[4]||(a[4]=[m("工号或姓名")]))),_:1},8,["modelValue"]),d(w,{class:"subButton",onClick:a[2]||(a[2]=a=>e.doQuery())},{default:c((()=>a[5]||(a[5]=[m("查询")]))),_:1})])]),r("div",v,[d(L,{data:e.dataList,"header-cell-style":{color:"#2E2E2E",fontSize:"10px",fontWeight:"400",background:"rgb(242,242,242)"},"row-style":{height:"10px"},"cell-style":{padding:"2px"},style:{width:"100%"}},{default:c((()=>[d(j,{label:"序号",fixed:"left",width:"50",color:"black"},{default:c((e=>[m(h(e.$index+1),1)])),_:1}),d(j,{label:"工号",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.person.num),1)])),_:1}),d(j,{label:"姓名",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.person.name),1)])),_:1}),d(j,{label:"院系",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.person.dept),1)])),_:1}),d(j,{label:"职称",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.title),1)])),_:1}),d(j,{label:"学位",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.degree),1)])),_:1}),d(j,{label:"证件号码",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.person.card),1)])),_:1}),d(j,{label:"性别",color:"black",align:"center",width:"100"},{default:c((e=>[m(h(e.row.person.genderName),1)])),_:1}),d(j,{label:"出生日期",color:"black",align:"center"},{default:c((e=>[m(h(e.row.person.birthday),1)])),_:1}),d(j,{label:"邮箱",color:"black",align:"center"},{default:c((e=>[m(h(e.row.person.email),1)])),_:1}),d(j,{label:"电话",color:"black",align:"center"},{default:c((e=>[m(h(e.row.person.phone),1)])),_:1}),d(j,{label:"地址",color:"black",align:"center"},{default:c((e=>[m(h(e.row.person.address),1)])),_:1}),d(j,{label:"操作",color:"black",align:"center",width:"230"},{default:c((l=>[d(C,null,{default:c((()=>[d(w,{onClick:a=>e.editItem(l.row.teacherId),type:"success"},{default:c((()=>a[6]||(a[6]=[m("编辑")]))),_:2},1032,["onClick"]),d(w,{onClick:a=>e.deleteItem(l.$index),type:"danger"},{default:c((()=>a[7]||(a[7]=[m("删除")]))),_:2},1032,["onClick"])])),_:2},1024)])),_:1})])),_:1},8,["data"])])])}]]);export{j as default};