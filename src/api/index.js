import axios from 'axios'
import {Parmas, Rurl} from 'common/js/recomend'
const request = axios.create({
  withCredentials: true
})
// 获取banner
export const getDefaultBanner = () => request.get(Rurl, {
  params: Parmas
})
