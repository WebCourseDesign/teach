import{d as e,K as a,L as l,b as t,M as r,_ as s,c as d,e as o,f as m,w as i,N as u,z as n,o as p,F as h,y as f,O as c,j as g,D as b,P as V,E as y,m as _,Q as v}from"./index-38c7dff6.js";/* empty css               *//* empty css                  *//* empty css                    *//* empty css              *//* empty css            *//* empty css               */import{f as j}from"./systemServ-ff4342f1.js";import{a as k,b as w}from"./personServ-82789cd8.js";import{a as I}from"./infoServ-deb171f6.js";import{g as U}from"./teachingServ-d54816e4.js";import"./request-3dbfa108.js";const S=e({data:()=>({valid:!1,studentId:null,form:{},birthday:new Date,gender:{},genderList:[],nameRules:[],emailRules:[],imgStr:"",teacherList:[]}),async created(){const e=this.$route.query.studentId;if(null!=e&&(this.studentId=parseInt(e.toString())),this.genderList=await j("XBM"),null!=this.studentId){this.form=await k(this.studentId),this.birthday=new Date(this.form.birthday),this.gender=a(this.genderList,this.form.gender);let e=await I(this.form.personId+".jpg");this.imgStr=e.data,this.imgStr=this.imgStr.replace("data:image/png;base64","data:image/jpeg;base64")}},methods:{async submit(){this.$refs.form.validate((async e=>{if(e){this.form.birthday=l(this.birthday);const e=await w(this.studentId,this.form);0==e.code?t.push({path:"/student-panel"}):alert(e.msg)}else r.alert("请检查输入项")}))},getImage(){},backPage(){t.push({path:"/student-panel"})},getTeachers(){U().then((e=>{this.teacherList=e.data.data}))},checkIdNum(){const e=this.form.card,a=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;return a.test(e)?a.test(e):(r.alert("证件号格式不正确"),!1)},checkPhone(){const e=this.form.phone,a=/^1[34578]\d{9}$/;return a.test(e)?a.test(e):(r.alert("手机号码格式不正确"),!1)},checkEmail(){const e=this.form.email,a=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;return a.test(e)?a.test(e):(r.alert("邮箱格式不正确"),!1)}}}),x={class:"base_form"},z={class:"form-div",style:{"margin-top":"5px"}},L={class:"form-body"},$={style:{"margin-left":"20px"}},N=["src"];const q=s(S,[["render",function(e,a,l,t,r,s){const j=b,k=V,w=y,I=_,U=v,S=u,q=n;return p(),d("div",x,[a[13]||(a[13]=o("div",{class:"base_header"},[o("div",{class:"blue_column"}),o("div",{class:"base_title"},"学生信息")],-1)),o("div",z,[o("div",L,[m(S,{model:e.form,"label-width":"auto",style:{"max-width":"400px"},ref:"form"},{default:i((()=>[m(k,{prop:"num",label:"学号"},{default:i((()=>[m(j,{modelValue:e.form.num,"onUpdate:modelValue":a[0]||(a[0]=a=>e.form.num=a),placeholder:"请输入学号"},null,8,["modelValue"])])),_:1}),m(k,{prop:"name",label:"姓名"},{default:i((()=>[m(j,{modelValue:e.form.name,"onUpdate:modelValue":a[1]||(a[1]=a=>e.form.name=a),placeholder:"请输入姓名"},null,8,["modelValue"])])),_:1}),m(k,{prop:"dept",label:"学院"},{default:i((()=>[m(j,{modelValue:e.form.dept,"onUpdate:modelValue":a[2]||(a[2]=a=>e.form.dept=a),placeholder:"请输入学院"},null,8,["modelValue"])])),_:1}),m(k,{prop:"major",label:"专业"},{default:i((()=>[m(j,{modelValue:e.form.major,"onUpdate:modelValue":a[3]||(a[3]=a=>e.form.major=a),placeholder:"请输入专业"},null,8,["modelValue"])])),_:1}),m(k,{prop:"className",label:"班级"},{default:i((()=>[m(j,{modelValue:e.form.className,"onUpdate:modelValue":a[4]||(a[4]=a=>e.form.className=a),placeholder:"请输入班级"},null,8,["modelValue"])])),_:1}),m(k,{prop:"card",label:"证件号码",rules:[{required:!0,message:"非法参数",trigger:"blur",validator:e.checkIdNum}]},{default:i((()=>[m(j,{modelValue:e.form.card,"onUpdate:modelValue":a[5]||(a[5]=a=>e.form.card=a),placeholder:"请输入证件号码"},null,8,["modelValue"])])),_:1},8,["rules"]),m(k,{prop:"gender",label:"性别"},{default:i((()=>[m(I,{modelValue:e.form.gender,"onUpdate:modelValue":a[6]||(a[6]=a=>e.form.gender=a),placeholder:"请输入性别"},{default:i((()=>[(p(!0),d(h,null,f(e.genderList,(e=>(p(),c(w,{key:e.value,value:e.value,label:e.title},null,8,["value","label"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(k,{prop:"birthday",label:"出生日期"},{default:i((()=>[m(U,{modelValue:e.birthday,"onUpdate:modelValue":a[7]||(a[7]=a=>e.birthday=a),type:"date",style:{width:"100%"},placeholder:"选择出生日期"},null,8,["modelValue"])])),_:1}),m(k,{prop:"email",label:"邮箱",rules:[{type:"email",required:!0,message:"非法参数",trigger:"blur"}]},{default:i((()=>[m(j,{modelValue:e.form.email,"onUpdate:modelValue":a[8]||(a[8]=a=>e.form.email=a),placeholder:"请输入邮箱",type:"email"},null,8,["modelValue"])])),_:1}),m(k,{prop:"phone",label:"电话",rules:[{required:!0,message:"非法参数",trigger:"blur",validator:e.checkPhone}]},{default:i((()=>[m(j,{modelValue:e.form.phone,"onUpdate:modelValue":a[9]||(a[9]=a=>e.form.phone=a),placeholder:"请输入电话"},null,8,["modelValue"])])),_:1},8,["rules"]),m(k,{prop:"address",label:"地址"},{default:i((()=>[m(j,{modelValue:e.form.address,"onUpdate:modelValue":a[10]||(a[10]=a=>e.form.address=a),placeholder:"请输入地址"},null,8,["modelValue"])])),_:1})])),_:1},8,["model"]),o("div",$,[o("img",{src:e.imgStr,style:{width:"100px",height:"100px"}},null,8,N)])]),m(q,{size:"large",type:"primary",onClick:e.submit},{default:i((()=>a[11]||(a[11]=[g("提交")]))),_:1},8,["onClick"]),m(q,{size:"large",onClick:e.backPage},{default:i((()=>a[12]||(a[12]=[g("取消")]))),_:1},8,["onClick"])])])}],["__scopeId","data-v-173548b3"]]);export{q as default};
