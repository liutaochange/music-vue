import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import store from './store'
import fastclick from 'fastclick'
import 'common/stylus/index.styl'
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/images/use.jpg')
})

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
