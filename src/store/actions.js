import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/utils'
function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.setSequenceList, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.setPlayList, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.setPlayList, list)
  }
  commit(types.setCurrentIndex, index)
  commit(types.setFullScreen, true)
  commit(types.setPlaying, true)
}
export const randomPlay = function ({commit}, {list}) {
  commit(types.setMode, playMode.random)
  commit(types.setSequenceList, list)
  let randomList = shuffle(list)
  commit(types.setPlayList, randomList)
  commit(types.setCurrentIndex, 0)
  commit(types.setFullScreen, true)
  commit(types.setPlaying, true)
}

export const insertSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playList[currentIndex]
  // 查找当前列表中是否有插入的歌曲，并返回索引
  let fdIndex = findIndex(playList, song)
  // 因为插入歌曲，所以索引加一
  currentIndex += 1
  playList.splice(currentIndex, 0, song)
  // 插入这首歌到当前位置
  if (fdIndex > -1) {
    playList.splice(fdIndex, 1)
    currentIndex -= 1
  } else {
    playList.splice(fdIndex + 1, 1)
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fSdIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fSdIndex > -1) {
    if (currentSIndex > fSdIndex) {
      sequenceList.splice(fdIndex, 1)
    } else {
      sequenceList.splice(fdIndex + 1, 1)
    }
  }
  commit(types.setPlayList, playList)
  commit(types.setSequenceList, sequenceList)
  commit(types.setCurrentIndex, currentIndex)
  commit(types.setFullScreen, true)
  commit(types.setPlaying, true)
}
