import{d as e,u as a,X as l,Y as r,c as s,Z as t,O as o,w as u,k as c,f as n,U as d,N as p,G as i,a3 as h,o as m,j as f,e as v,a4 as b,P as I,z as E,I as _}from"./index-ebbc268c.js";/* empty css                     *//* empty css                 *//* empty css            *//* empty css                  *//* empty css               *//* empty css              */import{a as C}from"./teachingServ-68e3f6d8.js";import{g,a as j,s as k,c as y}from"./studentServ-0e318e4a.js";import{g as S}from"./changeCourseServ-90517b06.js";import"./request-c45980cc.js";const T=e({__name:"SelectCourseTable",setup(e){const T=a(),w=l([]),$={multiple:!0,checkStrictly:!0},x=()=>{j().then((e=>{O.value=e.data.data})).catch((e=>{}))},O=l([]),R=l([]),U=l(),L=l([]),N=l(),D=e=>{if(e&&0!=e){let a=w.value.filter((a=>!!a.preCourse&&a.preCourse.courseId==e)),l=[];return a.forEach((e=>{let a={course:e,label:e.name,value:e.courseId,children:[]};a.children.push(...D(a.course.courseId)),l.push(a)})),l}{let e=w.value.filter((e=>!e.preCourse)),a=[];return e.forEach((e=>{let l={course:e,label:e.name,value:e.courseId,children:[]};l.children.push(...D(l.course.courseId)),a.push(l)})),a}},P=()=>{U.value.forEach((e=>{let a=[];a.push(...e),k(a).then((e=>{0!=e.data.code&&d.error(e.data.msg)})).catch((e=>{d.error("选课失败")})),x()})),x(),x(),U.value=[]},V=l([]),A=e=>{if(e.preCourseId){let a;if(V.value.forEach((l=>{l.courseId==e.courseId&&(a=l)})),a)return a;{let a;return V.value.push(e),w.value.forEach((l=>{l.courseId==e.preCourseId&&(a=l)})),!!a&&A(a)}}},G=()=>{let e=!0;return w.value.forEach((a=>{let l=A(a);l&&(d.error({message:`存在有向环图,课程${l.name}依赖于课程${l.preCourse}`}),e=!1),V.value=[]})),e};return r((()=>{C().then((e=>{w.value=e,G()&&w.value.forEach((e=>{L.value=D(0)}))})).catch((e=>{})),g().then((e=>{R.value=e.data.data})).catch((e=>{})),x(),S().then((e=>{N.value=e.data.data}))})),(e,a)=>{const l=b,r=I,C=E,g=p,j=i,k=h,S=_;return m(),s("div",null,[t(T).$state.userInfo.roles.includes("ROLE_STUDENT")?(m(),o(g,{key:0,inline:!0,disabled:0==N.value},{default:u((()=>[n(r,{label:"课程列表"},{default:u((()=>[n(l,{modelValue:U.value,"onUpdate:modelValue":a[0]||(a[0]=e=>U.value=e),options:L.value,props:$,clearable:"",style:{width:"400px"},"collapse-tags":"","collapse-tags-tooltip":"","show-all-levels":"false"},null,8,["modelValue","options"])])),_:1}),n(r,null,{default:u((()=>[n(C,{onClick:P},{default:u((()=>a[1]||(a[1]=[f("选课")]))),_:1})])),_:1})])),_:1},8,["disabled"])):c("",!0),t(T).$state.userInfo.roles.includes("ROLE_TEACHER")?(m(),o(j,{key:1})):c("",!0),n(k,null,{default:u((()=>a[2]||(a[2]=[v("h2",null,"待抽签课程",-1),v("div",{style:{color:"#930e14","text-align":"center","font-weight":"bold"}}," 待教务关闭选课，待抽签课程中被抽中的将进入选中课程列表，选课人数小于等于课程容量的课程将直接进入选中课程列表 ",-1)]))),_:1}),t(T).$state.userInfo.roles.includes("ROLE_STUDENT")?(m(),o(j,{key:2,data:O.value},{default:u((()=>[n(S,{label:"id",prop:"courseId"}),n(S,{label:"课程名称",prop:"name"}),n(S,{label:"课程代码",prop:"num"}),n(S,{label:"学分",prop:"credit"}),n(S,{label:"前序课",prop:"preCourse.name"}),n(S,{label:"老师",prop:"teacher.person.name"}),n(S,{label:"教材",prop:"coursePath"}),n(S,{label:"操作"},{default:u((e=>[n(C,{type:"danger",onClick:a=>{return l=e.row,void y([l.courseId.toString()]).then((e=>{0===e.data.code?(d.success("取消选课成功"),x()):d.error(e.data.msg||"取消选课失败")})).catch((e=>{d.error("取消选课失败")}));var l}},{default:u((()=>a[3]||(a[3]=[f("取消选课")]))),_:2},1032,["onClick"])])),_:1})])),_:1},8,["data"])):c("",!0),n(k,null,{default:u((()=>a[4]||(a[4]=[v("h2",null,"已选中课程",-1)]))),_:1}),t(T).$state.userInfo.roles.includes("ROLE_STUDENT")?(m(),o(j,{key:3,data:R.value},{default:u((()=>[n(S,{label:"id",prop:"courseId"}),n(S,{label:"课程名称",prop:"name"}),n(S,{label:"课程代码",prop:"num"}),n(S,{label:"学分",prop:"credit"}),n(S,{label:"前序课",prop:"preCourse.name"}),n(S,{label:"老师",prop:"teacher.person.name"}),n(S,{label:"教材",prop:"coursePath"})])),_:1},8,["data"])):c("",!0)])}}});export{T as default};
