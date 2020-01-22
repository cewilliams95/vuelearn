import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes/index.js';
import store from './store/index';
import Axios from 'axios';

Vue.use(VueRouter);

Axios.defaults.baseURL = 'https://vuebase-1d31a.firebaseio.com/';

Vue.filter('currency', (value) => {
  return '$' + value.toLocaleString();
});

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
