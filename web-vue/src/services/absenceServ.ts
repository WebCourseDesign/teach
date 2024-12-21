import { DataRequest } from "~/models/general";
import request from "~/utils/request";
import { generalRequest } from "./genServ";
import { Absence } from "~/models/Absence";
import { da } from "element-plus/es/locale";
import { dataType } from "element-plus/es/components/table-v2/src/common";


export const getAbsenceList = async(params?: DataRequest):Promise<Absence[]> =>{
    const res = await generalRequest('/api/absence/list',{studentId: params})
    return res.data as Absence[];
  };
  export const addAndEditAbsence = (data:Absence) => {
      return request({
        url: "/api/absence",
        method: "post",
        data:data
      })
  };
  export const approved = (data:Absence) => {
      return request({
          url: `/api/absence/approve`,
          method: "post",
          data:data
      })
  }
  export const disagree = (data:Absence) => {
    return request({
        url: `/api/absence/disagree`,
        method: 'post',
        data:data
    })
  }