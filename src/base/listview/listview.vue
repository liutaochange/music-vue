<template>
   <Scroll class="listview" :data="data" ref="listView" :listen-scroll="listenScroll" :probe-type="probeType" @scroll="scroll">
     <ul>
       <li v-for="(group,index) in data" :key="index" class="list-group" ref="listGroup">
         <h2 class="list-group-title">{{group.title}}</h2>
         <ul>
           <li v-for="(item,ins) in group.items" :key="ins" class="list-group-item" @click="selectItem(item)">
             <img v-lazy="item.avator" alt="avator" class="avatar">
             <span class="name">{{item.name}}</span>
           </li>
         </ul>
       </li>
     </ul>
     <div class="list-shortcut" @touchstart.stop.prevent="onTouchStart" @touchmove.stop.prevent="stopMove" @touchend.stop>
       <ul>
         <li v-for="(item,index) in shortList" :key="index" class="item" :data-index="index" :class="{'current': currentIndex == index}">{{item}}</li>
       </ul>
     </div>
     <div class="list-fixed" v-show="fixedTitle" ref="fixed">
       <h1 class="fixed-title">{{fixedTitle}}</h1>
     </div>
     <div v-if="data.length === 0" class="loading-container">
       <loading></loading>
     </div>
   </Scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'
import {getData} from 'common/js/dom'
const Height = 18
const TITLE_HEIGHT = 30
export default {
  created () {
    this.probeType = 3
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    shortList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    loading
  },
  methods: {
    onTouchStart (e) {
      let anthorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anthorIndex = anthorIndex
      this._scrollTo(anthorIndex)
    },
    stopMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / Height || 0
      let anthorIndex = parseInt(this.touch.anthorIndex) + delta
      this._scrollTo(anthorIndex)
    },
    refresh () {
      this.$refs.listView.refresh()
    },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    getHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      list.forEach((ele, index) => {
        height += ele.clientHeight
        this.listHeight.push(height)
      })
    },
    selectItem (item) {
      this.$emit('select', item)
    }
  },
  watch: {
    data () {
      const _this = this
      this.$nextTick().then(function () {
        _this.getHeight()
      })
    },
    scrollY (newY) {
      const listenHeight = this.listHeight
      // 滚动到顶部 nemY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 中间部分滚动
      for (let i = 0; i < listenHeight.length; i++) {
        let h1 = listenHeight[i]
        let h2 = listenHeight[i + 1]
        if (!h2 || (-newY >= h1 && -newY < h2)) {
          this.currentIndex = i
          this.diff = h2 + newY
          return
        }
      }
      // 滚动到底部且 -newY大于最后元素的上限
      this.currentIndex = listenHeight.length - 2
    },
    diff (newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
        text-align: left
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        text-align: left
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
