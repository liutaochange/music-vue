<template>
  <div class="singer" ref="singer">
  </div>
</template>

<script>
import {getSingerList} from 'api/index'
import {ErrOk} from 'api/config'
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
    getSingerLists () {
      const _this = this
      getSingerList().then((res) => {
        if (res.code === ErrOk) {
          _this.singerList = res.data.list
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
          map.hot.items.push({
            id: ele.Fsinger.mid,
            name: ele.Fsinger.name,
            avatar: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${ele.Fsinger.mid}.jpg?max_age=2592000`
          })
        }
      })
    }
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
