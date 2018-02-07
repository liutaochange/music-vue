<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div v-if="slider.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in slider" :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="banner">
            </a>
          </div>
        </slider>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import {getDefaultBanner} from 'api/index'
import {ErrOk} from 'api/config'
import slider from 'base/slider/slider'
export default{
  data () {
    return {
      slider: []
    }
  },
  created () {
    const _this = this
    getDefaultBanner().then(res => {
      if (res.data.code === ErrOk) {
        console.log(res.data)
        _this.slider = res.data.data.slider
      }
    })
  },
  components: {
    slider
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
