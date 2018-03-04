<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    const _this = this
    setTimeout(() => {
      _this.initScroll()
    }, 20)
  },
  methods: {
    initScroll: function () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    enable: function () {
      this.scroll && this.scroll.enable()
    },
    disable: function () {
      this.scroll && this.scroll.disable()
    },
    refresh: function () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo: function () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement: function () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data () {
      const _this = this
      setTimeout(() => {
        _this.refresh()
      }, 20)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
