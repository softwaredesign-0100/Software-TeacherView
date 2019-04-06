// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import "@babel/polyfill";

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios'
import store from './store'



// import './assets/icon/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css';

import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'


Vue.use(ElementUI);
Vue.prototype.$request = axios
Vue.prototype.$store = store
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
