import Vue from 'vue'
import App from './App.vue'

Vue.filter('count-letters', function(str){
    return str + " ("+(str.split("").length + ")");
});

Vue.filter('to-lowercase', function(value) {
    return value.toLowerCase();
});

Vue.mixin({
    created() {
        console.log('Global Mixin - Created Hook');
    }
});

new Vue({
  el: '#app',
  render: h => h(App)
})
