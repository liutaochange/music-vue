<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-img="bgImg"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/index'
import {ErrOk} from 'api/config'
import {createSong, getSongUrl} from 'common/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      'songs': []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImg () {
      return this.singer.avator
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this.GetSingerDetail()
  },
  methods: {
    GetSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      const _this = this
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ErrOk) {
          _this.songs = _this.lizeSongs(res.data.list)
        }
      })
    },
    lizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          let song = createSong(musicData)
          getSongUrl(song, musicData.songmid)
          ret.push(song)
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
