<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scrolls" class="recommend-content" :data="playList" v-if="slider.length>0&&playList.length>0">
      <div>
        <div v-if="slider.length>0" class="slider-wrapper">
          <slider>
            <div v-for="(item,index) in slider" :key="index">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="banner" class="needsclick">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list" v-if="playList.length>0">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="(item,index) in playList" :key="index">
              <div class="icon">
                <img @load="imageLoaded" v-lazy="item.imgurl" alt="图片" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.name}}</h2>
                <p class="desc">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-if="playList.length==0">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDefaultBanner, getPlayList} from 'api/index'
import {ErrOk} from 'api/config'
import slider from 'base/slider/slider'
import scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
export default{
  data () {
    return {
      slider: [],
      playList: []
    }
  },
  created () {
    const _this = this
    _this.getBannerList()
    _this.getPlayList()
  },
  components: {
    slider,
    scroll,
    loading
  },
  methods: {
    getBannerList () {
      const _this = this
      getDefaultBanner().then(res => {
        if (res.data.code === ErrOk) {
          _this.slider = res.data.data.slider
        }
      })
    },
    getPlayList () {
      const _this = this
      getPlayList().then((res) => {
        if (res.code === ErrOk) {
          _this.playList = res.data.list
        }
      })
    },
    imageLoaded () {
      const _this = this
      if (!_this.checkLoaded) {
        _this.checkLoaded = true
        _this.$refs.scrolls.refresh()
      }
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    text-align: center
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          text-align: left
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
