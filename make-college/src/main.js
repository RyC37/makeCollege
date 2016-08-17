import Vue from 'vue'
import VueResource from 'vue-resource'
// import Router from 'vue-router'
import App from './App'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

Vue.use(VueResource)
// Vue.http.options.xhr = { withCredentials: true }
