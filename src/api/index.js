import axios from 'axios'
import {commonParams} from 'api/config'
const request = axios.create({
  withCredentials: true
})

// 获取banner
export const getDefaultBanner = () => {
  const url = '/api/recomend'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    _: 1517968181370
  })
  return request.get(url, {
    params: data
  })
}

// 获取歌单
export const getPlayList = () => {
  const url = '/api/playList'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    picmid: 1,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    sin: 0,
    sortId: 5,
    ein: 29,
    rnd: Math.random()
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
