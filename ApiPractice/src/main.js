import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';

Vue.use(Axios);

Axios.defaults.baseURL = "https://vuebase-1d31a.firebaseio.com/data.json";
console.log(Axios.defaults.baseURL);

new Vue({
  el: '#app',
  render: h => h(App)
})
