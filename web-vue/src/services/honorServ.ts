import request from '~/utils/request';
import { DataRequest } from '~/models/general';
import { Honor } from '~/models/Honor';
import { generalRequest } from './genServ';

export const getHonorList = async(params?: DataRequest):Promise<Honor[]> =>{
    const res = await generalRequest('/api/honor/list',{studentId: params})
    return res.data as Honor[];
};
export const addAndEditHonor = (data: Honor) => {
    return request({
        url:'/api/honor',
        method: 'post',
        data: data
    })
    // const res = await generalRequest('/api/honor',{honor: data})
    // return res.data as Honor;

};
export const deleteHonor = (id: number) => {
    return request({
        url: `/api/honor/${id}`,
        method: "delete",
    })
}