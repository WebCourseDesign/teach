import{d as t,q as e,s as i,_ as s,c as a,e as l,x as n,F as d,y as r,f as o,w as c,z as u,A as h,o as m,j as p}from"./index-38c7dff6.js";/* empty css                 *//* empty css               */import{e as f}from"./index-255632c5.js";import{g,a as L,b as y}from"./infoServ-deb171f6.js";import{m as x}from"./messageBox-c604b16f.js";import{e as w}from"./studentServ-135e40be.js";import"./request-3dbfa108.js";const v=f,b=t({data:()=>({authHeader:e(),valid:!1,uploadIsLoading:!1,studentId:null,imgStr:"",info:{},feeList:[],markList:[],scoreList:[],nameRules:[],emailRules:[],echartBar:null,echartLine:null,echartPie:null,gpa:0}),async created(){let t=await g(this.studentId);this.info=t.data.info,this.studentId=this.info.studentId,this.feeList=t.data.feeList,this.markList=t.data.markList,this.scoreList=t.data.scoreList;let e=0,i=0;for(let s=0;s<this.scoreList.length;s++){if(null==this.scoreList[s].mark)continue;e+=((this.scoreList[s].mark-50)/10>0?(this.scoreList[s].mark-50)/10:0)*this.scoreList[s].credit}for(let s=0;s<this.scoreList.length;s++)null!=this.scoreList[s].mark&&(i+=this.scoreList[s].credit);this.gpa=Math.ceil(e/i*100)/100,t=await L(this.info.personId+".jpg"),this.imgStr=t.data,this.drawEcharts()},mounted(){},methods:{drawEcharts(){this.echartBar=v.init(document.getElementById("myChartBar")),this.echartBar.setOption({title:{text:"日常消费"},tooltip:{},xAxis:{data:this.feeList.map((t=>t.title))},yAxis:{},series:[{name:"消费",type:"bar",data:this.feeList.map((t=>t.value))}]}),this.echartLine=v.init(document.getElementById("myChartLine")),this.echartLine.setOption({title:{text:"日常消费"},tooltip:{},xAxis:{data:this.feeList.map((t=>t.title))},yAxis:{},series:[{name:"消费",type:"line",data:this.feeList.map((t=>t.value))}]}),this.echartPie=v.init(document.getElementById("myChartPie")),this.echartPie.setOption({title:{text:"成绩分布"},tooltip:{},legend:{orient:"horizontal",x:"center",y:"bottom",data:this.markList.map((t=>t.title))},series:[{type:"pie",data:this.markList}]})},async uploadFile(){const t=document.querySelector("#file");if(null==t.files||0==t.files.length)return void x(this,"请选择文件！");if(0===(await y(this.info.personId+".jpg",t.files[0])).code){x(this,"上传成功");let t=await L(this.info.personId+".jpg");this.imgStr=t.data}else x(this,"上传失败")},downloadPdf(){i("/api/student/getStudentIntroduceItextPdf",this.info.num+".pdf",{studentId:this.studentId,barBase64:this.echartBar.getDataURL(),lineBase64:this.echartLine.getDataURL(),pieBase64:this.echartPie.getDataURL()});this.echartBar.getDataURL()},onSuccess(t){0==t.code?x(this,"上传成功！"):x(this,t.msg)},exportPersonIntro(){w().then((t=>{this.download(this.info.num+".pdf",t.data)}))},download(t,e){const i=new Blob([e]),s=document.createElement("a");s.href=window.URL.createObjectURL(i),s.download=t,document.body.appendChild(s),s.click(),document.removeChild(s),window.URL.revokeObjectURL(s)}}}),I={class:"base_form"},k={class:"table_center",style:{"margin-top":"5px"}},j={class:"content"},B={rowspan:"3"},_=["src"],P={colspan:"3"},C={class:"table_center",style:{"margin-top":"5px"}},R={style:{color:"#930e14","font-weight":"bold","text-align":"center"}},S={class:"content"};const U=s(b,[["render",function(t,e,i,s,f,g){const L=u,y=h;return m(),a(d,null,[l("div",I,[e[16]||(e[16]=l("div",{class:"base_header"},[l("div",{class:"blue_column"}),l("div",{class:"base_title"},"个人画像")],-1)),l("div",k,[l("table",j,[l("tr",null,[e[3]||(e[3]=l("td",null,"学号",-1)),l("td",null,n(t.info.num),1),e[4]||(e[4]=l("td",null,"姓名",-1)),l("td",null,n(t.info.name),1),e[5]||(e[5]=l("td",null,"学院",-1)),l("td",null,n(t.info.dept),1),l("td",B,[l("img",{src:t.imgStr,alt:"个人照片",width:"200"},null,8,_)])]),l("tr",null,[e[6]||(e[6]=l("td",null,"专业",-1)),l("td",null,n(t.info.major),1),e[7]||(e[7]=l("td",null,"班级",-1)),l("td",null,n(t.info.className),1),e[8]||(e[8]=l("td",null,"证件号码",-1)),l("td",null,n(t.info.card),1)]),l("tr",null,[e[9]||(e[9]=l("td",null,"性别",-1)),l("td",null,n(t.info.genderName),1),e[10]||(e[10]=l("td",null,"出生日期",-1)),l("td",null,n(t.info.birthday),1),e[11]||(e[11]=l("td",null,"邮箱",-1)),l("td",null,n(t.info.email),1)]),l("tr",null,[e[13]||(e[13]=l("td",null,"电话",-1)),l("td",null,n(t.info.phone),1),e[14]||(e[14]=l("td",null,"地址",-1)),l("td",P,n(t.info.address),1),l("td",null,[e[12]||(e[12]=l("input",{style:{"margin-left":"10px"},type:"file",id:"file",accept:"image/jpeg"},null,-1)),l("input",{type:"button",value:"图片上传",onClick:e[0]||(e[0]=e=>t.uploadFile())})])])])]),l("div",C,[l("div",R," 您本学期目前GPA为："+n(t.gpa),1),l("table",S,[e[15]||(e[15]=l("tr",null,[l("td",{width:"5%"},"课程号"),l("td",{width:"5%"},"课程名"),l("td",{width:"5%"},"学分"),l("td",{width:"5%"},"成绩"),l("td",{width:"5%"},"排名")],-1)),(m(!0),a(d,null,r(t.scoreList,(t=>(m(),a("tr",{key:t.studentId},[l("td",null,n(t.courseNum),1),l("td",null,n(t.courseName),1),l("td",null,n(t.credit),1),l("td",null,n(t.mark),1),l("td",null,n(t.ranking),1)])))),128))])]),e[17]||(e[17]=l("div",{class:"chart-container"},[l("div",{id:"myChartBar",style:{width:"300px",height:"350px"}}),l("div",{id:"myChartPie",style:{width:"300px",height:"350px"}}),l("div",{id:"myChartLine",style:{width:"300px",height:"350px"}})],-1))]),l("div",null,[o(y,{style:{display:"inline-block","margin-left":"5px"},headers:t.authHeader,action:"/api/student/importFeeDataWeb",data:{studentId:t.studentId},accept:".xlsx,.xls","show-file-list":!0,limit:1,multiple:!1,"on-success":t.onSuccess},{default:c((()=>[o(L,{class:"spacial"},{default:c((()=>e[18]||(e[18]=[p("消费记录上传")]))),_:1})])),_:1},8,["headers","data","on-success"]),o(L,{style:{"margin-left":"5px"},class:"spacial",onClick:e[1]||(e[1]=e=>t.downloadPdf())},{default:c((()=>e[19]||(e[19]=[p("个人画像下载")]))),_:1}),o(L,{style:{"margin-left":"5px"},class:"spacial",onClick:e[2]||(e[2]=e=>t.exportPersonIntro())},{default:c((()=>e[20]||(e[20]=[p("个人简历下载")]))),_:1})])],64)}],["__scopeId","data-v-cffc30ee"]]);export{U as default};
