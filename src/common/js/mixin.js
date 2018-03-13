/**
 * Created by LiuTao on 2018/3/13.
 */
import {mapGetters} from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handleList(this.playList)
  },
  activated () {
    this.handleList(this.playList)
  },
  watch: {
    playList (newVal) {
      this.handleList(newVal)
    }
  },
  methods: {
    handleList () {
      throw new Error('component must be implement handleList method')
    }
  }
}
