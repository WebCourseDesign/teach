import { DailyActivity } from "~/models/DailyActivity";
import { DataRequest } from "~/models/general";
import request from "~/utils/request";
import { generalRequest } from "./genServ";

export const getDailyActList = async(params?: DataRequest):Promise<DailyActivity[]> =>{
  const res = await generalRequest('/api/dailyActivity/list',{studentId: params})
  return res.data as DailyActivity[];
};
export const addAndEditDailyAct = (data:DailyActivity) => {
    return request({
      url: "/api/dailyActivity",
      method: "post",
      data:data
    })
};
export const deleteDailyAct = (id:number) => {
    return request({
        url: `/api/dailyActivity/${id}`,
        method: "delete",
    })
}