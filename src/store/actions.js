import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/utils'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'
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
  let fpIndex = findIndex(playList, song)
  // 因为插入歌曲，所以索引加一
  currentIndex += 1
  // 插入这首歌到当前位置
  playList.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex -= 1
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fSdIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fSdIndex > -1) {
    if (currentSIndex > fSdIndex) {
      sequenceList.splice(fSdIndex, 1)
    } else {
      sequenceList.splice(fSdIndex + 1, 1)
    }
  }
  commit(types.setPlayList, playList)
  commit(types.setSequenceList, sequenceList)
  commit(types.setCurrentIndex, currentIndex)
  commit(types.setFullScreen, true)
  commit(types.setPlaying, true)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.setSearchHistory, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.setSearchHistory, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}, query) {
  commit(types.setSearchHistory, clearSearch(query))
}

export const deleteSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex -= 1
  }
  commit(types.setPlayList, playList)
  commit(types.setSequenceList, sequenceList)
  commit(types.setCurrentIndex, currentIndex)
  if (!playList.length) {
    commit(types.setPlaying, false)
  } else {
    commit(types.setPlaying, true)
  }
}

export const deleteSongList = function ({commit}) {
  commit(types.setCurrentIndex, -1)
  commit(types.setPlayList, [])
  commit(types.setSequenceList, [])
  commit(types.setPlaying, false)
}
