/**
 * Created by LiuTao on 2018/3/4.
 */
import {getMusicLyric} from 'api/index'
import {Base64} from 'js-base64'
import {ErrOk} from 'api/config'
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getMusicLyric(this.mid).then((res) => {
        if (res.code === ErrOk) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `https://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
  })
}
