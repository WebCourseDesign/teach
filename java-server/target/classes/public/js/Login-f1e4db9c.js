import{d as e,g as a,u as s,t,r,a as o,b as i,_ as l,c as n,e as d,f as c,w as p,T as u,o as m,h,v as f,i as g,j as v,k as C,l as b,E as w,m as y}from"./index-38c7dff6.js";/* empty css            *//* empty css               */import{m as A}from"./messageBox-c604b16f.js";const x="function"==typeof Buffer,V="function"==typeof TextDecoder?new TextDecoder:void 0,T="function"==typeof TextEncoder?new TextEncoder:void 0,U=Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),k=(()=>{let e={};return U.forEach(((a,s)=>e[a]=s)),e})(),F=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,N=String.fromCharCode.bind(String),S="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):e=>new Uint8Array(Array.prototype.slice.call(e,0)),B=e=>e.replace(/=/g,"").replace(/[+\/]/g,(e=>"+"==e?"-":"_")),E=e=>e.replace(/[^A-Za-z0-9\+\/]/g,""),D=e=>{let a,s,t,r,o="";const i=e.length%3;for(let l=0;l<e.length;){if((s=e.charCodeAt(l++))>255||(t=e.charCodeAt(l++))>255||(r=e.charCodeAt(l++))>255)throw new TypeError("invalid character found");a=s<<16|t<<8|r,o+=U[a>>18&63]+U[a>>12&63]+U[a>>6&63]+U[63&a]}return i?o.slice(0,i-3)+"===".substring(i):o},j="function"==typeof btoa?e=>btoa(e):x?e=>Buffer.from(e,"binary").toString("base64"):D,I=x?e=>Buffer.from(e).toString("base64"):e=>{let a=[];for(let s=0,t=e.length;s<t;s+=4096)a.push(N.apply(null,e.subarray(s,s+4096)));return j(a.join(""))},_=e=>{if(e.length<2)return(a=e.charCodeAt(0))<128?e:a<2048?N(192|a>>>6)+N(128|63&a):N(224|a>>>12&15)+N(128|a>>>6&63)+N(128|63&a);var a=65536+1024*(e.charCodeAt(0)-55296)+(e.charCodeAt(1)-56320);return N(240|a>>>18&7)+N(128|a>>>12&63)+N(128|a>>>6&63)+N(128|63&a)},P=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,z=e=>e.replace(P,_),L=x?e=>Buffer.from(e,"utf8").toString("base64"):T?e=>I(T.encode(e)):e=>j(z(e)),Z=(e,a=!1)=>a?B(L(e)):L(e),M=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,R=e=>{switch(e.length){case 4:var a=((7&e.charCodeAt(0))<<18|(63&e.charCodeAt(1))<<12|(63&e.charCodeAt(2))<<6|63&e.charCodeAt(3))-65536;return N(55296+(a>>>10))+N(56320+(1023&a));case 3:return N((15&e.charCodeAt(0))<<12|(63&e.charCodeAt(1))<<6|63&e.charCodeAt(2));default:return N((31&e.charCodeAt(0))<<6|63&e.charCodeAt(1))}},q=e=>e.replace(M,R),H=e=>{if(e=e.replace(/\s+/g,""),!F.test(e))throw new TypeError("malformed base64.");e+="==".slice(2-(3&e.length));let a,s,t,r="";for(let o=0;o<e.length;)a=k[e.charAt(o++)]<<18|k[e.charAt(o++)]<<12|(s=k[e.charAt(o++)])<<6|(t=k[e.charAt(o++)]),r+=64===s?N(a>>16&255):64===t?N(a>>16&255,a>>8&255):N(a>>16&255,a>>8&255,255&a);return r},G="function"==typeof atob?e=>atob(E(e)):x?e=>Buffer.from(e,"base64").toString("binary"):H,J=x?e=>S(Buffer.from(e,"base64")):e=>S(G(e).split("").map((e=>e.charCodeAt(0)))),K=x?e=>Buffer.from(e,"base64").toString("utf8"):V?e=>V.decode(J(e)):e=>q(G(e)),O=e=>E(e.replace(/[-_]/g,(e=>"-"==e?"+":"/"))),Q=e=>K(O(e)),W=Z,X=Q;function Y(e){return!!e||"您必须输入用户名密码"}const $=e({data:()=>({username:"",password:"",valiCode:"",pageType:1,id:0,jwt:"",img:"",funId:"",vueName:"",loginCode:"",email:"",messageCode:"",showSlider:!1,remember:!0,role:"STUDENT",perName:"",rules:[Y]}),beforeMount(){this.pageType=1},async created(){const e=await a();this.id=e.validateCodeId,this.img=e.img;const t=s();t.remember?(this.username=X(t.usernameSave),this.password=X(t.passwordSave),this.remember=!0):(this.username="",this.password="",this.remember=!1)},methods:{async changeValiCode(){const e=await a();this.id=e.validateCodeId,this.img=e.img,this.valiCode=""},changeUser(){this.password="123456"},backLogin(){this.username="",this.password="",this.valiCode="",this.pageType=1},forgetPass(){this.username="",this.password="",this.valiCode="",this.pageType=2},pageRegister(){this.username="",this.password="",this.valiCode="",this.pageType=3},async initPassword(){let e=await t({validateCodeId:this.id,validateCode:this.valiCode});if(0!=e.code)return A(this,e.msg),void this.changeValiCode();""!=this.username&&null!=this.username?""!=this.email&&null!=this.email?(e=await r({username:this.username,email:this.email}),0==e.code?(A(this,"初始密码已发送至您的邮箱，请注意查收"),this.changeValiCode(),this.pageType=1):A(this,e.msg)):A(this,"邮箱为空,请填写邮箱"):A(this,"账号为空,请填写账号")},async register(){let e=await t({validateCodeId:this.id,validateCode:this.valiCode});if(0!=e.code)return A(this,e.msg),void this.changeValiCode();""!=this.username&&null!=this.username?""!=this.password&&null!=this.password?""!=this.perName&&null!=this.perName?""!=this.email&&null!=this.email?""!=this.role&&null!=this.role?(e=await o({username:this.username,password:this.password,perName:this.perName,email:this.email,role:this.role}),0==e.code?(A(this,"已注册成功！"),this.changeValiCode(),this.pageType=1):A(this,e.msg)):A(this,"角色为空,请选择角色"):A(this,"邮箱为空,请填写邮箱"):A(this,"姓名为空,请填写姓名"):A(this,"账号为空,请填写密码"):A(this,"账号为空,请填写账号")},async loginSubmit(){const e=await t({validateCodeId:this.id,validateCode:this.valiCode});if(0!=e.code)return A(this,e.msg),void this.changeValiCode();if(""==this.username||null==this.username)A(this,"用户名为空");else if(""==this.password||null==this.password)A(this,"密码为空");else{const e=s();try{await e.login(this.username,this.password),await e.setNavi(),this.remember?e.saveAccount(W(this.username),W(this.password)):e.removeAccount(),i.push({path:"/MainPage"})}catch(a){A(this,"登录失败!")}}}}}),ee={class:"login-page flex-col"},ae={class:"main-content flex-col align-center justify-center"},se={class:"card"},te={key:0},re={class:"form-group"},oe={class:"form-group"},ie={class:"form-group captcha"},le={class:"captcha-container"},ne=["src"],de={class:"form-group"},ce={class:"form-options"},pe={class:"action-buttons"},ue={key:1},me={class:"form-group"},he={class:"form-group"},fe={class:"form-group captcha"},ge={class:"captcha-container"},ve=["src"],Ce={class:"form-actions"},be={key:2},we={class:"form-group"},ye={class:"form-group"},Ae={class:"form-group"},xe={class:"form-group"},Ve={class:"form-group"},Te={class:"form-group captcha"},Ue={class:"captcha-container"},ke=["src"],Fe={class:"form-actions"};const Ne=l($,[["render",function(e,a,s,t,r,o){const i=w,l=y;return m(),n("div",ee,[a[41]||(a[41]=d("header",{class:"header flex-row justify-between align-center"},[d("div",{class:"logo-container flex-row align-center"},[d("img",{src:"/logo.png",alt:"Logo",class:"logo"}),d("span",{class:"welcome-text"},"欢迎来到教务管理系统！")])],-1)),d("main",ae,[d("div",se,[c(u,{name:"slide-fade",mode:"out-in"},{default:p((()=>[(m(),n("div",{key:e.pageType,class:"form-section"},[1==e.pageType?(m(),n("div",te,[a[28]||(a[28]=d("h2",{class:"form-title"},"用户登录",-1)),d("div",re,[a[24]||(a[24]=d("label",{for:"username"},"账号",-1)),h(d("input",{id:"username",class:"form-input","onUpdate:modelValue":a[0]||(a[0]=a=>e.username=a),placeholder:"请输入账号"},null,512),[[f,e.username]])]),d("div",oe,[a[25]||(a[25]=d("label",{for:"password"},"密码",-1)),h(d("input",{id:"password",class:"form-input","onUpdate:modelValue":a[1]||(a[1]=a=>e.password=a),type:"password",placeholder:"请输入密码"},null,512),[[f,e.password]])]),d("div",ie,[a[26]||(a[26]=d("label",{for:"valiCode"},"验证码",-1)),d("div",le,[h(d("input",{id:"valiCode",class:"form-input captcha-input","onUpdate:modelValue":a[2]||(a[2]=a=>e.valiCode=a),placeholder:"请输入验证码"},null,512),[[f,e.valiCode]]),d("img",{onClick:a[3]||(a[3]=a=>e.changeValiCode()),src:e.img,alt:"Captcha",class:"captcha-image"},null,8,ne)])]),d("div",de,[c(l,{onChange:e.changeUser,modelValue:e.username,"onUpdate:modelValue":a[4]||(a[4]=a=>e.username=a),placeholder:"填入示例账户"},{default:p((()=>[c(i,{label:"管理员示例账号",value:"admin"}),c(i,{label:"教师示例账号",value:"200799013517"}),c(i,{label:"学生示例账号",value:"2022030001"})])),_:1},8,["onChange","modelValue"])]),d("div",ce,[d("label",null,[h(d("input",{type:"checkbox","onUpdate:modelValue":a[5]||(a[5]=a=>e.remember=a)},null,512),[[g,e.remember]]),a[27]||(a[27]=v(" 记住密码 "))]),d("span",{onClick:a[6]||(a[6]=a=>e.forgetPass()),class:"forgot-password"},"忘记密码")]),d("div",pe,[d("button",{onClick:a[7]||(a[7]=a=>e.loginSubmit()),class:"btn btn-primary"},"登录"),d("button",{onClick:a[8]||(a[8]=a=>e.pageRegister()),class:"btn btn-secondary"},"新用户注册")])])):C("",!0),2==e.pageType?(m(),n("div",ue,[a[32]||(a[32]=d("h2",{class:"form-title"},"密码重置",-1)),d("div",me,[a[29]||(a[29]=d("label",{for:"reset-username"},"登录账号",-1)),h(d("input",{id:"reset-username",class:"form-input","onUpdate:modelValue":a[9]||(a[9]=a=>e.username=a),placeholder:"填写教师号/学号"},null,512),[[f,e.username]])]),d("div",he,[a[30]||(a[30]=d("label",{for:"email"},"电子邮箱",-1)),h(d("input",{id:"email",class:"form-input","onUpdate:modelValue":a[10]||(a[10]=a=>e.email=a),placeholder:"请输入邮箱"},null,512),[[f,e.email]])]),d("div",fe,[a[31]||(a[31]=d("label",{for:"reset-valiCode"},"验证码",-1)),d("div",ge,[h(d("input",{id:"reset-valiCode",class:"form-input captcha-input","onUpdate:modelValue":a[11]||(a[11]=a=>e.valiCode=a),placeholder:"请输入验证码"},null,512),[[f,e.valiCode]]),d("img",{onClick:a[12]||(a[12]=a=>e.changeValiCode()),src:e.img,alt:"Captcha",class:"captcha-image"},null,8,ve)])]),d("div",Ce,[d("button",{onClick:a[13]||(a[13]=a=>e.initPassword()),class:"btn btn-primary"},"初始密码"),d("button",{onClick:a[14]||(a[14]=a=>e.backLogin()),class:"btn btn-secondary"},"返回登录")])])):C("",!0),3==e.pageType?(m(),n("div",be,[a[40]||(a[40]=d("h2",{class:"form-title"},"用户注册",-1)),d("div",we,[a[33]||(a[33]=d("label",{for:"register-username"},"账号",-1)),h(d("input",{id:"register-username",class:"form-input","onUpdate:modelValue":a[15]||(a[15]=a=>e.username=a),placeholder:"填写账号"},null,512),[[f,e.username]])]),d("div",ye,[a[34]||(a[34]=d("label",{for:"perName"},"姓名",-1)),h(d("input",{id:"perName",class:"form-input","onUpdate:modelValue":a[16]||(a[16]=a=>e.perName=a),placeholder:"请输入姓名"},null,512),[[f,e.perName]])]),d("div",Ae,[a[35]||(a[35]=d("label",{for:"register-password"},"密码",-1)),h(d("input",{id:"register-password",class:"form-input","onUpdate:modelValue":a[17]||(a[17]=a=>e.password=a),type:"password"},null,512),[[f,e.password]])]),d("div",xe,[a[36]||(a[36]=d("label",{for:"register-email"},"邮箱",-1)),h(d("input",{id:"register-email",class:"form-input","onUpdate:modelValue":a[18]||(a[18]=a=>e.email=a),placeholder:"请输入邮箱"},null,512),[[f,e.email]])]),d("div",Ve,[a[38]||(a[38]=d("label",{for:"role"},"角色",-1)),h(d("select",{id:"role",class:"form-input","onUpdate:modelValue":a[19]||(a[19]=a=>e.role=a)},a[37]||(a[37]=[d("option",{value:"ADMIN"},"管理员",-1),d("option",{value:"STUDENT"},"学生",-1),d("option",{value:"TEACHER"},"教师",-1)]),512),[[b,e.role]])]),d("div",Te,[a[39]||(a[39]=d("label",{for:"register-valiCode"},"验证码",-1)),d("div",Ue,[h(d("input",{id:"register-valiCode",class:"form-input captcha-input","onUpdate:modelValue":a[20]||(a[20]=a=>e.valiCode=a),placeholder:"请输入验证码"},null,512),[[f,e.valiCode]]),d("img",{onClick:a[21]||(a[21]=a=>e.changeValiCode()),src:e.img,alt:"Captcha",class:"captcha-image"},null,8,ke)])]),d("div",Fe,[d("button",{onClick:a[22]||(a[22]=a=>e.register()),class:"btn btn-primary"},"注册提交"),d("button",{onClick:a[23]||(a[23]=a=>e.backLogin()),class:"btn btn-secondary"},"返回登录")])])):C("",!0)]))])),_:1})])]),a[42]||(a[42]=d("footer",{class:"footer"},[d("p",{class:"footer-text"},"Copyright © 山东大学软件学院")],-1))])}],["__scopeId","data-v-ffa61ddd"]]);export{Ne as default};
