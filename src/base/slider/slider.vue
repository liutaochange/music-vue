<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default{
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
      _this.initSlider()
    }, 20)
  },
  methods: {
    setWidth: function () {
      this.children = this.$refs.sliderGroup.children
      let sliderWidth = this.$refs.slider.clientWidth
      var width = 0
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    initSlider: function () {
      var loop = this.loop
      console.log(loop)
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
    }
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
        display: inlie-block
        width: 8px
        height: 8px
        border-radius: 50%
        background: #e9ecf5
        margin-right: 4px
</style>
