import * as types from './mutation-types'
const mutations = {
  [types.setSinger] (state, singer) {
    state.singer = singer
  }
}
export default mutations
