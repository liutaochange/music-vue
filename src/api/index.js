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

// 获取歌手
export const getSingerList = () => {
  const url = '/api/singerList'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌手详情
export const getSingerDetail = (singerId) => {
  const url = '/api/singerDetail'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌词
export const getMusicLyric = (mid) => {
  const url = '/api/musicLyric'
  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0,
    songmid: mid,
    pcachetime: Number(new Date())
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌单详情
export const getMusicDisc = (dissid) => {
  const url = '/api/musicDisc'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    onlysong: 0,
    disstid: dissid,
    loginUin: 0,
    platform: 'yqq',
    hostUin: 0,
    format: 'json',
    needNewCode: 0
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取排行榜列表
export const getMusicRank = () => {
  const url = '/api/musicRank'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    format: 'json',
    needNewCode: 1,
    _: Number(new Date())
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取排行榜详情
export const getMusicRankDetails = (topid) => {
  const url = '/api/musicRankDetails'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    tpl: 3,
    format: 'json',
    page: 'detail',
    needNewCode: 1,
    type: 'top',
    topid: topid,
    _: Number(new Date())
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 歌手，歌名搜索
export const searchList = (query, page, zhida, perpage) => {
  const url = '/api/searchList'
  const data = Object.assign({}, commonParams, {
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    w: query,
    platform: 'h5',
    uin: 0,
    format: 'json',
    page: 'detail',
    needNewCode: 1,
    _: Number(new Date())
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 歌手，歌名搜索推荐
export const searchHotKey = () => {
  const url = '/api/searchHotKey'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    format: 'json',
    needNewCode: 1,
    _: Number(new Date())
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取歌曲url路径参数vkey
export const getSongUrlVkey = (songMid) => {
  const url = '/api/getSongUrl'
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid: 4300126822
  })
  return request.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
