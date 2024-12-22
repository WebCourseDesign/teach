import{d as e,Q as l,a3 as a,ae as o,b as r,R as t,a5 as d,_ as s,c as u,f as n,e as m,w as p,a6 as i,o as c,H as f,I as h,N as V,k as b,X as _,a7 as g,n as y,p as v,a8 as k,x as I}from"./index-be5cb234.js";/* empty css                  *//* empty css                    *//* empty css              *//* empty css            *//* empty css               */const U=e({data:()=>({teacherId:0,form:{},gender:{},birthday:new Date,genderList:[{value:"1",title:"男"},{value:"2",title:"女"}]}),async created(){const e=this.$route.query.teacherId;null!=e&&(this.teacherId=parseInt(e.toString())),null!=this.teacherId&&(this.form=await l(this.teacherId))},methods:{async submit(){this.$refs.form.validate((async(e,l)=>{if(e){this.form.person.birthday=a(this.birthday);const e=await o(this.teacherId,this.form);0==e.code?r.push({path:"/teacher-panel"}):alert(e.msg)}else t.error("请检查输入项")}))},cancel(){r.push({path:"/teacher-panel"})},checkIdNum(){const e=this.form.person.card,l=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;return l.test(e)?l.test(e):(d.alert("证件号格式不正确"),!1)},checkPhone(){const e=this.form.person.phone,l=/^1[34578]\d{9}$/;return l.test(e)?l.test(e):(d.alert("手机号码格式不正确"),!1)},checkEmail(){const e=this.form.person.email,l=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return l.test(e)?l.test(e):(d.alert("邮箱格式不正确"),!1)}}}),j={class:"base_form"},x={class:"form-div",style:{"margin-top":"5px"}};const $=s(U,[["render",function(e,l,a,o,r,t){const d=_,s=g,U=y,$=v,q=k,w=i,C=I;return c(),u("div",j,[l[13]||(l[13]=n("div",{class:"base_header"},[n("div",{class:"blue_column"}),n("div",{class:"base_title"},"教师信息")],-1)),n("div",x,[m(w,{model:e.form,"label-width":"100px",ref:"form"},{default:p((()=>[m(s,{label:"工号"},{default:p((()=>[m(d,{modelValue:e.form.person.num,"onUpdate:modelValue":l[0]||(l[0]=l=>e.form.person.num=l),placeholder:"工号"},null,8,["modelValue"])])),_:1}),m(s,{label:"姓名"},{default:p((()=>[m(d,{modelValue:e.form.person.name,"onUpdate:modelValue":l[1]||(l[1]=l=>e.form.person.name=l),placeholder:"姓名"},null,8,["modelValue"])])),_:1}),m(s,{label:"学院"},{default:p((()=>[m(d,{modelValue:e.form.person.dept,"onUpdate:modelValue":l[2]||(l[2]=l=>e.form.person.dept=l),placeholder:"学院"},null,8,["modelValue"])])),_:1}),m(s,{label:"职称"},{default:p((()=>[m(d,{modelValue:e.form.title,"onUpdate:modelValue":l[3]||(l[3]=l=>e.form.title=l),placeholder:"职称"},null,8,["modelValue"])])),_:1}),m(s,{label:"学位"},{default:p((()=>[m(d,{modelValue:e.form.degree,"onUpdate:modelValue":l[4]||(l[4]=l=>e.form.degree=l),placeholder:"学位"},null,8,["modelValue"])])),_:1}),m(s,{label:"证件号码",prop:"person.card",rules:[{required:!0,message:"非法参数",trigger:"blur",validator:e.checkIdNum}]},{default:p((()=>[m(d,{modelValue:e.form.person.card,"onUpdate:modelValue":l[5]||(l[5]=l=>e.form.person.card=l),placeholder:"证件号码"},null,8,["modelValue"])])),_:1},8,["rules"]),m(s,{label:"性别"},{default:p((()=>[m($,{modelValue:e.form.person.gender,"onUpdate:modelValue":l[6]||(l[6]=l=>e.form.person.gender=l),placeholder:"请选择性别"},{default:p((()=>[(c(!0),u(f,null,h(e.genderList,(e=>(c(),V(U,{key:e.value,label:e.title,value:e.value},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(s,{label:"出生日期"},{default:p((()=>[m(q,{modelValue:e.birthday,"onUpdate:modelValue":l[7]||(l[7]=l=>e.birthday=l),type:"date",placeholder:"选择出生日期"},null,8,["modelValue"])])),_:1}),m(s,{label:"邮箱",prop:"person.email",rules:[{type:"email",required:!0,message:"非法参数",trigger:"blur",validator:e.checkEmail}]},{default:p((()=>[m(d,{modelValue:e.form.person.email,"onUpdate:modelValue":l[8]||(l[8]=l=>e.form.person.email=l),placeholder:"邮箱"},null,8,["modelValue"])])),_:1},8,["rules"]),m(s,{label:"电话",prop:"person.phone",rules:[{required:!0,message:"非法参数",trigger:"blur",validator:e.checkPhone}]},{default:p((()=>[m(d,{modelValue:e.form.person.phone,"onUpdate:modelValue":l[9]||(l[9]=l=>e.form.person.phone=l),placeholder:"电话"},null,8,["modelValue"])])),_:1},8,["rules"]),m(s,{label:"地址"},{default:p((()=>[m(d,{modelValue:e.form.person.address,"onUpdate:modelValue":l[10]||(l[10]=l=>e.form.person.address=l),placeholder:"地址"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),m(w,{style:{display:"flex","justify-content":"center"}},{default:p((()=>[m(s,null,{default:p((()=>[m(C,{class:"commButton",onClick:e.submit,type:"primary"},{default:p((()=>l[11]||(l[11]=[b("提交")]))),_:1},8,["onClick"])])),_:1}),m(s,null,{default:p((()=>[m(C,{class:"commButton",onClick:e.cancel,type:"default"},{default:p((()=>l[12]||(l[12]=[b("返回")]))),_:1},8,["onClick"])])),_:1})])),_:1})])])}]]);export{$ as default};
