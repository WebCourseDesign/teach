import axios from 'axios'
import { useAppStore } from '~/stores/app'
const request = axios.create({
  baseURL: "http://localhost:22222/",
  //baseURL: "http://202.194.7.29:22222",
  timeout: 5000
}
)
request.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${useAppStore().userInfo.jwtToken}`
  return config
})



export default request