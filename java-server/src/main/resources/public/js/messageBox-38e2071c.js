import{a5 as n,R as e}from"./index-ed299ca2.js";function t(n,e){n.$message({message:e,type:"warnning"})}function a(t){return new Promise(((a,s)=>{n.confirm(t,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>{a(!0)})).catch((()=>{e({type:"info",message:"已取消删除"}),s(!1)}))}))}export{a,t as m};
