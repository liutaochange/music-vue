<template>
  <div ref="wrap">
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
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initScroll()
    })
  },
  methods: {
    initScroll: function () {
      if (!this.$refs.wrap) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrap, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable: function () {
      this.scroll && this.scroll.enable()
    },
    disable: function () {
      this.scroll && this.disable()
    },
    refresh: function () {
      this.scroll && this.refresh()
    }
  },
  watch: {
    data () {
      var _this = this
      setTimeout(function () {
        _this.refresh()
      }, 20)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
