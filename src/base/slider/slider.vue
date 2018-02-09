<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) in dots" :key="index" class="dot" :class="{Active: currentIndex === index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default{
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted () {
    const _this = this
    setTimeout(function () {
      _this.setWidth()
      _this.initDots()
      _this.initSlider()
      if (_this.autoPlay) {
        _this.play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      _this.setWidth(true)
      _this.slider.refresh()
    })
  },
  methods: {
    setWidth: function (isresize) {
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = this.$refs.slider.clientWidth
      var width = 0
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isresize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initDots: function () {
      this.dots = new Array(this.children.length)
    },
    initSlider: function () {
      var loop = this.loop
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: loop,
        snapThreshold: 0.3,
        snapSpeed: 400,
        click: true
      })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentIndex = pageIndex
        if (this.autoPlay) {
          this.play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    play: function () {
      let pageIndex = this.currentIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      var _this = this
      this.timer = setTimeout(() => {
        _this.slider.goToPage(pageIndex, 0, 400)
      }, 3000)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable";
  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          width: 100%
          float: left
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        width: 8px
        height: 8px
        border-radius: 50%
        background: #e9ecf5
        margin: 0 4px
        &.Active
          width: 20px;
          border-radius: 5px;
          background: rgba(255,255,255,0.8)

</style>
