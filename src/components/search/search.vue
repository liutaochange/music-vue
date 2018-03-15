<template>
  <div class="search" ref="search">
    <div class="search-box-wrapper">
      <search-box :query="queryItem" ref="searchBox" @query="queryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="(item,index) in hotKey" :key="index">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <!--<div class="search-history" v-show="searchHistory.length">-->
            <!--<h1 class="title">-->
              <!--<span class="text">搜索历史</span>-->
              <!--<span @click="showConfirm" class="clear">-->
                <!--<i class="icon-clear"></i>-->
              <!--</span>-->
            <!--</h1>-->
            <!--<search-list @delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory"></search-list>-->
          <!--</div>-->
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest @listScroll="blurInput" @select="saveSearch" ref="suggest" :query="query"></suggest>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import searchBox from 'base/search-box/search-box'
import Scroll from 'base/scroll/scroll'
import suggest from 'components/suggest/suggest'
import {searchHotKey} from 'api/index'
import {ErrOk} from 'api/config'
export default {
  created () {
    this.GetSearchHotKey()
  },
  data () {
    return {
      hotKey: [],
      query: ''
    }
  },
  components: {
    searchBox,
    suggest,
    Scroll
  },
  methods: {
    GetSearchHotKey () {
      const _this = this
      searchHotKey().then((res) => {
        if (res.code === ErrOk) {
          _this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    queryChange (query) {
      this.query = query
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    saveSearch () {
      console.log('test')
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
