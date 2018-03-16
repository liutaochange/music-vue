<template>
  <div class="loading">
    <img src="./loading.gif" alt="图片" width="24" height="24">
    <p class="text">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>
<style lang="stylus" scoped>
  .loading
    width: 100%
    text-align: center
    img
      display: block
      margin: 0 auto
    .text
      font-size: 14px
      width: 100%
      text-align: center
      padding: 10px 0 20px
</style>
