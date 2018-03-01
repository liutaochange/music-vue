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
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>
