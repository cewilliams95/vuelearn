import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {
    serverShowDetails: function(server) {
      this.$emit('serverShowDetails', server);
    }
  }
  });

new Vue({
  el: '#app',
  render: h => h(App)
})
