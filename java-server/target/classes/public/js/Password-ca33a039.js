import{u as s}from"./infoServ-fe2d226a.js";import{m as a}from"./messageBox-cbe65a59.js";import{d as o,_ as d,c as e,e as r,h as l,v as t,o as i}from"./index-7ed7b84e.js";const w=o({data:()=>({passw:"password",oldPassword:"",newPassword:"",checkPassword:"",msg:""}),methods:{submitPassword(){var o="";if(void 0===this.oldPassword||""===this.oldPassword)o="旧密码为空不能修改";else if(void 0===this.newPassword||""===this.newPassword)o="新密码为空不能修改";else if(this.oldPassword===this.newPassword)o="新密码和旧密码相同，不能修改";else if(this.checkPassword!==this.newPassword)o="新密码和确认密码不相同，不能修改";else{for(var d,e=!1,r=!1,l=!1,t=0;t<this.newPassword.length;t++)(d=this.newPassword.charAt(t))>="a"&&d<="z"||d>="A"&&d<="Z"?e=!0:d>="0"&&d<="9"?r=!0:l=!0;e&&r&&l?this.newPassword.length<8&&(o="密码长度必须大于等于8个字符，请重新输入！"):o="密码至少包含大写字母、小写字母、数字和符号两种以上的类型，请重新输入！"}""!==o?a(this,o):s({oldPassword:this.oldPassword,newPassword:this.newPassword}).then((s=>{0==s.code?a(this,"提交成功"):a(this,s.msg)}))}}}),n={class:"base_form"},c={class:"form-container"},p={class:"form-group"},u={class:"input-wrapper"},h={class:"form-group"},m={class:"input-wrapper"},P={class:"form-group"},v={class:"input-wrapper"},b={class:"button-group"};const f=d(w,[["render",function(s,a,o,d,w,f){return i(),e("div",n,[a[10]||(a[10]=r("div",{class:"base_header"},[r("div",{class:"blue_column"}),r("div",{class:"base_title"},"修改密码")],-1)),a[11]||(a[11]=r("div",{class:"base_prompt"}," 密码强度要求三种字符类型（大小写、数字、特殊字符）及以上且密码长度为8位及以上！ ",-1)),r("div",c,[r("div",p,[a[4]||(a[4]=r("div",{class:"label"},"旧密码",-1)),r("div",u,[l(r("input",{"onUpdate:modelValue":a[0]||(a[0]=a=>s.oldPassword=a),type:"password"},null,512),[[t,s.oldPassword]])])]),r("div",h,[a[6]||(a[6]=r("div",{class:"label"},"请输入新密码",-1)),r("div",m,[l(r("input",{"onUpdate:modelValue":a[1]||(a[1]=a=>s.newPassword=a),type:"password"},null,512),[[t,s.newPassword]]),a[5]||(a[5]=r("div",{class:"alarm"},"*密码长度最大为20位",-1))])]),r("div",P,[a[8]||(a[8]=r("div",{class:"label"},"再次输入新密码",-1)),r("div",v,[l(r("input",{"onUpdate:modelValue":a[2]||(a[2]=a=>s.checkPassword=a),type:"password"},null,512),[[t,s.checkPassword]]),a[7]||(a[7]=r("div",{class:"alarm"},"*密码长度最大为20位",-1))])]),r("div",b,[r("button",{class:"submit-btn",onClick:a[3]||(a[3]=a=>s.submitPassword())},"修改"),a[9]||(a[9]=r("button",{class:"reset-btn"},"重置",-1))])])])}]]);export{f as default};