<template>
  <transition name="slide">
    <music-list :title="title" :bg-img="bgImg" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicDisc} from 'api/index'
import {ErrOk} from 'api/config'
import {createSong, getSongUrl} from 'common/js/song'
export default {
  created () {
    this._getMusicDisc()
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.disc.dissname
    },
    bgImg () {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getMusicDisc () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      const _this = this
      getMusicDisc(this.disc.dissid).then((res) => {
        if (res.code === ErrOk) {
          _this.songs = _this.stanrdList(res.cdlist[0].songlist)
        }
      })
    },
    stanrdList (list) {
      let retArr = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          let song = createSong(musicData)
          getSongUrl(song, musicData.songmid)
          retArr.push(song)
        }
      })
      return retArr
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
