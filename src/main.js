import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'

import fastclick from 'fastclick'
import 'common/stylus/index.styl'

fastclick.attach(document.body)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
