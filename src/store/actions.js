import * as types from './mutation-types'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.setSequenceList, list)
  commit(types.setPlayList, list)
  commit(types.setCurrentIndex, index)
  commit(types.setFullSereen, true)
  commit(types.setPlaying, true)
}
