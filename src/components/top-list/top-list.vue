<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-img="bgImg" :songs="songs"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import MusicList from 'components/music-list/music-list'
import {getMusicRankDetails} from 'api/index'
import {ErrOk} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  computed: {
    title () {
      return this.topList.topTitle
    },
    bgImg () {
      if (this.songs.length > 0) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'topList'
    ])
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  created () {
    this._getTopList()
  },
  methods: {
    _getTopList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicRankDetails(this.topList.id).then((res) => {
        if (res.code === ErrOk) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
