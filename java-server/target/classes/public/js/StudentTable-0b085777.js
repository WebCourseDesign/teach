import{d as a,b as e,s as t,_ as l,c as s,e as o,f as n,w as i,z as r,D as d,G as c,H as u,o as g,j as p,x as m,I as b,J as h}from"./index-e2669943.js";/* empty css            *//* empty css               *//* empty css                     *//* empty css                 *//* empty css                     *//* empty css              *//* empty css               */import{g as f,s as _}from"./personServ-aa644d92.js";import{a as w,m as y}from"./messageBox-8b82c92f.js";const k=a({data:()=>({numName:"",dataList:[],pagination:{currentPage:1,pageSize:10,dataTotal:0}}),created(){this.getDataPage()},methods:{doQuery(){this.pagination.currentPage=1,this.getDataPage()},handleChangePage(a){this.pagination.currentPage=a,this.getDataPage()},async getDataPage(){const a=await f(this.numName,this.pagination.currentPage);this.pagination.dataTotal=a.data.dataTotal,this.pagination.pageSize=a.data.pageSize,this.dataList=a.data.dataList},addItem(){e.push({path:"/StudentInfo"})},editItem(a){e.push({path:"/StudentInfo",query:{studentId:a}})},async deleteItem(a){if(!(await w("确认删除学生吗?")))return;const e=await _(a);0==e.code?(y(this,"删除成功"),this.getDataPage()):y(this,e.msg)},familyMember(a){e.push({path:"/FamilyMember",query:{studentId:a}})},async doExport(){200!=await t("/api/student/getStudentListExcl","学生.xlsx",{numName:this.numName})&&y(this,"导出失败！")}}}),x={class:"base_form"},v={class:"base_query_container"},C={class:"query_wrapper"},I={class:"query_left"},j={class:"query_right"},z={class:"button-group"},P={class:"table-responsive"},S={class:"pagin"};const q=l(k,[["render",function(a,e,t,l,f,_){const w=r,y=d,k=b,q=h,N=c,D=u;return g(),s("div",x,[e[10]||(e[10]=o("div",{class:"base_header"},[o("div",{class:"blue_column"}),o("div",{class:"base_title"},"学生管理")],-1)),o("div",v,[o("div",C,[o("div",I,[n(w,{type:"primary",onClick:e[0]||(e[0]=e=>a.addItem()),size:"large",class:"commButton"},{default:i((()=>e[4]||(e[4]=[p("添加")]))),_:1})]),o("div",j,[n(y,{modelValue:a.numName,"onUpdate:modelValue":e[1]||(e[1]=e=>a.numName=e),placeholder:"学号或姓名",class:"query-input"},null,8,["modelValue"]),o("div",z,[n(w,{class:"subButton",onClick:e[2]||(e[2]=e=>a.doQuery())},{default:i((()=>e[5]||(e[5]=[p("查询")]))),_:1}),n(w,{class:"subButton",onClick:e[3]||(e[3]=e=>a.doExport())},{default:i((()=>e[6]||(e[6]=[p("导出")]))),_:1})])])])]),o("div",P,[n(N,{data:a.dataList,"header-cell-style":{color:"#2E2E2E",fontSize:"10px",fontWeight:"400",background:"rgb(242,242,242)"},"row-style":{height:"10px"},"cell-style":{padding:"2px"},style:{width:"100%"},class:"responsive-table"},{default:i((()=>[n(k,{label:"序号",fixed:"left",width:"50",color:"black"},{default:i((a=>[p(m(a.$index+1),1)])),_:1}),n(k,{label:"学号",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.num),1)])),_:1}),n(k,{label:"姓名",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.name),1)])),_:1}),n(k,{label:"院系",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.dept),1)])),_:1}),n(k,{label:"专业",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.major),1)])),_:1}),n(k,{label:"班级",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.className),1)])),_:1}),n(k,{label:"证件号码",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.card),1)])),_:1}),n(k,{label:"性别",color:"black",align:"center",width:"100"},{default:i((a=>[p(m(a.row.genderName),1)])),_:1}),n(k,{label:"出生日期",color:"black",align:"center"},{default:i((a=>[p(m(a.row.birthday),1)])),_:1}),n(k,{label:"邮箱",color:"black",align:"center"},{default:i((a=>[p(m(a.row.email),1)])),_:1}),n(k,{label:"电话",color:"black",align:"center"},{default:i((a=>[p(m(a.row.phone),1)])),_:1}),n(k,{label:"地址",color:"black",align:"center"},{default:i((a=>[p(m(a.row.address),1)])),_:1}),n(k,{label:"操作",color:"black",align:"center",width:"260"},{default:i((t=>[n(q,{round:""},{default:i((()=>[n(w,{onClick:e=>a.editItem(t.row.studentId),type:"default",color:"#626aef",plain:"",size:"small"},{default:i((()=>e[7]||(e[7]=[p("基本信息")]))),_:2},1032,["onClick"]),n(w,{onClick:e=>a.familyMember(t.row.studentId),type:"warning",size:"small"},{default:i((()=>e[8]||(e[8]=[p("家庭成员")]))),_:2},1032,["onClick"]),n(w,{onClick:e=>a.deleteItem(t.row.studentId),type:"danger",size:"small"},{default:i((()=>e[9]||(e[9]=[p("删除")]))),_:2},1032,["onClick"])])),_:2},1024)])),_:1})])),_:1},8,["data"])]),o("div",S,[n(D,{background:"",style:{"margin-top":"15px"},total:a.pagination.dataTotal,"current-page":a.pagination.currentPage,"page-size":a.pagination.pageSize,onCurrentChange:a.handleChangePage,layout:"total, prev, pager, next, jumper"},null,8,["total","current-page","page-size","onCurrentChange"])])])}],["__scopeId","data-v-2adb9bb7"]]);export{q as default};
