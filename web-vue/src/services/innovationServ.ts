import { Innovation } from "~/models/Innovation";
import { DataRequest } from "~/models/general";
import request from "~/utils/request";
import { generalRequest } from "./genServ";


export const getInnovationList = async(params?: DataRequest):Promise<Innovation[]> =>{
    const res = await generalRequest('/api/innovation/list',{studentId: params})
    return res.data as Innovation[];
  };
  export const addAndEditInnovation = (data:Innovation) => {
      return request({
        url: "/api/innovation",
        method: "post",
        data:data
      })
  };
  export const deleteInnovation = (id:number) => {
      return request({
          url: `/api/innovation/${id}`,
          method: "delete",
      })
  }