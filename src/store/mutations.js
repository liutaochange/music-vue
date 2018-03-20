import * as types from './mutation-types'
const mutations = {
  [types.setSinger] (state, singer) {
    state.singer = singer
  },
  [types.setPlaying] (state, flag) {
    state.playing = flag
  },
  [types.setFullScreen] (state, flag) {
    state.fullScreen = flag
  },
  [types.setPlayList] (state, list) {
    state.playList = list
  },
  [types.setSequenceList] (state, list) {
    state.sequenceList = list
  },
  [types.setMode] (state, mode) {
    state.mode = mode
  },
  [types.setCurrentIndex] (state, index) {
    state.currentIndex = index
  },
  [types.setDisc] (state, disc) {
    state.disc = disc
  },
  [types.setTopList] (state, topList) {
    state.topList = topList
  },
  [types.setSearchHistory] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.setPlayHistory] (state, playHistory) {
    state.playHistory = playHistory
  },
  [types.setFavoriteList] (state, favoriteList) {
    state.favoriteList = favoriteList
  }
}
export default mutations
