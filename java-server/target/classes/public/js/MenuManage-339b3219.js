import{d as e,B as t,_ as s,c as i,e as d,f as l,w as o,k as a,x as n,h as r,v as c,j as h,F as u,C as p,o as m}from"./index-ebbc268c.js";/* empty css             *//* empty css                 */import{g,a as y,m as N,b as x}from"./systemServ-90794dcc.js";import{m as b,a as f}from"./messageBox-dafa18e6.js";const T=e({data:()=>({nodes:[],editedNode:{},currentNode:{},roleList:[],dialogTitle:"",disabled:!1,editType:0,roleAdmin:!1,roleStudent:!1,roleTeacher:!1,defaultProps:{children:"children",label:"label"}}),async created(){this.roleList=await g(),this.nodes=await y()},methods:{addItemFirst(){this.editedNode={},this.editedNode.pid=null,this.editedNode.parentTitle="",this.roleAdmin=!1,this.roleStudent=!1,this.roleTeacher=!1,this.dialogTitle="添加一级菜单对话框",this.disabled=!1,this.editType=0,t("favDialog").show()},addItem(e){this.currentNode=e,this.editedNode={},this.editedNode.pid=this.currentNode.id,this.editedNode.parentTitle=this.currentNode.title,this.roleAdmin=!1,this.roleStudent=!1,this.roleTeacher=!1,this.dialogTitle="添加菜单对话框",this.disabled=!1,this.editType=1,t("favDialog").show()},editItem(e){this.currentNode=e,this.editedNode=this.currentNode,this.roleAdmin=!1,this.roleStudent=!1,this.roleTeacher=!1,null!=this.currentNode.userTypeIds&&null!=this.currentNode.userTypeIds&&""!=this.currentNode.userTypeIds&&(this.currentNode.userTypeIds.indexOf("1")>=0?this.roleAdmin=!0:this.roleAdmin=!1,this.currentNode.userTypeIds.indexOf("2")>=0?this.roleStudent=!0:this.roleStudent=!1,this.currentNode.userTypeIds.indexOf("3")>=0?this.roleTeacher=!0:this.roleTeacher=!1),this.dialogTitle="修改菜单对话框",this.disabled=!0,this.editType=2,t("favDialog").show()},close(){t("favDialog").close()},async confirm(){this.close();let e="";this.roleAdmin&&(""==e?e="1":e+="1"),this.roleStudent&&(""==e?e="2":e+="2"),this.roleAdmin&&(""==e?e="3":e+="3"),this.editedNode.userTypeIds=e;const t=await N(this.editType,this.editedNode);0==t.code?(b(this,"保存成功"),this.nodes=await y()):b(this,t.msg)},async deleteItem(e){this.currentNode=e;if(!(await f("确认删除吗?")))return;const t=await x(this.currentNode.id);0==t.code?(b(this,"删除成功"),this.nodes=await y()):b(this,t.msg)}}}),k={class:"base_form"},I={class:"base_query_oneLine"},v={class:"query_left"},w={key:0,class:"custom-tree-container"},C={class:"custom-tree-node"},_=["onClick"],A=["onClick"],S=["onClick"],j={id:"favDialog",onclose:"close()",style:{position:"absolute",top:"300px",left:"300px",width:"300px",height:"310px"}},D={class:"base_title"},B={class:"dialog-div",style:{"margin-top":"5px"}},F={class:"dialog-content"},q={colspan:"1"},L={colspan:"1"},O=["disabled"],U={colspan:"1"},V={colspan:"1"},z={colspan:"1"},P=["checked"],E=["checked"],G=["checked"],H={colspan:"2"};const J=s(T,[["render",function(e,t,s,g,y,N){const x=p;return m(),i(u,null,[d("div",k,[t[6]||(t[6]=d("div",{class:"base_header"},[d("div",{class:"blue_column"}),d("div",{class:"base_title"},"菜单管理")],-1)),d("div",I,[d("div",v,[d("button",{style:{"margin-left":"5px"},class:"commButton",onClick:t[0]||(t[0]=(...t)=>e.addItemFirst&&e.addItemFirst(...t))}," 添加一级菜单 ")])]),null!==e.nodes?(m(),i("div",w,[l(x,{data:e.nodes,"show-checkbox":"","node-key":"id","default-expand-all":"","expand-on-click-node":!1},{default:o((({node:t,data:s})=>[d("span",C,[d("span",null,n(t.label),1),d("span",null,[d("a",{onClick:t=>e.addItem(s)}," 添加 ",8,_),d("a",{style:{"margin-left":"5px"},onClick:t=>e.editItem(s)}," 修改 ",8,A),d("a",{style:{"margin-left":"5px"},onClick:t=>e.deleteItem(s)}," 删除 ",8,S)])])])),_:1},8,["data"])])):a("",!0)]),d("dialog",j,[d("div",D,n(e.dialogTitle),1),d("div",B,[d("table",F,[d("tr",null,[t[7]||(t[7]=d("td",{colspan:"1",style:{"text-align":"right"}},"父节点",-1)),d("td",q,n(e.editedNode.parentTitle),1)]),d("tr",null,[t[8]||(t[8]=d("td",{colspan:"1",style:{"text-align":"right"}},"主键ID",-1)),d("td",L,[r(d("input",{"onUpdate:modelValue":t[1]||(t[1]=t=>e.editedNode.id=t),class:"commInput",disabled:e.disabled},null,8,O),[[c,e.editedNode.id]])])]),d("tr",null,[t[9]||(t[9]=d("td",{colspan:"1",style:{"text-align":"right"}},"菜单名称",-1)),d("td",U,[r(d("input",{"onUpdate:modelValue":t[2]||(t[2]=t=>e.editedNode.value=t),class:"commInput"},null,512),[[c,e.editedNode.value]])])]),d("tr",null,[t[10]||(t[10]=d("td",{colspan:"1",style:{"text-align":"right"}},"菜单标题",-1)),d("td",V,[r(d("input",{"onUpdate:modelValue":t[3]||(t[3]=t=>e.editedNode.title=t),class:"commInput"},null,512),[[c,e.editedNode.title]])])]),d("tr",null,[t[14]||(t[14]=d("td",{colspan:"1",style:{"text-align":"right"}},"角色",-1)),d("td",z,[d("input",{type:"checkbox",checked:e.roleAdmin},null,8,P),t[11]||(t[11]=h("管理员 ")),d("input",{type:"checkbox",checked:e.roleStudent},null,8,E),t[12]||(t[12]=h("学生 ")),d("input",{type:"checkbox",checked:e.roleTeacher},null,8,G),t[13]||(t[13]=h("教师 "))])]),d("tr",null,[d("td",H,[d("button",{class:"commButton",onClick:t[4]||(t[4]=t=>e.close()),style:{"margin-right":"30px","margin-left":"80px"}}," 取消 "),d("button",{class:"commButton",onClick:t[5]||(t[5]=t=>e.confirm())},"确认")])])])])])],64)}]]);export{J as default};
