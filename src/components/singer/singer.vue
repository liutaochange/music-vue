<template>
  <div class="singer" ref="singer">
    <list-view :data="singerList" v-if="singerList.length>0" @select="selectItem"></list-view>
    <router-view></router-view>
    <div v-if="singerList && singerList.length == 0" class="loading-container">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import {getSingerList} from 'api/index'
import {ErrOk} from 'api/config'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'
const hotName = '热门'
const hotSingerLen = 10
export default {
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this.getSingerLists()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    getSingerLists () {
      const _this = this
      getSingerList().then((res) => {
        if (res.code === ErrOk) {
          _this.singerList = _this.stanrdSinger(res.data.list)
        }
      })
    },
    stanrdSinger (list) {
      let map = {
        hot: {
          title: hotName,
          items: []
        }
      }
      list.forEach((ele, index) => {
        if (index < hotSingerLen) {
          map.hot.items.push(new Singer({
            id: ele.Fsinger_mid,
            name: ele.Fsinger_name
          }))
        }
        const key = ele.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: ele.Fsinger_mid,
          name: ele.Fsinger_name
        }))
      })
      // 为了得到有序列表，处理 map
      let hotArr = []
      let retArr = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          retArr.push(val)
        } else if (val.title === hotName) {
          hotArr.push(val)
        }
      }
      retArr.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hotArr.concat(retArr)
    },
    ...mapMutations({
      setSinger: 'setSinger'
    })
  },
  components: {
    ListView,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    text-align: center
</style>
