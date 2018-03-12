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
